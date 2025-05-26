const httpStatus = require('http-status');
const { Posts, Comments } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');


const createPost = (post) => {
  return Posts.create(post);
};


const getPosts = (filter, options) => {
  return Posts.paginate(filter, options);
};

const getPostById = (id) => {
  return Posts.findById(id);
};

const getMyPosts = (userId) => {
  return Posts.find({ author: new mongoose.Types.ObjectId(userId) });

};

const updatePost = async (id, post) => {
  const updatedPost = await Posts.updateOne({ _id: id }, { $set: post });
  if (!updatedPost) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'Post not found')
  }

  return getPostById(id);
};

const deletePost = async (id) => {
  const deletedPost = await Posts.findByIdAndDelete(id);

  if (!deletedPost) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'Post not found')
  }

  return deletedPost;
};

const publishUnpublishPost = async (id, status) => {
  const post = await Posts.findById(id);
  if (!post) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'Post not found')
  }

  post.status = status;
  await post.save();

  return post;
};

const createComment = (comment) => {
  return Comments.create(comment)
};

const getComments = (id) => {
  return Comments.find({ post: id })
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
  publishUnpublishPost,
  createComment,
  getComments,
};
