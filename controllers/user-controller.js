const { User } = require('../models');

module.exports = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
          }
    },
    // Get one user
    async getOneUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId }).populate('thoughts');    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    // Create a new user
    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          return res.status(500).json(err);
        }
    },
    // Delete a user
    async deleteUser(req, res) {
        try {
          const user = await User.findByIdAndDelete(req.params.userId);
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }

          await User.deleteMany({ _id: { $in: user.thoughts }});
          res.json({ message: 'User and thoughts deleted successfully' });

        } catch (err) {
          res.status(500).json(err);
        }
    },
    // Update a course
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Adds a friend to a user
  async addFriend(req, res) {

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.usersId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No friend found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Removes friend from a user
  async removeFriend(req, res) {

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.usersId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No friend found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};