// Contact.js

const fs = require('fs-extra');
const path = require('path');
const requestIp = require('request-ip');

const { st } = require('./State');

module.exports = {
  log_contact,
};

function log_contact(req, doneFunc) {
  const ip = requestIp.getClientIp(req).replace(/(:)./g, '-');
  console.log('log_contact ip', ip);
  //  { uid }
  //  { email, contactName, message, token }
  const cobj = { ...req.body, ip };
  if (cobj.uid) {
    doneFunc({ token: cobj.uid });
    // doneFunc({});
    return;
  }
  st.contact_count_dirty = 1;
  st.contact_count++;
  // store/contacts/<ip>_<contact_count>.json
  const logname = ip + '-' + pad(st.contact_count, 4) + '.json';
  const cpath = path.resolve(st.contact_store_path, logname);
  fs.writeJson(cpath, cobj, { spaces: 2 })
    .then(() => {
      const now = Date.now();
      if (st.contact_start_time + st.contact_interval < now) {
        st.contact_start_time = now;
        st.contact_count_dirty = 0;
        return fs.writeFile(st.contact_count_path, st.contact_count + '');
      }
    })
    .then(() => {
      doneFunc({ msg: 'Submitted OK. (' + st.contact_count + ')' });
    })
    .catch(err => {
      console.log('log_contact err.message', err.message);
      doneFunc({ msg: err.message, error: 1 });
    });
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
