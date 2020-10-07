const db = require('../../db');

const getAll = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(db.users);
    }, 300);
  });
};

const addUser = async user => {
  db.users.push(user);
  return user;
};

const updatedUser = async (id, body) => {
  const userToUpdate = db.users.find(item => item.id === id);
  const newUserData = db.users.filter(item => item.id !== id);
  if (userToUpdate) {
    db.users = [
      ...newUserData,
      {
        ...body,
        id: id.toString()
      }
    ];
    return body;
  }
  return null;
};

const deleteUser = async id => {
  const newUserData = db.users.filter(item => item.id !== id);
  const user = db.users.find(item => item.id === id);
  db.unassignTasks(id);
  db.users = [...newUserData];
  return user;
};

module.exports = {
  getAll,
  addUser,
  updatedUser,
  deleteUser
};
