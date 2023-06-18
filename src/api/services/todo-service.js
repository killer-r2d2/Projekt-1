import Datastore from "nedb";

const dbPath = "./data/database.db";
const db = new Datastore({
  filename: dbPath,
  autoload: true,
});

const get = (filter = {}, sort = {}) =>
  new Promise((resolve, reject) => {
    db.find(filter, (err, todos) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        const sortedTodos = todos.sort((a, b) => {
          // eslint-disable-next-line no-restricted-syntax, guard-for-in
          for (const key in sort) {
            if (a[key] < b[key]) return sort[key]; // returns -1 or 1 depending on sort[key]
            if (a[key] > b[key]) return -sort[key]; // returns 1 or -1 depending on sort[key]
          }
          return 0;
        });
        resolve(sortedTodos);
      }
    });
  });

const getById = (id) =>
  new Promise((resolve, reject) => {
    db.findOne({ _id: id }, (err, todo) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(todo);
      }
    });
  });

const create = (todo) =>
  new Promise((resolve, reject) => {
    db.insert(todo, (err, newTodo) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(newTodo);
      }
    });
  });

const deleteById = (id) =>
  new Promise((resolve, reject) => {
    db.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  });

const update = (id, todo) =>
  new Promise((resolve, reject) => {
    db.update({ _id: id }, todo, {}, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        // eslint-disable-next-line no-shadow
        db.findOne({ _id: id }, (err, updatedTodo) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(updatedTodo);
          }
        });
      }
    });
  });

export default { get, getById, create, update, deleteById };
