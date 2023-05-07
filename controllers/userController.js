const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get one user by id
    async getUserById({ params }, res) {
        try {
            const user = await User.findById(params.id);
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a user
    async createUser({ body }, res) {
        try {
            const user = await User.create(body);
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // update a user by id
    async updateUser({ params, body }, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: params.id }, body, { new: true });
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete a user by id
    async deleteUser({ params }, res) {
        try {
            const user = await User.findOneAndDelete({ _id: params.id });
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // add a friend
    async addFriend({ params }, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: params.userId },
                { $addToSet: { friends: params.friendId } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // remove a friend
    async removeFriend({ params }, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

