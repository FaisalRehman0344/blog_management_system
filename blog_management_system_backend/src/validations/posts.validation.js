const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      content: Joi.string().required(),
      tags: Joi.array().items(Joi.string()),
    })
    .min(1),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

const publishUnpublishPost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
    status: Joi.string().required().valid('draft', 'published'),
  }),
};

const getComments = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

const createComment = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      content: Joi.string().required(),
    })
    .min(1),
};


module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  publishUnpublishPost,
  getComments,
  createComment
};
