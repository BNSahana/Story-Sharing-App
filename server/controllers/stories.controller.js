import Story from "../models/stories.model.js";
import Post from "../models/post.model.js";


  // Fetch all posts from the database
export const getAllPosts = async (req, res, next) => {
  try {
    const allPosts = await Post.find().populate("slides").lean();
    res.status(200).json(allPosts);
  } catch (err) {
    next(err);
  }
};
// Get post details by ID
export const getPostDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existingPost = await Post.findById(id).populate("slides").lean();
    res.status(200).send(existingPost);
  } catch (err) {
    next(err);
  }
};

// Add a new post
export const createPost = async (req, res, next) => {
  try {
    const { slides } = req.body;
    const slideObjects = slides.map((slideData, index) => ({
      slideNumber: index + 1,
      ...slideData,
      likes: [],
    }));
    const createdSlides = await Story.create(slideObjects);
    const post = new Post({
      slides: createdSlides.map((slide) => slide._id),
      postedBy: req.user,
    });
    await post.save();
    res.status(201).send({ message: "Post created successfully" });
  } catch (err) {
    next(err);
  }
};

// Edit an existing post
export const editPost = async (req, res, next) => {
  try {
    const { slides: editedSlides } = req.body;
    const { id } = req.params;
    const existingPost = await Post.findById(id);
    await Story.deleteMany({ _id: { $in: existingPost.slides } });
    const slideObjects = editedSlides.map((slideData, index) => ({
      slideNumber: index + 1,
      ...slideData,
      likes: [],
    }));
    const createdSlides = await Story.create(slideObjects);
    existingPost.slides = createdSlides.map((slide) => slide._id);
    await existingPost.save();
    res.status(200).send({ message: "Post updated successfully" });
  } catch (err) {
    next(err);
  }
};

// Get posts by category
export const getPostsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "stories",
          localField: "slides",
          foreignField: "_id",
          as: "slides",
        },
      },
      {
        $addFields: {
          slides: {
            $filter: {
              input: "$slides",
              as: "slide",
              cond: { $eq: ["$$slide.category", category] },
            },
          },
        },
      },
      {
        $match: {
          slides: { $ne: [] },
        },
      },
      {
        $project: {
          slides: 1,
          postedBy: 1,
        },
      },
    ]);
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};

// Delete Post
export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id); // Find the post by ID and delete it
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};
