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
        .then((dbThoughtsData) => {
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
  deleteThoughts({ params }, res) {
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


  // add reactions to thought
  addReactions({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No Thought found with this id!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  // remove reply
  removeReactions({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $pull: { reactions: { reactionsId: params.reactionsId } } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtsController;