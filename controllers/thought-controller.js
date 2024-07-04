const { Thought, User, Reaction } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().populate('reactions');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get One Thought
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a thought
    async createThought(req, res) {
        try {
          const newThought = await Thought.create(req.body);
          res.json(newThought);
        } catch (err) {
          res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
          const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
          if (!thought) {
            return res.status(404).json({ message: 'No such thought exists' });
          }    
          const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtsId },
            { $pull: { thoughts: req.params.thoughtsId } },
            { new: true }
          );    
          if (!user) {
            return res.status(404).json({
              message: 'Thought deleted',
            });
          }    
          res.json({ message: 'Thought deleted successfully' });
        } catch (err) {
          res.status(500).json(err);
        }
      },
    // Update a thought by id
    async updateThoughtById(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true, runValidators: true }
          );
          if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    // Add reaction to a thought
    async createReaction(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId,},
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
          );
          if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    // Delete a reaction from a thought
    async deleteReaction(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId,},
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          );
          if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
};