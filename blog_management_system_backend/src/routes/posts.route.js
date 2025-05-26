const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const postsValidation = require('../validations/posts.validation');
const postsController = require('../controllers/posts.controller');
const { Roles, roles } = require('../config/roles');

const router = express.Router();

router
  .route('/')
  .post(auth(Roles.ADMIN, Roles.AUTHOR), validate(postsValidation.createPost), postsController.createPost)
  .get(validate(postsValidation.getPosts), postsController.getPosts);

router.get('/my', auth(...roles), validate(postsValidation.getPosts), postsController.getMyPosts)

router
  .route('/:postId')
  .put(auth(Roles.ADMIN), validate(postsValidation.updatePost), postsController.updatePost)
  .delete(auth(Roles.ADMIN), validate(postsValidation.deletePost), postsController.deletePost);

router.patch('/:postId/:status', auth(Roles.ADMIN), validate(postsValidation.publishUnpublishPost), postsController.publishUnpublishPost)

router
  .route('/:postId/comments')
  .get(auth(...roles), validate(postsValidation.getComments), postsController.getComments)
  .post(auth(...roles), validate(postsValidation.createComment), postsController.createComment);


module.exports = router;