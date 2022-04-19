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

async function CreateUser(username, password, firstName, lastName) {
  const hash = await HashPassword(password);
  const user = new User({
    username: username,
    password: hash,
    firstName: firstName,
    lastName: lastName,
    graph: {},
  });
  await database.collection('accounts').insertOne(user);
  return "Account created";
}

async function Connect(username,password)
{
    const user = await database.collection('accounts').findOne({username});
    if(!user)
    {
        return false;
    }
    const result = await ComparePassword(password, user.password);
    if(result)
    {
        return user;
    }
    return false;
}

module.exports = {
   HashPassword,
   ComparePassword,
    CreateUser,
    Connect
}