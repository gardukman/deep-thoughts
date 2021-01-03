const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        thoughts: async (parent, { username }) => {
            // we use a ternary operator to check if username exists.
            // if it does, we set params to an object with a username key set to that value.
            // if it doesn't we simply return an empty object.
            const params = username ? { username } : {};
            // we pass the object, with or without any data in it to our .find() method
            // if there's data, it'll perform a lookup by a specific username
            // if there's not it'll simply return every thought
            return Thought.find().sort({ createdAt: -1 });


        },
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        }
    }
};

module.exports = resolvers;