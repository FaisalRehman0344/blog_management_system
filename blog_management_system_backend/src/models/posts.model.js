const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { PostStatus } = require('../utils/Constants');

const postsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: [...Object.values(PostStatus)],
      default: 'draft',
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

postsSchema.plugin(toJSON);
postsSchema.plugin(paginate);

const Post = mongoose.model('Posts', postsSchema);

module.exports = Post;
