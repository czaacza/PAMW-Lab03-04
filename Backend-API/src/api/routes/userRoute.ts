import express from 'express';
import {
  checkToken,
  userDeleteCurrent,
  userGet,
  userListGet,
  userPost,
  userPutCurrent,
} from '../controllers/userController';
import passport from '../../passport';

const router = express.Router();

router.route('/').get(userListGet).post(userPost).delete(userDeleteCurrent);

router.route('/:id').get(userGet).put(userPutCurrent);

export default router;
