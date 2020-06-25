//
//
// Operations on data store

const fs = require('fs-extra');
const path = require('path');

const { st } = require('./State');

module.exports = {
  init_db,
  store_backup,
  store_restore,
};

// Read db from file
function init_db() {
  // console.log('init_db st', st);
  st.db = { country: [], users: [] };
  if (fs.existsSync(st.store_root)) {
    read_current_db();
  } else {
    console.log('init_db empty');
  }
  console.log('init_db db.users.length=' + st.db.users.length);
  console.log('init_db db.country.length=' + st.db.country.length);
}

function read_current_db() {
  read_country();
  read_users();
}

function read_country() {
  const npath = path.resolve(st.store_root, st.store_stats_dir);
  if (fs.existsSync(npath)) {
    const nfiles = fs.readdirSync(npath);
    for (let fname of nfiles) {
      // eg. fname=04-26-2020.json
      if (!fname.endsWith('.json')) continue;
      const fpath = path.resolve(npath, fname);
      const items = fs.readJsonSync(fpath);
      const date = fname.substr(0, fname.length - 5);
      if (items) {
        st.db.country.push({ date, items });
      } else {
        console.log('read_country readJson failed', fpath);
      }
    }
  } else {
    console.log('read_current_db missing npath=' + npath);
  }
}

function read_users() {
  const npath = path.resolve(st.store_root, st.user_json);
  if (fs.existsSync(npath)) {
    st.db.users = fs.readJsonSync(npath);
  } else {
    console.log('read_current_db missing npath=' + npath);
  }
  // console.log('st.db.users', st.db.users);
  console.log('st.db.users.length', st.db.users.length);
}

function store_backup(app, doneFunc) {
  const src_dir = path.resolve(st.store_root, app);
  fs.ensureDirSync(st.store_backup_path);
  const dest_dir = path.resolve(st.store_backup_path, app);
  if (fs.existsSync(dest_dir)) {
    // Rename store_backup/eu to store_backup/eu-2020-04-20-
    const ndest_dir = dest_dir + '-' + store_backup_date_suffix();
    console.log('ndest_dir', ndest_dir);
    fs.moveSync(dest_dir, ndest_dir, { overwrite: true });
  }
  fs.copy(src_dir, dest_dir, { preserveTimestamps: true })
    .then(() => {
      doneFunc({});
    })
    .catch(err => {
      console.msg('store_backup error', err);
      doneFunc({ msg: err.message });
    });
}

function store_backup_date_suffix() {
  return new Date().toISOString().replace(/:/g, '-');
}

function store_restore(app, doneFunc) {
  const src_dir = path.resolve(st.store_backup_path, app);
  const dest_dir = path.resolve(st.store_root, app);
  if (!fs.existsSync(src_dir)) {
    doneFunc({ msg: 'backup missing' });
    return;
  }
  fs.remove(dest_dir)
    .then(() => {
      return fs.copy(src_dir, dest_dir, { preserveTimestamps: true });
    })
    .then(() => {
      init_db();
      doneFunc({});
    })
    .catch(err => {
      console.msg('store_restore error', err);
      doneFunc({ msg: err.message });
    });
}
