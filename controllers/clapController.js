import Feed from "../models/FeedModel.js";
import Clap from "../models/clapModel.js";
import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";
import { handleError } from "../utils/errorUtil.js";

export const create = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { feedId } = req.params;
    console.log(feedId);
    const feed = await Feed.findByPk(feedId);
    const user = await User.findByPk(userId);
    if (!feed || !user) {
      handleError(404, 'No feed found');
    }
    console.log(userId, feedId);
    await Clap.create({ UserId: userId, FeedId: feedId });
    await feed.increment('claps');
    res.status(200).send({message: 'feed liked!'});
  } catch (error) {
    next(error);
  }
}

export const destroy = async (req, res, next) => {
  try {
    const { feedId, userId } = req.params;
    const feed = await Feed.findByPk(feedId);
    const clap = await Clap.findOne({ where: { UserId: userId, FeedId: feedId } })
    if (!clap) {
      handleError(404, 'No clap');
    }
    await clap.destroy();
    await feed.decrement('claps');
    res.status(201).send({message: 'like destroyed'})

  } catch (error) {
    next(error);
  }
}

export const createCommentClap = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { commentId } = req.params;
    const comment = await Comment.findByPk(commentId);
    const user = await User.findByPk(userId);
    if (!comment || !user) {
      handleError(404, 'No comment found');
    }
    console.log(userId, commentId);
    const clap = await Clap.create({ UserId: userId, CommentId: commentId });
    if (!clap) {
      handleError(201, 'Could not like comment')
    }
    await comment.increment('claps');
    res.status(200).send({message: 'comment liked!'});
  } catch (error) {
    next(error);
  }
}