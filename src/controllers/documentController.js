const db = require('../db');

const getDocuments = async (req, res) => {
  try {
    const educationCollection = db.collection('Education');
    const usersCollection = db.collection('Users');

    // Fetch documents from the 'Education' collection
    const educationDocuments = await educationCollection.find().toArray();

    // Fetch documents from the 'Users' collection
    const userDocuments = await usersCollection.find().toArray();

    // Combine documents from different collections if needed
    const allDocuments = {
      education: educationDocuments,
      users: userDocuments,
    };

    res.json(allDocuments);
  } catch (error) {
    console.error('Error retrieving documents:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { getDocuments };
