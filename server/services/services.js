const { database } = require('../database');

async function HashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function ComparePassword(password, hash) {
  const result = await bcrypt.compare(password, hash);
  return result;
}



module.exports = {
   HashPassword,
   ComparePassword,
 
}