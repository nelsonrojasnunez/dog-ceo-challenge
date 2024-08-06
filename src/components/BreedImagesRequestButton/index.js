import React, { useContext } from "react";

import { ImageListContext } from "../App/context";
import { fetchImageListBySelectedFilter } from "../../services/FetchData";

export default function BreedImagesRequestButton({ selectedFilter }) {
  const imageListContext = useContext(ImageListContext);

  function handleImageListUpdate(selectedFilter) {
    selectedFilter = selectedFilter.endsWith('/') ? selectedFilter.slice(0, -1) : selectedFilter;
    imageListContext.updateImageListContext({ imageList: [], isLoading: false });
    if (selectedFilter.length > 0) {
      imageListContext.updateImageListContext({ imageList: [], isLoading: true });      
      getImageListByFilter(selectedFilter);
    }
  }

  async function getImageListByFilter(selectedFilter) {
    const arrayResult = await fetchImageListBySelectedFilter(selectedFilter);
    imageListContext.updateImageListContext({
      imageList: arrayResult,
      isLoading: false,
    });
  }

  return (
    <button
      className="btn btn-primary w-100"
      onClick={(event) => handleImageListUpdate(selectedFilter)}
    >
      <i className="fa-solid fa-image"></i> Apply filters
    </button>
  );
}
