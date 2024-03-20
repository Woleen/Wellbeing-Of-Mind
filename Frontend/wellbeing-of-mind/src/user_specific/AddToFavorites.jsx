import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const AddToFavoritesButton = ({ userId, articleId }) => {
  const handleAddToFavorites = async () => {
    try {
      const response = await fetch(`https://localhost:5226/api/user/addtofavorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, articleId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add article to favorites");
      }

      alert("Article added to favorites successfully!");
    } catch (error) {
      console.error("Error adding article to favorites:", error);
      alert("Error adding article to favorites. Please try again.");
    }
  };

  return (
    <button className='btn btn-dark btn-lg' style={{ width: '15vw', height: '6vh' }} onClick={handleAddToFavorites}><FontAwesomeIcon icon={faStar} /></button>
  );
};

export default AddToFavoritesButton;