import Story from "../models/stories.model.js";

export const getSlideDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const slide = await Story.findById(id);
    if (!slide) {
      return res.status(404).send({ error: "Slide not found" });
    }
    res.status(200).json({ slide });
  } catch (err) {
    next(err);
  }
};
