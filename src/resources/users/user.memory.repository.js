const mockService = require('../../service/mock.service');
const data = require('../../data');

let userData = [...data.users];

const getAll = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(userData);
    }, 300);
  });
};

const addUser = async user => {
  const updatedUser = await mockService.addUser(user);
  userData.push(user);
  return updatedUser;
};

const updatedUser = async (id, body) => {
  const allUsers = await getAll();
  const newUserData = allUsers.filter(item => item.id !== id);
  userData = [
    ...newUserData,
    {
      ...body,
      id: id.toString()
    }
  ];
  return body;
};

const deleteUser = async id => {
  const allUsers = await getAll();
  const newUserData = allUsers.filter(item => item.id !== id);
  const user = allUsers.find(item => item.id === id);
  userData = [...newUserData];
  return user;
};

module.exports = {
  getAll,
  addUser,
  updatedUser,
  deleteUser
};
