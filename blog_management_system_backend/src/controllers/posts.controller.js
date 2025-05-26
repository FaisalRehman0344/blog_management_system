const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { postsService } = require('../services');
const { Roles } = require('../config/roles');
const { PostStatus } = require('../utils/Constants');

const createPost = catchAsync(async (req, res) => {
  const payload = req.body;
  payload.author = req.user.id;
  const post = await postsService.createPost(req.body);
  res.status(httpStatus.status.CREATED).send(post);
});

const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'content', 'tags']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  filter.status = PostStatus.PUBLISHED;
  const result = await postsService.getPosts(filter, options);
  res.send(result);
});

const getMyPosts = catchAsync(async (req, res) => {
  const posts = await postsService.getMyPosts(req.user.id);
  if (!posts) {
    throw new ApiError(httpStatus.status.NOT_FOUND, 'Posts not found');
  }
  res.send(posts);
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
  getMyPosts,
  updatePost,
  deletePost,
  publishUnpublishPost,
  createComment,
  getComments,
};
