import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const fetchYourStories = async (selectedFilters) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/user/posts`,
      { filters: selectedFilters },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data.posts;
    } else {
      throw new Error("Failed to fetch your stories");
    }
  } catch (error) {
    throw new Error("Error fetching your stories:", error);
  }
};

export const addBookmark = async (slideId) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/user/addBookmark`,
      { slideId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      return true;
    } else {
      throw new Error("Failed to add bookmark");
    }
  } catch (error) {
    throw new Error("Error adding bookmark:", error);
  }
};

export const fetchBookmarks = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/user/bookmarks`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      return response.data.bookmarks;
    } else {
      throw new Error("Failed to fetch bookmarks");
    }
  } catch (error) {
    throw new Error("Error fetching bookmarks:", error);
  }
};

export const removeBookmark = async (slideId) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/user/removeBookmark`,
      { slideId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      return true;
    } else {
      throw new Error("Failed to remove bookmark");
    }
  } catch (error) {
    throw new Error("Error removing bookmark:", error);
  }
};

export const likeSlide = async (slideId) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/user/like`,
      { slideId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      return true;
    } else {
      throw new Error("Failed to like slide");
    }
  } catch (error) {
    throw new Error("Error liking slide:", error);
  }
};

export const fetchSlide = async (slideId) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/slide/slideDetails/${slideId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data.slide;
    } else {
      throw new Error("Failed to fetch slide details");
    }
  } catch (error) {
    throw new Error("Error fetching slide details:", error);
  }
};

export const fetchCategoryStories = async (category) => {
  try {
    const response = await axios.get(`${backendUrl}/api/story/${category}`);
    if (response.status === 200) {
      return response.data.posts;
    } else {
      throw new Error("Failed to fetch category stories");
    }
  } catch (error) {
    throw new Error("Error fetching category stories:", error);
  }
};
