import { validationResult } from "express-validator"
import Feed from "../models/FeedModel.js";
import { handleError } from "../utils/errorUtil.js";

export const create = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const feed = await Feed.create({title, content});
    res.status(201).send(feed);
  } catch (error) {
    next(error)
  }
}

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const feed = await Feed.findByPk(id);
    if (!feed) {
      handleError(404, 'No feed was found');
    }
    feed.update({title, content});
    res.status(201).send(feed);
  } catch (error) {
    next(error)
  }
}