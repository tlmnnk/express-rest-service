const users = [
  {
    id: 1,
    name: 'Harman Saunderson',
    login: 'hsaunderson0@state.gov',
    password: 'fKEIB9GiWuwG'
  },
  {
    id: 2,
    name: 'Harper Dany',
    login: 'hdany1@technorati.com',
    password: '8MeUgqyU8V0w'
  },
  {
    id: 3,
    name: 'Maria Lghan',
    login: 'mlghan2@earthlink.net',
    password: 'mp43HDB'
  }
];

const boards = [
  {
    id: 0,
    title: 'board 1',
    columns: [
      {
        id: 0,
        title: 'column title',
        order: 0
      }
    ]
  },
  {
    id: 1,
    title: 'board 2',
    columns: [
      {
        id: 0,
        title: 'column title',
        order: 0
      }
    ]
  },
  {
    id: 2,
    title: 'board 3',
    columns: [
      {
        id: 0,
        title: 'column title',
        order: 0
      }
    ]
  }
];

module.exports = {
  users,
  boards
};
