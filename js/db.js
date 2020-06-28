let dbPromised = idb.open("fb_app", 1, (upgradedDb) => {
  let fbObjectStore = upgradedDb.createObjectStore("teams", { keyPath: "id" });

  fbObjectStore.createIndex("name", "name", { unique: false });
});

function saveTeam(team) {
  dbPromised
    .then((db) => {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");

      store.put(team);
      return tx.complete;
    })
    .then(() => {
      console.log("Article berhasil disimpah");
    });
}

function getAll() {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");

        return store.getAll();
      })
      .then((teams) => {
        resolve(teams);
      });
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");

        return store.get(parseInt(id));
      })
      .then((team) => {
        resolve(team);
      });
  });
}

function deleteFavTeam(id) {
  dbPromised
    .then((db) => {
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");

      store.delete(id);
      return tx.complete;
    })
    .then(() => {
      console.log("delete success");
    });
}
