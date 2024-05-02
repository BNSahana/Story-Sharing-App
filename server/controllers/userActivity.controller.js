import User from "../models/auth.model.js";
import Story from "../models/stories.model.js";
import Post from "../models/post.model.js";

export const addBookmark = async (req, res, next) => {
  try {
    const { slideId } = req.body;
    const { user: userId } = req;

    if (!userId || !slideId) {
      return res
        .status(400)
        .json({ error: "Both userId and slideId are required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.bookmarks.push(slideId);
    await user.save();

    return res.status(200).json({ message: "Bookmark added successfully" });
  } catch (err) {
    next(err);
  }
};
export const removeBookmark = async (req, res, next) => {
  try {
    const { slideId } = req.body;
    const { user: userId } = req;

    if (!userId || !slideId) {
      return res
        .status(400)
        .json({ error: "Both userId and slideId are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.bookmarks = user.bookmarks.filter(
      (bookmark) => bookmark.toString() !== slideId
    );
    await user.save();

    return res.status(200).json({ message: "Bookmark removed successfully" });
  } catch (err) {
    next(err);
  }
};
export const addLike = async (req, res, next) => {
  try {
    const { slideId } = req.body;
    const { user: userId } = req;

    if (!userId || !slideId) {
      return res
        .status(400)
        .json({ error: "Both userId and slideId are required" });
    }

    const slide = await Story.findById(slideId);
    if (!slide) {
      return res.status(404).json({ error: "Slide not found" });
    }

    if (slide.likes.includes(userId)) {
      slide.likes = slide.likes.filter((like) => like.toString() !== userId);
      await slide.save();
      return res.status(200).json({
        message: "Story unliked successfully",
        likeCount: slide.likes.length,
        likeStatus: false,
      });
    }

    slide.likes.push(userId);
    await slide.save();

    return res.status(200).json({
      message: "Story liked successfully",
      likeCount: slide.likes.length,
      likeStatus: true,
    });
  } catch (err) {
    next(err);
  }
};

export const getFilteredPosts = async (req, res, next) => {
  const { filters } = req.body;
  try {
    const userId = req.user;
    let filteredPosts;

    if (filters.includes("All")) {
      filteredPosts = await Post.find({ postedBy: userId }).populate({
        path: "slides",
        match: {},
      });
    } else {
      filteredPosts = await Post.find({ postedBy: userId }).populate({
        path: "slides",
        match: { category: { $in: filters } },
      });
    }

    filteredPosts = filteredPosts.filter((post) => post.slides.length > 0);
    res.status(200).json({ posts: filteredPosts });
  } catch (err) {
    next(err);
  }
};
export const getUserBookmarks = async (req, res, next) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).populate("bookmarks");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const bookmarks = user.bookmarks.map((bookmark) => ({
      slides: [bookmark],
    }));
    res.status(200).json({ bookmarks });
  } catch (err) {
    next(err);
  }
};
export const checkBookmarkStatus = async (req, res, next) => {
  try {
    const { slideId } = req.params;
    const userId = req.user;

    if (!userId || !slideId) {
      return res
        .status(400)
        .json({ error: "Both userId and slideId are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isBookmarked = user.bookmarks.includes(slideId);
    res.status(200).json({ isBookmarked });
  } catch (err) {
    next(err);
  }
};
