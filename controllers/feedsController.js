import { validationResult } from "express-validator"
import Feed from "../models/FeedModel.js";
import { handleError } from "../utils/errorUtil.js";
import User from "../models/userModel.js";
import Clap from "../models/clapModel.js";
import Comment from "../models/commentModel.js";

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

// Recursive function to fetch nested replies
const getRepliesRecursive = async (commentId) => {
  const replies = await Comment.findAll({
    where: { parentId: commentId },
    include: [
      {
        model: User,
        attributes: ['name'],
      },
      {
        model: Comment,
        as: 'replies',
        include: [
          {
            model: User,
            attributes: ['name'],
          },
          {
            model: Clap,
            attributes: ['UserId']
          }
        ],
      },
    ],
  });

  // Recursively fetch replies for each reply
  const nestedRepliesPromises = replies.map((reply) =>
    getRepliesRecursive(reply.id)
  );
  const nestedReplies = await Promise.all(nestedRepliesPromises);
  // Attach nested replies to each reply
  replies.forEach((reply, index) => {
    reply.dataValues.replies = nestedReplies[index];
  });

  return replies;
};

export const show = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const feed = await Feed.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Clap,
          attributes: ['UserId'],
        },
        {
          model: Comment,
          // as: 'Comments',
          // where: { parentId: null }, // Fetch only top-level comments
          include: [
            {
              model: User,
              attributes: ['name'],
            },
            {
              model: Comment,
              as: 'replies',
              include: [
                {
                  model: User,
                  attributes: ['name'],
                },
              ],
            },
            {
              model: Clap,
            }
          ],
        },
      ],
    });

    if (!feed) {
      handleError(404, 'No feed was found');
    }

      // Check if feed has comments before processing them
      if (feed.Comments) {
        // If Comments is null, convert it to an empty array
        const topLevelComments = feed.Comments || [];
  
        // Fetch nested replies for each top-level comment
        const topLevelRepliesPromises = topLevelComments.map((comment) =>
          getRepliesRecursive(comment.id)
        );
        const topLevelReplies = await Promise.all(topLevelRepliesPromises);
  
        // Attach nested replies to each top-level comment
        topLevelComments.forEach((comment, index) => {
          comment.dataValues.replies = topLevelReplies[index];
        });
      }
  
      res.status(200).send(feed);
  } catch (error) {
    next(error);
  }
};



