import { openDB } from 'idb';

const initdb = async () => {
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Logic to add content to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  // Create a connection to the database database and version we want to use.
  const db = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = db.transaction('jate', 'readwrite');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the .put() method to insert data into the database.
  const request = store.put({ id: 1, content: content });
  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Logic to get all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  // Create a connection to the database database and version we want to use.
  const db = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = db.transaction('jate', 'readonly');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();
  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data retrieved from the database', result);
  return result;
};

initdb();
