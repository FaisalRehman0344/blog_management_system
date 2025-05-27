const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { postsService } = require('../services');
const { Roles } = require('../config/roles');
const { default: mongoose } = require('mongoose');

const createPost = catchAsync(async (req, res) => {
  const payload = req.body;
  payload.author = req.user.id;
  const post = await postsService.createPost(req.body);
  res.status(httpStatus.status.CREATED).send(post);
});

const getPosts = catchAsync(async (req, res) => {
  const filter = []
  const orCondition = [];
  const my = req.my;

  const { title, content, tag, status } = req.query;

  if (!!my && !!req.user) {
    filter.push({ author: new mongoose.Types.ObjectId(req.user.id) });
  }

  if (!!title) {
    orCondition.push({ title: { $regex: title, $options: 'i' } })
  }

  if (!!content) {
    orCondition.push({ content: { $regex: content, $options: 'i' } })
  }

  if (!!tag) {
    orCondition.push({ tags: { $in: [tag] } });
  }

  if (!!status) {
    filter.push({ status })
  }

  if (orCondition.length) {
    filter.push({ $or: orCondition });
  }

  const query = filter.length > 0 ? { $and: filter } : {};
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await postsService.getPosts(query, options);
  res.send(result);
});

const updatePost = catchAsync(async (req, res) => {
  const post = await postsService.updatePost(req.params.postId, req.body);
  res.send(post);
});

const deletePost = catchAsync(async (req, res) => {
  let postId = req.params.postId;

  if (req.user.role !== Roles.ADMIN) {
    const post = await postsService.getPostById(postId);
    if (post.author !== req.user.id) {
      throw new ApiError(httpStatus.status.BAD_REQUEST, 'Operation not permitted');
    }
  }

  await postsService.deletePost(postId);
  res.status(httpStatus.status.OK).send();
});

const publishUnpublishPost = catchAsync(async (req, res) => {
  await postsService.publishUnpublishPost(req.params.postId, req.params.status);
  res.status(httpStatus.status.OK).send();
});


const createComment = catchAsync(async (req, res) => {
  const payload = req.body;
  payload.author = req.user.id;
  payload.post = req.params.postId;
  const comment = await postsService.createComment(payload);
  res.status(httpStatus.status.CREATED).send(comment);
});

const getComments = catchAsync(async (req, res) => {

  if (req.user.role !== Roles.ADMIN) {
    const post = await postsService.getPostById(req.params.postId);

    if (post?.author?.toString() !== req.user?.id) {
      throw new ApiError(httpStatus.status.BAD_REQUEST, 'Operation not permitted');
    }
  }

  const comments = await postsService.getComments(req.params.postId);
  res.status(httpStatus.status.OK).send(comments);
});

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  publishUnpublishPost,
  createComment,
  getComments,
};
