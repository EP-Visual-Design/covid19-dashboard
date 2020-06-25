//
//
// Manage global state st for express server

const fs = require('fs-extra');
const path = require('path');
const sha1 = require('js-sha1');
const pack = require('./package');

const st = {};

module.exports = {
  st,
  validate_user,
  user_fetch,
  lockout_set,
  init_sstate,
};

st.port = 3002;
st.version = pack.version;
st.service_name = pack.name;
st.server_run = process.argv[1].startsWith('/home/epdev/');

st.store_root = path.resolve('../store');
st.user_json = 'user.json';
st.store_stats_dir = 'stats/country';

st.lockout_message_path = path.resolve(st.store_root, '_lockout_message.txt');
st.lockout_message = '';

// store/contacts/<ip>_<contact_count>.json
st.contact_store_path = path.resolve(st.store_root, 'contacts');
st.contact_count_path = path.resolve(st.store_root, '_contact_count.txt');
// Contact count is written out at this interval
st.contact_interval = 10 * 1000;
st.contact_start_time = Date.now();
st.contact_count = 0;
st.contact_count_dirty = 0;

function init_sstate() {
  if (fs.existsSync(st.lockout_message_path)) {
    st.lockout_message = fs.readFileSync(st.lockout_message_path, 'utf8');
    console.log('lockout_message=' + st.lockout_message);
  } else {
    st.lockout_message = '';
  }
  fs.ensureDirSync(st.contact_store_path);
  if (fs.existsSync(st.contact_count_path)) {
    const str = fs.readFileSync(st.contact_count_path, 'utf8');
    st.contact_count = parseFloat(str);
    console.log('contact_count=' + st.contact_count);
  }
}

function lockout_set(lockout_message) {
  if (!lockout_message) {
    fs.removeSync(st.lockout_message_path);
  } else {
    fs.writeFileSync(st.lockout_message_path, lockout_message);
  }
  st.lockout_message = lockout_message;
}

// Return user for email/password match
function validate_user(query) {
  const { email, password, utoken } = query;
  // console.log('validate_user query=' + JSON.stringify(query));
  const nemail = email.toLowerCase();
  let password_sha1;
  if (password) password_sha1 = sha1(password);
  if (utoken) password_sha1 = utoken;
  // console.log('validate_user email', '|' + nemail + '|');
  // console.log('password', '|' + password + '|', typeof password);
  // console.log('password_sha1', password_sha1);
  return st.db.users.find(
    item => item.email === nemail && item.password == password_sha1
  );
}

function user_fetch(query) {
  const user = validate_user(query);
  // console.log('user_fetch user=' + JSON.stringify(user));
  const resp = [];
  if (user) {
    // Return user info
    // drop password. Add utoken and lockout_message
    const nuser = Object.assign({}, user);
    delete nuser.password;
    nuser.utoken = user.password;
    // Don't lockout admin user
    if (!nuser.admin && st.lockout_message)
      nuser.lockout_message = st.lockout_message;
    if (st.lockout_message) nuser.admin_lockout_message = st.lockout_message;
    console.log('user_fetch nuser', nuser);
    resp.push(nuser);
  }
  return resp;
}
