import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import DesktopAddStory from "../components/AddStory/DesktopAddStory/DesktopAddStory";
import MobileAddStory from "../components/AddStory/MobileAddStory/MobileAddStory";
import StoryView from "../components/StoryView/StoryView";
import YourStories from "../components/YourStories/YourStories";
import Slide from "../components/Slide/Slide";
import Filter from "../components/Filter/Filter";
import Categories from "../components/Categories/Categories";
import Bookmarks from "../components/Bookmarks/Bookmarks";
import filters from "../constants/data";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const displayParamMappings = {
    register: queryParams.get("register"),
    signin: queryParams.get("signin"),
    addstory: queryParams.get("addstory"),
    editstory: queryParams.get("editstory"),
    viewstory: queryParams.get("viewstory"),
    viewbookmarks: queryParams.get("viewbookmarks"),
    yourstories: queryParams.get("yourstories"),
    slide: queryParams.get("slide"),
  };

  const [authValidated, setAuthValidated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(["All"]);
  const [story, setStory] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const validateToken = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/validate`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          setAuthValidated(true);
        } else {
          setAuthValidated(false);
        }
      } catch (error) {
        console.error("Token validation error:", error);
      }
    };

    validateToken();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [displayParamMappings.signin]);

  const handleSelectFilters = (filter) => {
    if (filter === "All") {
      setSelectedFilters(["All"]);
    } else {
      const updatedFilters = selectedFilters.includes("All")
        ? [filter]
        : selectedFilters.includes(filter)
        ? selectedFilters.filter((f) => f !== filter)
        : [...selectedFilters, filter];
      if (updatedFilters.length === 0) updatedFilters.push("All");
      setSelectedFilters(updatedFilters);
    }
  };

  const handleStoryViewer = (story) => {
    setStory(story);
    navigate("/?viewstory=true");
  };

  const renderCategorySections = () => {
    if (displayParamMappings.viewbookmarks) {
      return <Bookmarks handleStoryViewer={handleStoryViewer} />;
    } else if (displayParamMappings.yourstories) {
      return (
        <YourStories
          selectedFilters={selectedFilters}
          handleStoryViewer={handleStoryViewer}
        />
      );
    } else {
      return (
        <>
          <Filter
            selectedFilters={selectedFilters}
            handleSelectFilters={handleSelectFilters}
          />
          {!isMobile && (
            <YourStories
              selectedFilters={selectedFilters}
              handleStoryViewer={handleStoryViewer}
            />
          )}

          {selectedFilters.includes("All")
            ? filters
                .filter((filter) => filter.name !== "All")
                .map((filter) => (
                  <Categories
                    key={filter.name}
                    category={filter.name}
                    handleStoryViewer={handleStoryViewer}
                  />
                ))
            : selectedFilters.map((filter) => (
                <Categories
                  key={filter}
                  category={filter}
                  authValidated={authValidated}
                  handleStoryViewer={handleStoryViewer}
                />
              ))}
        </>
      );
    }
  };

  return (
    <>
      <Navbar authValidated={authValidated} />

      {renderCategorySections()}

      {displayParamMappings.register && <Register />}
      {displayParamMappings.signin && <Login />}

      {displayParamMappings.addstory &&
        (isMobile ? <MobileAddStory /> : <DesktopAddStory />)}

      {displayParamMappings.editstory &&
        (isMobile ? <MobileAddStory /> : <DesktopAddStory />)}

      {displayParamMappings.viewstory && (
        <StoryView slides={story} isMobile={isMobile} />
      )}

      {displayParamMappings.slide && <Slide />}
    </>
  );
};

export default HomePage;
