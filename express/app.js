//
//
// covid19 express server

const express = require('express');
const app = (module.exports = express());
const cors = require('cors');

// ----------------------------------------------------------------------------

const {
  st,
  init_sstate,
  lockout_set,
  user_fetch,
  validate_user,
} = require('./State');
const { init_db, store_backup, store_restore } = require('./Db');
const { log_contact } = require('./Contact');
const {
  upload_init,
  upload_multer,
  upload_update_json,
  upload_images_meta,
} = require('./Upload');

app.use(cors());
app.use(express.json()); // for parsing application/json

init_state();

function init_state() {
  // console.log('init_state', st);
  init_db();
  init_sstate();
  upload_init();
}

// ----------------------------------------------------------------------------
// api get /gallery
//
app.get('/gallery', function (req, res) {
  // console.log('get /gallery req.query=' + JSON.stringify(req.query));
  // const arr = st.images_meta;
  const arr = upload_images_meta(req.query);
  console.log(
    'get /gallery email=' +
      req.query.email +
      ' app=' +
      req.query.app +
      ' length=' +
      arr.length
  );
  res.send(arr);
});

app.post('/upload', upload_multer, (req, res) => {
  // console.log('req.file', req.file);
  // console.log('req.files', req.files);
  // console.log('req.body', req.body);
  console.log('upload req.query', req.query);
  const files = req.files || [req.file];
  if (files) {
    upload_update_json(files, req.query, req.body, () => {
      res.json({ msg: 'Uploaded ' + files.length });
      // res.json(files);
    });
  } else {
    console.log('upload no files');
    throw 'error';
  }
});

// ----------------------------------------------------------------------------
// url api's need by client code

// api post /contact
// Create a contact
//  { uid }
//  { email, contactName, message, created, token }
//
app.post('/contact', function (req, res) {
  console.log('post /contact req.body', req.body);
  // { msg: 'Submitted OK' };
  log_contact(req, resp => {
    res.send(resp);
  });
});

// api get /stats
//
app.get('/stats', function (req, res) {
  console.log('get /stats req.query=' + JSON.stringify(req.query));
  const arr = st.db.country;
  res.send(arr);
});

// api get /action/${action}?app=${app}&email=${email}&utoken=${utoken}
app.get('/action/:action', function (req, res) {
  const action = req.params.action;
  const query = req.query;
  const app = query.app;
  const email = query.email;
  console.log('get /action action=' + action + ' email=' + email);
  if (!validate_user(query)) {
    console.log('validate_user failed! query=' + JSON.stringify(query));
    res.send({ msg: 'validate_user failed' });
    return;
  } else if (action == 'store_reload') {
    init_state();
    res.send({});
  } else if (action == 'store_backup') {
    store_backup(app, resp => {
      res.send(resp);
    });
  } else if (action == 'store_restore') {
    store_restore(app, resp => {
      res.send(resp);
    });
  }
});

// api get /lockout?msg=Message
// Set state of global lockout
//
app.get('/lockout', function (req, res) {
  const lockout_message = req.query.msg;
  console.log('get /lockout lockout_message=' + lockout_message);
  lockout_set(lockout_message);
  res.send(lockout_message);
});

// api get /users?app=${app}&email=${email}&password=${password}
// Return user info if password match
//
app.get('/users', function (req, res) {
  // console.log('get /users req.query=' + JSON.stringify(req.query));
  const email = req.query.email;
  console.log('get /users email=' + email);
  const resp = user_fetch(req.query);
  res.send(resp);
});

// ----------------------------------------------------------------------------
app.use(function (err, req, res) {
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  console.log('api err.message=' + err.message);
  console.log('api err.status=' + err.status);
  console.log('api err res', res);
  // res.status(err.status || 500);
  // res.send({ error: err.message });
});
app.use(function (req, res) {
  console.log('api use req.method=' + req.method);
  console.log('api use req.url=' + req.url);
  res.status(404);
  res.send({ error: 'Missing' });
});
/* istanbul ignore next */
if (!module.parent) {
  app.listen(st.port);
  console.log(st.service_name + ' ' + st.version + ' port ' + st.port);
}
