import User from "../models/user.js";
import Post from "../models/post.js";

const createPost = async (req, res) => {
  try {
    // console.log(req.body, "body");
    const { author, title, description, url, image } = req.body;
    // let {  } = req.body;

    if (!author || !title || !description || !url) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const user = await User.findById(author);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to perform this action" });
    }

    const titleLength = 100;
    const descLength = 500;

    if (title.length > titleLength) {
      return res.status(400).json({
        error: `Title length should be greater than ${titleLength} characters`,
      });
    }

    if (description.length > descLength) {
      return res.status(400).json({
        error: `Description length should be greater than ${descLength} characters`,
      });
    }

    // if (image) {
    //   const uploadResult = await cloudinary.uploader.upload(image);
    //   image = uploadResult.secure_url;
    // }

    const newPost = new Post({
      author,
      title,
      description,
      url,
      image,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in createPost : ", error.mesage);
  }
};

const getFeedPosts = async (req, res) => {
  try {
    // order in descending order
    const posts = await Post.find().sort({ createdAt: -1 });
    // const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getFeedPosts : ", error.mesage);
  }
};

const getPopularPost = async (req, res) => {
  try {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const popularPosts = await Post.aggregate([
      {
        $match: {
          createdAt: { $gte: weekAgo },
        },
      },
      {
        $sort: { likes: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).json(popularPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getPopularPos :", error.message);
  }
};

const getMostVoted = async (req, res) => {
  try {
    const posts = await Post.find().sort({ likes: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getMostVoted :", error.message);
  }
};

const likeUnlike = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const isLiked = post.likes.includes(req.user._id);
    let updatedPost;
    let message;
    if (isLiked) {
      updatedPost = await Post.findByIdAndUpdate(
        id,
        { $pull: { likes: req.user._id } },
        { new: true }
      );
      message = "post unliked";
    } else {
      updatedPost = await Post.findByIdAndUpdate(
        id,
        { $push: { likes: req.user._id } },
        { new: true }
      );
      message = "post liked";
    }
    const response = {
      message,
      ...updatedPost._doc,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in LikeUnlike :", error.message);
  }
};

const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;

    if (!text) {
      return res.status(400).json({ error: "Please enter text" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // if (post.author.toString() === userId.toString()) {
    //   return res
    //     .status(401)
    //     .json({ error: "You cannot reply to your own post" });
    // }

    const reply = {
      text,
      userId,
      username,
      userProfilePic,
    };

    post.replies.push(reply);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in replyToPost :", error.message);
  }
};

const bookmarkPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const isBookmarked = post.bookmarks.includes(req.user._id);
    let updatedPost;
    let message;
    if (isBookmarked) {
      updatedPost = await Post.findByIdAndUpdate(
        id,
        { $pull: { bookmarks: req.user._id } },
        { new: true }
      );
      message = "Post unbookmarked successfully";
    } else {
      updatedPost = await Post.findByIdAndUpdate(
        id,
        { $push: { bookmarks: req.user._id } },
        { new: true }
      );
      message = "Post bookmarked successfully";
    }

    // Manually add the message to the response
    const response = {
      ...updatedPost._doc, // Spread the post document to include all its properties
      message, // Add the message
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in LikeUnlike :", error.message);
  }
};

const getBookmarks = async (req, res) => {
  try {
    // find all post that the user have bookmarked
    const posts = await Post.find({
      bookmarks: { $in: [req.user._id] },
    }).sort({ createdAt: -1 });
    // .populate("author", "username profilePic");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in get user by id", error);
  }
};

const getSearchPosts = async (req, res) => {
  try {
    const { query: q } = req.params;
    const posts = await Post.find({
      $or: [
        { title: { $regex: q.toString(), $options: "i" } },
        { description: { $regex: q.toString(), $options: "i" } },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getSearchPosts :", error.message);
  }
};

export {
  createPost,
  getFeedPosts,
  getPopularPost,
  getMostVoted,
  likeUnlike,
  replyToPost,
  bookmarkPost,
  getBookmarks,
  getSearchPosts,
};
