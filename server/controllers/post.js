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

export { createPost, getFeedPosts, getPopularPost, getMostVoted };
