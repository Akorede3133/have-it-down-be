import Feed from "../models/FeedModel.js";
import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";
import { handleError } from "../utils/errorUtil.js";

export const create = async (req, res, next) => {
  try {
    const { userId } =  req;
    const { feedId } = req.params;
    const { content } = req.body;
    const user = await User.findByPk(userId);
    const feed = await Feed.findByPk(feedId);
    if (!feed) {
      handleError(404, 'no feed found')
    } 
    const comment = await user.createComment({ content, FeedId: feedId })
    res.status(201).send({ message: 'commented', comment })

  } catch (error) {
    next(error)    
  }
}

export const createReply = async (req, res, next) => {
  try {
    const { userId } =  req;
    const { parentId } = req.params;
    const { content } = req.body;
    const user = await User.findByPk(userId);
    const parent = await Comment.findByPk(parentId);
    if (!parent) {
      handleError(400, 'no comment')
    }
    const comment = await user.createComment({ content, parentId })
    res.status(201).send({ message: 'commented', comment })

  } catch (error) {
    next(error)    
  }
}

const getComments = async (req, res, next) => {
  try {
    const { feedId } = req.params;
    const feed = Feed.findByPk(feedId);
    if (!feed) {
      handleError(404, 'no feed found')
    }
    // const comments = 
  } catch (error) {
    
  }
}