const uuid = require('uuid');

class BoardModel {
  constructor({ title = 'new board', columns = [{}] }) {
    this.id = uuid();
    this.title = title;
    this.columns = this.mapColumns(columns);
  }

  mapColumns(columns) {
    if (!columns.length) {
      return [
        {
          id: uuid(),
          title: 'Default board',
          order: 0
        }
      ];
    }
    return columns.map((column, i) => {
      return {
        id: uuid(),
        title: column.title ? column.title : `column №${i}`,
        order: i
      };
    });
  }
}

module.exports = BoardModel;
