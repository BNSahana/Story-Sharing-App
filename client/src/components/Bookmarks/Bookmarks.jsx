import React, { useEffect, useState } from "react";
import styles from "./Bookmarks.module.css";
import StoryFeed from "../StoryFeed/StoryFeed";
import { fetchBookmarks } from "../../api/story";

const Bookmarks = (props) => {
  const [bookmarks, setBookmarks] = useState([]);
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
    const fetchBookmarksData = async () => {
      try {
        const bookmarksData = await fetchBookmarks();
        setBookmarks(bookmarksData);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarksData();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className={styles.category__container}>
          <div
            style={{
              textAlign: "center",
            }}
            className={styles.category__header}
          >
            Loading...
          </div>
        </div>
      </>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <>
        <div className={styles.category__container}>
          <div
            style={{
              textAlign: "center",
            }}
            className={styles.category__header}
          >
            You have no bookmarks.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.category__container}>
        {<div className={styles.category__header}>Your Bookmarks</div>}
        <div className={styles.category__stories}>
          {bookmarks.slice(0, maxStoriesInRow).map((story, index) => (
            <StoryFeed
              key={index}
              story={story}
              authValidated={props.authValidated}
              handleStoryViewer={props.handleStoryViewer}
            />
          ))}
        </div>
        {!isMobile && maxStoriesInRow < bookmarks.length && (
          <button
            onClick={() =>
              setMaxStoriesInRow(
                maxStoriesInRow + 4 > bookmarks.length
                  ? bookmarks.length
                  : maxStoriesInRow + 4
              )
            }
            className={styles.seemore__btn}
          >
            See more
          </button>
        )}
      </div>
    </>
  );
};

export default Bookmarks;
