import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import StoryFeed from "../StoryFeed/StoryFeed";
import { fetchCategoryStories } from "../../api/story";

const Categories = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [categoryStories, setCategoryStories] = useState([]);
  const [maxStoriesInRow, setMaxStoriesInRow] = useState(4);

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
        const stories = await fetchCategoryStories(props.category);
        setCategoryStories(stories);
      } catch (error) {
        console.error("Error fetching category stories:", error);
      }
    };

    fetchData();
  }, [props.category, props.selectedFilters]);

  return (
    <div className={styles.category__container}>
      <div className={styles.category__header}>
        Top stories about {props.category}
      </div>

      {categoryStories.length === 0 && (
        <div className={styles.no__stories}>No stories Available</div>
      )}

      <div className={styles.category__stories}>
        {categoryStories.slice(0, maxStoriesInRow).map((story, index) => (
          <StoryFeed
            key={index}
            story={story}
            authValidated={props.authValidated}
            handleStoryViewer={props.handleStoryViewer}
          />
        ))}
      </div>
      {!isMobile && maxStoriesInRow < categoryStories.length && (
        <button
          onClick={() =>
            setMaxStoriesInRow(
              maxStoriesInRow + 4 > categoryStories.length
                ? categoryStories.length
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

export default Categories;
