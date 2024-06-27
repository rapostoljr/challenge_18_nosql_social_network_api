const username = [
    'lejandary',
    '5und0wn',
    'goofy',
    'uber',
    'classic',
    'mistahmel',
    'SenoraMeowMeow',
  ];

  const email = [
    'grivever@test.com',
    'poison@test.com',
    'liekomigosh@test.com',
    'renob@test.com',
    'cissalc@test.com',
    'boomgoesthedynamite@test.com',
    'edmillionaire@test.com',
  ];

  // Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUserame = () =>
  `${getRandomArrItem(username)}`;

const getRandomEmail = () => 
    `${getRandomArrItem(email)}`;

// Function to generate random assignments that we can add to student object.
const getRandomAssignments = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      assignmentName: getRandomArrItem(appDescriptions),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUserame, getRandomEmail };