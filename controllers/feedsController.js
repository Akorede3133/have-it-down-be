import { validationResult } from "express-validator"
import Feed from "../models/FeedModel.js";
import { handleError } from "../utils/errorUtil.js";
import User from "../models/userModel.js";

export const create = async (req, res, next) => {
  try {
    const userId  = req.userId;
    const { title, content, draft } = req.body;
    const user = await User.findByPk(userId)
    console.log(title, content, draft);
    const feed = await user.createFeed({title, content, draft});
    res.status(201).send(feed);
  } catch (error) {
    next(error)
  }
}

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, draft } = req.body;
    console.log(id, content);
    // const feed = await Feed.findByPk(id);
    // if (!feed) {
    //   handleError(404, 'No feed was found');
    // }
    // feed.update({title, content});
    // res.status(201).send(feed);
  } catch (error) {
    next(error)
  }
}

export const index = async (req, res, next) => {
  try {
    const feeds = await Feed.findAll({ include: {
      model: User,
      attributes: ['name']
    } });
    res.status(200).send(feeds);
  } catch (error) {
    next(error)
  }
}

export const show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const feed = await Feed.findByPk(id, { include: {
      model: User,
      attributes: ['name']
    } });
    if (!feed) {
      handleError(404, 'No feed was found');
    }
    res.status(200).send(feed);

  } catch (error) {
    next(error)
  }
}