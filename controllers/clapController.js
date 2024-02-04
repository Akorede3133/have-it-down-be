import Feed from "../models/FeedModel.js";
import { handleError } from "../utils/errorUtil.js";

export const create = async (req, res, next) => {
  try {
    const { feedId } = req.params;
    const feed = await Feed.findByPk(feedId);
    if (feed) {
      handleError(404, 'No feed found');
    }
    await feed.increment('claps');
    res.staus(200).send({message: 'feed liked!'});
  } catch (error) {
    next(error);
  }
}