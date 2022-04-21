const bcrypt = require('bcrypt');

async function HashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log('hash: ', hash);
  
  return hash;
}

async function ComparePassword(password, hash) {
  const result = await bcrypt.compare(password, hash);
  return result;
}

function sanitizeString(str) {
  str = str.replace(/[^a-z0-9áéíóúñü/ \.,_-]/gim, " ");
  return str.trim();
}

module.exports = {
   HashPassword,
   ComparePassword,
   sanitizeString,
 
}