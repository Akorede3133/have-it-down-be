import Feed from "../models/FeedModel.js";
import Clap from "../models/clapModel.js";
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