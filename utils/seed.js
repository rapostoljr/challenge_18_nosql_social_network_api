const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUserame, getRandomEmail } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }


  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const assignments = getRandomAssignments(20);

    const username = getRandomUserame();
    const email = getRandomEmail();

    users.push({
        username,
        email,
        friends,
        thoughts,
    });
  }

  // Add users to the collection and await the results
  const userData = await User.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.insertOne({
    thoughtText: "Here is a random thought, but I can't put it into words",
    email: 'hereisanemail@test.com',
    students: [...userData.map(({_id}) => _id)],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
