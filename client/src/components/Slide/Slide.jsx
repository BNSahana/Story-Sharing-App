import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import StoryView from "../StoryView/StoryView";
import { fetchSlide } from "../../api/story";

const Slide = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [slideData, setSlideData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const data = await fetchSlide(id);
          setSlideData([data]);
        }
      } catch (error) {
        console.error("Error fetching slide:", error);
      }
    };

    fetchData();
  }, [id]);

  return <>{slideData && <StoryView slides={slideData} />}</>;
};

export default Slide;
