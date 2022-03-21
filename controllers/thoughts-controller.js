const { Thoughts, User } = require('../models');

const thoughtsController = {
  //get all users
    getAllThoughts(req, res) {
      Thoughts.find({})
        .then((dbThoughtsData) => res.json(dbThoughtsData))
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    getThoughtsById({ params }, res) {
      Thoughts.findOne({ _id: params.id })
        .then((dbThoughtData) => {
          // If no Thought is found, send 404
          if (!dbThoughtsData) {
            res.status(404).json({ message: "No Thought found with this id!" });
            return;
          }
          res.json(dbThoughtsData);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },


  // add thought to user
  addThoughts({ params, body }, res) {
    console.log(body);
    Thoughts.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.thoughtsId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // updates thought
  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No Thought found with this id!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  // deletes thought
  removeThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No Thought found with this id!" });
          return;
        }
        res.jsonn(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },


  // add reply to thought
  addReply({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // remove thought
  removeThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.thoughtsId })
      .then(deletedThoughts => {
        if (!deletedThoughts) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtsId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // remove reply
  removeReply({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtsController;