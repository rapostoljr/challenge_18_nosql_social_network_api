const names = [
    'Ethan',
    'Isabella',
    'Liam',
    'Sophia',
    'Noah',
    'Olivia',
    'Lucas',
    'Emma',
    'Mason',
    'Ava',
    'Jacob',
    'Samantha',
    'William',
    'Logan',
    'Mia',
    'Benjamin',
    'Emily',
    'Michael',
    'Abigail',
    'Alexander',
    'Harper',
  ];

  const comments = [
    "Wow, that's impressive!",
    "I totally agree with you.",
    "What a beautiful day!",
    "That's so funny!",
    "I'm not sure about that...",
    "You're kidding, right?",
    "I'm feeling hungry now.",
    "This movie is amazing!",
    "I wish I could do that.",
    "Could you please explain again?",
    "Let's go on an adventure!",
    "I'm feeling sleepy...",
    "That's a brilliant idea!",
    "I can't believe it!",
    "How did you manage that?",
    "It's too hot outside.",
    "I'm really proud of you.",
    "This song is stuck in my head.",
    "I need a vacation!",
    "Time flies so fast!",
  ];

  // Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)}`;

// Gets a random Username using names
const getRandomUsername = () =>
  `${getRandomArrItem(names)}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

// Gets a random thought using comments
const getRandomThought = () =>
  `${getRandomArrItem(comments)}`;

// Creates a random reaction
const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(comments),
      username: `${getRandomArrItem(names)}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`,
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomReactions, getRandomThought, getRandomUsername };