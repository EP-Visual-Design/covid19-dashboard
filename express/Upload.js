//
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');

const { st, validate_user } = require('./State');

// ----------------------------------------------------------------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log('storage multer req', req);
    console.log('multer destination req.query', req.query);
    const query = req.query;
    const dest_images = upload_spec(query).dest_images;
    cb(null, dest_images);
  },
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + '-' + Date.now());
    //originalname
    cb(null, prefix(file.originalname));
  },
});

function fileFilter(req, file, cb) {
  // console.log('multer fileFilter req.query', req.query);
  // console.log('multer fileFilter file', file);
  // Reject file if not logged in
  const query = req.query;
  const user = validate_user(query);
  cb(null, !!user);
}

function prefix(fname) {
  const sdate = new Date().toISOString().replace(/:/g, '-');
  return sdate + '-' + fname;
}

const upload_multer = multer({ storage, fileFilter }).array('photo');

function upload_update_json(files, query, values, doneFunc) {
  console.log('upload_update_json files', files);
  console.log('upload_update_json query', query);
  console.log('upload_update_json values', values);
  const spec = upload_spec(query);
  if (spec) {
    const dest_json = spec.dest_json;
    // !!@ Convert to promises
    for (const file of files) {
      const { name } = path.parse(file.path);
      const fpath = path.resolve(dest_json, name + '.json');
      const nvalues = { ...values, filename: file.filename };
      fs.writeJsonSync(fpath, nvalues, { spaces: 2 });
      // Save to st.images_meta
      spec.images_meta.push(nvalues);
    }
  }
  doneFunc();
}

function upload_images_meta(query) {
  const spec = upload_spec(query);
  if (!spec) return [];
  return spec.images_meta;
}

function upload_spec(query) {
  const app = query.app;
  // console.log('upload_spec app', app);
  let spec = st.upload_specs[app];
  if (!spec && app) {
    let dest_root = __dirname + '/../client/public/uploads/';
    if (st.server_run) {
      dest_root = __dirname + '/../uploads/';
    }
    dest_root += app;
    // eg. dest_root = /home/epdev/covid19/uploads/covid19/a1
    // on sftp://secure.medcampus.net
    //
    const dest_images = path.resolve(dest_root, 'images');
    const dest_json = path.resolve(dest_root, 'json');
    fs.ensureDirSync(dest_images);
    fs.ensureDirSync(dest_json);
    const fmetas = files_at_path(dest_json);
    const images_meta = fmetas.map(fname => {
      const fpath = path.resolve(dest_json, fname);
      return fs.readJsonSync(fpath);
    });
    // images_meta [
    //  { filename, title, description }
    spec = { dest_images, dest_json, images_meta };
    st.upload_specs[app] = spec;
  }
  return spec;
}

function upload_init() {
  st.upload_specs = {};
  // const dest_root = __dirname + '/../client/public/uploads';
  // upload_set_root(dest_root);
  // upload_load_metas();
}

function upload_set_root(dest_root) {
  st.dest_images = path.resolve(dest_root, 'images');
  st.dest_json = path.resolve(dest_root, 'json');
  fs.ensureDirSync(st.dest_images);
  fs.ensureDirSync(st.dest_json);
}

function upload_load_metas() {
  const fmetas = files_at_path(st.dest_json);
  console.log('upload_init metas', fmetas);
  const metas = fmetas.map(fname => {
    const fpath = path.resolve(st.dest_json, fname);
    return fs.readJsonSync(fpath);
  });
  // Init st.images_meta
  st.images_meta = metas;
}

// Return array of file names at path, go deep, exclude directories
function files_at_path(npath, exclude_dir) {
  if (!fs.existsSync(npath)) return [];
  const filenames = fs.readdirSync(npath);
  const arr = [];
  for (var index = 0; index < filenames.length; index++) {
    var filename = filenames[index];
    // console.log('files_at_path filename=' + filename);
    if (filename.substr(0, 1) == '.' || filename == exclude_dir) continue;
    var fullpath = npath + '/' + filename;
    var stat = fs.statSync(fullpath);
    if (stat.isDirectory()) {
      var dir_filenames = fs.readdirSync(fullpath);
      for (var dindex = 0; dindex < dir_filenames.length; dindex++) {
        var dname = dir_filenames[dindex];
        if (dname.substr(0, 1) == '.' || dname == exclude_dir) continue;
        filenames.push(filename + '/' + dname);
      }
    } else {
      arr.push(filename);
    }
  }
  return arr;
}

// ----------------------------------------------------------------------------

module.exports = {
  upload_init,
  upload_multer,
  upload_update_json,
  upload_images_meta,
};
