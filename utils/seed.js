const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomReactions, getRandomThought, getRandomUsername } = require('./data');

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

    let friendsCheck = await connection.db.listCollections({ name: 'friends' }).toArray();
    if (friendsCheck.length) {
      await connection.dropCollection('friends');
    }


  // Create empty array to hold the users
  const thoughts = [];

  // Loop 3 times -- add thoughts to the thoughts array
  for (let i = 0; i < 3; i++) {
    
    const reactions = getRandomReactions(2);

    var thoughtText = getRandomThought();
    var username = `${getRandomUsername()}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    thoughts.push({
      thoughtText,
      username,
      reactions,
    });
  }

  // Add thoughts to the collection and await the results
  const thoughtData = await Thought.insertMany(thoughts);

  // Add users to the collection and await the results
  await User.insertMany({
    username: getRandomUsername(),
    email: `${username}@gmail.com`,
    thoughts: [...thoughtData.map(({_id}) => _id)],
  });

  // Log out the seed data to indicate what should appear in the database
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
