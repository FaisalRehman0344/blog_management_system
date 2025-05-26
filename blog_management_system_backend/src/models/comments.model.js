const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { PostStatus } = require('../utils/Constants');

const commentsSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        post: {
            type: mongoose.Types.ObjectId,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

commentsSchema.plugin(toJSON);
commentsSchema.plugin(paginate);

const Comment = mongoose.model('Comments', commentsSchema);

module.exports = Comment;