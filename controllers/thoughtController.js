const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get one thought by id
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id });
            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update a thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete a thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });
            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // add a reaction to a thought
    async addReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            );
            res.json(reaction);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // remove a reaction from a thought
    async removeReaction(req, res) {
            try {
                const thought = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $pull: { reactions: { _id: req.params.reactionId } } },
                    { new: true }
                );
                res.json(thought);
            }
            catch (err) {
                res.status(500).json(err);
            }
        }
    };
    
