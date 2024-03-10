const { MongoClient } = require('mongodb');

let db;

async function connectToDatabase(uri) {
  if (db) return db;

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    db = client.db('EmpowerHer'); // This will use the default database provided in the URI
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Connection to MongoDB failed:', error);
    throw error;
  }

  return db;
}

function getDb() {
  if (!db) {
    throw new Error('No database connection');
  }
  return db;
}

module.exports = { connectToDatabase, getDb };
