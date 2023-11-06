import {NextFunction} from 'express';

import {Request, Response} from 'express';
import CatModel from '../models/catModel';
import {Cat} from '../../interfaces/Cat';
import {validationResult} from 'express-validator';
import CustomError from '../../classes/CustomError';
import DBMessageResponse from '../../interfaces/DBMessageResponse';

const catListGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    const cats = await CatModel.find().populate('owner');
    if (!cats || cats.length === 0) {
      next(new CustomError('No cats found', 404));
    }

    res.status(200).json(cats);
  } catch (error) {
    next(error);
  }
};

const catGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }
    const catId = req.params.id;

    const cat = await CatModel.findById(catId).populate('owner');
    if (!cat) {
      res.status(404).json({message: 'Cat not found'});
    }
    res.status(200).json(cat);
  } catch (error) {
    next(error);
  }
};

const catPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    const ownerId = req.body.owner;

    const catToSend = {
      ...req.body,
      owner: ownerId,
    };

    const cat = await CatModel.create(catToSend);

    cat.populate('owner');

    const message: DBMessageResponse = {
      message: 'Cat created',
      data: cat as Cat,
    };
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

const catPut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    const catId = req.params.id;
    const cat = await CatModel.findById(catId);

    if (!cat) {
      res.status(404).json({message: 'Cat not found'});
    }

    const catResult = await CatModel.findByIdAndUpdate(catId, req.body, {
      new: true,
    }).populate('owner');

    const message: DBMessageResponse = {
      message: 'Cat updated',
      data: catResult as Cat,
    };

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

const catDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    const catId = req.params.id;
    const cat = await CatModel.findById(catId);
    if (!cat) {
      res.status(404).json({message: 'Cat not found'});
    }

    const catResult = await CatModel.findByIdAndDelete(catId).populate('owner');

    const message: DBMessageResponse = {
      message: 'Cat deleted',
      data: catResult as Cat,
    };
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export {catGet, catListGet, catPost, catPut, catDelete};
