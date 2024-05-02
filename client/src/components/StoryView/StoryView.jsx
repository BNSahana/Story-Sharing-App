import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StoryView.module.css";
import crossIcon from "../../assets/crossIcon.png";
import shareIcon from "../../assets/shareIcon.png";
import bookmarkIcon from "../../assets/bookmarkIcon.png";
import blueBookmarkIcon from "../../assets/bookmarkedIcon.png";
import likeIcon from "../../assets/likeIcon.png";
import redLikeIcon from "../../assets/likedIcon.png";
import leftArrow from "../../assets/leftArrow.png";
import rightArrow from "../../assets/rightArrow.png";
import axios from 'axios';
import { addBookmark, removeBookmark } from "../../api/story";

const StoryView = (props) => {
  const navigate = useNavigate();
  const slideDuration = 4000;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slides = props.slides;

  const [bookmarkStatus, setBookmarkStatus] = useState(
    slides.map(() => {
      return false;
    })
  );

  const [linkCopiedStatus, setLinkCopiedStatus] = useState(
    slides.map(() => {
      return false;
    })
  );

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const response = await fetchBookmarkStatus(
          slides[currentSlideIndex]._id
        );
        const newBookmarkStatus = [...bookmarkStatus];

        newBookmarkStatus[currentSlideIndex] = response.isBookmarked;
        setBookmarkStatus(newBookmarkStatus);
      } catch (error) {
        console.error("Error while fetching bookmark status:", error);
      }
    };

    fetchBookmarkStatus();
  }, [currentSlideIndex, bookmarkStatus, slides]);

  const [likeCount, setLikeCount] = useState(
    slides.map((slide) => slide.likes.length)
  );
  const [likeStatus, setLikeStatus] = useState(
    slides.map((slide) => slide.likes.includes(localStorage.getItem("userId")))
  );

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, slideDuration);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlideIndex]);

  const handlePreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleBookmark = async (slideIndex) => {
    try {
      const slideId = slides[slideIndex]._id;
      const endpoint = bookmarkStatus[slideIndex]
        ? removeBookmark
        : addBookmark;
      const response = await endpoint(slideId);

      if (response) {
        const newBookmarkStatus = [...bookmarkStatus];
        newBookmarkStatus[slideIndex] = !bookmarkStatus[slideIndex];
        setBookmarkStatus(newBookmarkStatus);
      } else {
        navigate("/?signin=true");
        console.error("Bookmark action failed");
      }
    } catch (error) {
      console.error("Error while performing bookmark action:", error);
    }
  };

  

const handleLike = async (slideIndex) => {
  try {
    const slideId = slides[slideIndex]._id;
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/user/like`,
      { slideId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      }
    );

    if (response.status === 200) {
      const data = response.data;
      const updatedCount = data.likeCount;
      const newLikeCount = [...likeCount];
      newLikeCount[slideIndex] = updatedCount;
      setLikeCount(newLikeCount);

      const updatedStatus = data.likeStatus;
      const newLikeStatus = [...likeStatus];
      newLikeStatus[slideIndex] = updatedStatus;
      setLikeStatus(newLikeStatus);
    } else {
      navigate('/?signin=true');
      console.error('Like action failed');
    }
  } catch (error) {
    console.error('Error while performing like action:', error);
  }
};

  

  const handleShare = (slideIndex) => {
    const link = `${process.env.REACT_APP_FRONTEND_URL}/?slide=true&id=${slides[slideIndex]._id}`;
    navigator.clipboard.writeText(link);
    const newLinkCopiedStatus = [...linkCopiedStatus];
    newLinkCopiedStatus[slideIndex] = true;
    setLinkCopiedStatus(newLinkCopiedStatus);

    setTimeout(() => {
      const newLinkCopiedStatus = [...linkCopiedStatus];
      newLinkCopiedStatus[slideIndex] = false;
      setLinkCopiedStatus(newLinkCopiedStatus);
    }, 1000);
  };

  const handleContainerClick = (event) => {
    const containerWidth = event.currentTarget.offsetWidth;
    const clickX = event.nativeEvent.offsetX;
    const clickY = event.nativeEvent.offsetY;
    const clickPercentage = (clickX / containerWidth) * 100;

    if (clickY >= 75 && clickY <= 550) {
      if (clickPercentage <= 50) {
        handlePreviousSlide();
      } else {
        handleNextSlide();
      }
    }
  };

  return (
    <div className={styles.coverage}>
      <div className={styles.storyViewer__container}>
        {!props.isMobile && (
          <img
            onClick={handlePreviousSlide}
            src={leftArrow}
            alt="left arrow"
            className={styles.left__arrow}
          />
        )}
        <div className={styles.story__view}>
          <div className={styles.story__running__container}>
            {slides.map((slide, index) => {
              const isCompleted = index <= currentSlideIndex;
              const isActive = index === currentSlideIndex;
              return (
                <div
                  key={index}
                  className={`${styles.running__container} ${
                    isCompleted ? styles.running__container__active : ""
                  } ${isActive ? styles.running__container__active : ""}`}
                ></div>
              );
            })}
          </div>
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0 ), rgba(0, 0, 0,  0.8)), linear-gradient(rgba(0, 0, 0, 0.2 ), rgba(0, 0, 0,   0)) , url(${slides[currentSlideIndex].imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={(event) => handleContainerClick(event)}
            className={styles.category__story}
          >
            {linkCopiedStatus[currentSlideIndex] && (
              <div className={styles.link__copied__msg}>
                Link copied to clipboard
              </div>
            )}

            <div className={styles.category__story__header}>
              {slides[currentSlideIndex].header}
            </div>
            <div className={styles.category__story__description}>
              {slides[currentSlideIndex].description}
            </div>
          </div>

          <img
            onClick={() => {
              navigate(`/`);
            }}
            src={crossIcon}
            alt="cross icon"
            className={styles.cross__icon}
          />
          <img
            onClick={() => {
              handleShare(currentSlideIndex);
            }}
            src={shareIcon}
            alt="share icon"
            className={styles.share__icon}
          />
          <img
            onClick={() => handleBookmark(currentSlideIndex)}
            src={
              bookmarkStatus[currentSlideIndex]
                ? blueBookmarkIcon
                : bookmarkIcon
            }
            alt="bookmark icon"
            className={styles.bookmark__icon}
          />
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
            }}
            className={styles.like__icon}
          >
            <img
              onClick={() => {
                handleLike(currentSlideIndex);
              }}
              src={likeStatus[currentSlideIndex] ? redLikeIcon : likeIcon}
              alt="like icon"
            />
            <p
              style={{
                color: "white",
                fontSize: "15px",
              }}
            >
              {likeCount[currentSlideIndex]}
            </p>
          </div>
        </div>
        {!props.isMobile && (
          <img
            onClick={handleNextSlide}
            src={rightArrow}
            alt="right arrow"
            className={styles.right__arrow}
          />
        )}
      </div>
    </div>
  );
};

export default StoryView;
