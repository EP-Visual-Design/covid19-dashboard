//
// User management for ../api/db.json

// node user.js --add --email user-email --password password
// node user.js --add --email user-email --password password --admin --app us
// node user.js --add --email user-email --password password --admin --app eu

// node user.js --remove --user user-name
//

const fs = require('fs-extra');
const sha1 = require('js-sha1');
const argv = require('yargs').argv;
const path = require('path');

const email = argv.email;
const password = argv.password + '';
const admin = argv.admin;
const app = argv.app;
let lstore = argv.lstore;
if (!lstore) lstore = 'store';

// const store_path = path.resolve('../api/store/_store.json');
// const db = fs.readJsonSync(store_path);

const heads_path = path.resolve('../' + lstore);
const users_path = path.resolve(heads_path, 'user.json');
const db = {};
db.users = fs.readJsonSync(users_path);

// Write db users to file
function save_db_users() {
  console.log('save_db_users n users=' + db.users.length);
  fs.writeJsonSync(users_path, db.users, { spaces: 2 });
}

let password_sha1;
if (password) password_sha1 = sha1(password);

const nemail = email.toLowerCase();

function find_next_user_id() {
  const maxid = db.users.reduce(
    (acc, item) => (item.id > acc ? item.id : acc),
    -1
  );
  return maxid + 1;
}

console.log('users_path', users_path);
console.log('email', email);
console.log('password', '|' + password + '|', typeof password);
console.log('password_sha1', password_sha1);

function run() {
  if (!email) {
    console.log('--email missing');
  } else if (argv.add) {
    let user = db.users.find(item => item.email === nemail);
    if (!user) {
      console.log('New email=' + email);
      user = {};
      db.users.push(user);
    } else {
      console.log('Updating email=' + email);
    }
    user.email = nemail;
    if (password_sha1) user.password = password_sha1;
    user.admin = admin ? 1 : 0;
    if (!user.id) user.id = find_next_user_id();
    if (app) user.app = app;
    save_db_users();
  } else if (argv.remove) {
    const nusers = db.users.filter(item => item.email !== nemail);
    if (nusers.length == db.users.length) {
      console.log('No email=' + nemail);
    } else {
      const count = db.users.length - nusers.length;
      console.log('Removing email=' + nemail + ' count=' + count);
      db.users = nusers;
      save_db_users();
    }
  } else {
    console.log('--add or --remove');
  }
}

run();
