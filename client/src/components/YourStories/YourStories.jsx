import React, { useEffect, useState } from "react";
import styles from "./YourStories.module.css";
import StoryFeed from "../StoryFeed/StoryFeed";
import { fetchYourStories } from "../../api/story";

const YourStories = (props) => {
  const [yourStories, setYourStories] = useState([]);
  const [maxStoriesInRow, setMaxStoriesInRow] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stories = await fetchYourStories(props.selectedFilters);
        setYourStories(stories);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props.selectedFilters]);

  if (isLoading) {
    return (
      <div className={styles.category__container}>
        <div className={styles.category__header}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.category__container}>
      {yourStories.length > 0 && (
        <div className={styles.category__header}>Your Stories</div>
      )}
      <div className={styles.category__stories}>
        {yourStories.map((story, index) => (
          <StoryFeed
            key={index}
            story={story}
            authValidated={props.authValidated}
            handleStoryViewer={props.handleStoryViewer}
          />
        ))}
      </div>
      {!isMobile && yourStories.length > maxStoriesInRow && (
        <button
          onClick={() =>
            setMaxStoriesInRow(
              maxStoriesInRow + 4 > yourStories.length
                ? yourStories.length
                : maxStoriesInRow + 4
            )
          }
          className={styles.seemore__btn}
        >
          See more
        </button>
      )}
    </div>
  );
};

export default YourStories;
