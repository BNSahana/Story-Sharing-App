import React from "react";
import styles from "./StoryFeed.module.css";
import editIcon from "../../assets/editIcon.png";
import { Link } from "react-router-dom";

const StoryFeed = (props) => {
  const { slides, postedBy, _id } = props.story;

  if (slides.length === 0) {
    return null;
  }

  const handleStoryClick = () => {
    console.log("Clicked!");
    console.log("Slides:", slides);
    props.handleStoryViewer(slides);
  };

  const isCreatedByUser = postedBy === localStorage.getItem("userId");

  return (
    <div className={styles.wrapper}>
      <div
        onClick={handleStoryClick}
        className={styles.category__story}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0 ), rgba(0, 0, 0,  0.9)), url(${slides[0].imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={styles.category__story__header}>{slides[0].header}</div>
        <div className={styles.category__story__description}>
          {slides[0].description}
        </div>
      </div>

      {/* show edit btn only for the posts created by the user */}
      {isCreatedByUser && (
        <button className={styles.edit__btn}>
          <Link
            to={`?editstory=true&id=${_id}`}
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <div className={styles.edit__btn__container}>
              <img src={editIcon} alt="edit-icon" />
              <p> Edit</p>
            </div>
          </Link>
        </button>
      )}
    </div>
  );
};

export default StoryFeed;
