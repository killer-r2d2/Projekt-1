import Datastore from "nedb";

const dbPath = "./data/database.db";
let db = new Datastore({
  filename: dbPath,
  autoload: true,
});

const get = (params) => {
  return new Promise((resolve, reject) => {
    db.find(params, (err, todos) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(todos);
      }
    });
  });
};

const getById = (id) => {
  return new Promise((resolve, reject) => {
    db.findOne({ _id: id }, (err, todo) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(todo);
      }
    });
  });
};

const create = (todo) => {
  return new Promise((resolve, reject) => {
    db.insert(todo, (err, newTodo) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(newTodo);
      }
    });
  });
};

const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    db.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  });
};

const update = (id, todo) => {
  return new Promise((resolve, reject) => {
    db.update({ _id: id }, todo, {}, (err, numReplaced) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
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
};

export default { get, getById, create, update, deleteById };
