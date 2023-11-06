import express, {Request} from 'express';
import {
  catDelete,
  catGet,
  catListGet,
  catPost,
  catPut,
  catPutAdmin,
  catDeleteAdmin,
} from '../controllers/catController';
import multer, {FileFilterCallback} from 'multer';
import {body, param, query} from 'express-validator';
import passport from '../../passport';

const router = express.Router();

router.route('/').get(catListGet).post(catPost);

router.route('/admin/:id').put(catPutAdmin).delete(catDeleteAdmin);

router
  .route('/:id')
  .get(param('id'), catGet)
  .put(param('id'), catPut)
  .delete(param('id'), catDelete);

export default router;
