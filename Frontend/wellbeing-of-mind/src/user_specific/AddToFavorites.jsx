import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const AddToFavoritesButton = ({ userId, articleId, articleTitle }) => {
  const token = localStorage.getItem("token");
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    const checkFavorites = async () => {
      try {
        const response = await fetch(
          `https://localhost:5226/api/${userId}/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch favorite articles");
        }
        const favoriteArticles = await response.json();
        const found = favoriteArticles.some(
          (article) => article.articleId === articleId
        );
        setIsInFavorites(found);
      } catch (error) {
        console.error("Error fetching favorite articles:", error);
      }
    };

    if (userId) {
      checkFavorites();
    }
  }, [userId, articleId, token]);

  const handleAddToFavorites = async () => {
    try {
      const payload = {
        userId: userId,
        articleId: articleId,
        title: articleTitle,
      };

      const response = await fetch(
        `https://localhost:5226/api/addtofavorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add article to favorites");
      }

      setIsInFavorites(!isInFavorites);
    } catch (error) {
      console.error("Error adding article to favorites:", error);
      alert("Error adding article to favorites. Please try again.");
    }
  };

  return (
    <button
      className="btn btn-dark btn-lg"
      style={{ width: "15vw", height: "6vh" }}
      onClick={handleAddToFavorites}
    >
      <FontAwesomeIcon
        icon={faStar}
        style={{ color: isInFavorites ? "gold" : "inherit" }}
      />
    </button>
  );
};

export default AddToFavoritesButton;
