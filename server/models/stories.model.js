import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    header: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    slideNumber: {
      type: Number,
      required: true,
    },
    likes: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);
export default Story;
