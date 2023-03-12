import React, { useState, useEffect, useCallback } from "react";
import "../styles/LatestNewsWidget.scss";
import Icon from "./assets/Latest.png";
import WidgetArticle from "./WidgetArticle";
import Arrow from "./assets/Arrow.svg";
import axios from "axios";
import { Link } from "react-router-dom";

const LatestNewsWidget = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Define a function to fetch articles from the NYT API and update the state with new articles
  const fetchArticles = useCallback(async () => {
    // API INFO
    const nyt_apikey = "lvrpuZTUjxlXeE6niVwjBU5rDypD9z7A";
    const nyt_url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=technology&page=${currentPage}&sort=newest&api-key=${nyt_apikey}`;

    // Fetch data from API endpoint
    const response = await axios.get(nyt_url);
    // Extract new articles from the response
    const newArticles = response.data.response.docs.map((doc) => doc);

    // If no new articles, set hasMore to false and return
    if (newArticles.length === 0) {
      setHasMore(false);
      return;
    }

    // Add new articles to the state variable
    setArticles((prevArticles) => [...prevArticles, ...newArticles]);
  }, [currentPage]);

  // Use fetchArticles to fetch new articles when the component mounts or when currentPage changes
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Define a function to handle loading more articles
  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container">
      {/* HEADER */}
      <div className="header">
        {/* HEADER TITLE */}
        <img src={Icon} alt="Latest News" className="latest-news-img" />
        <h3 className="latest-news-text">Latest news</h3>
      </div>

      <div className="content scrollbar">
        {/* WIDGET ARTICLE COMPONENT */}
        {articles.map((article) => (
          <WidgetArticle key={article._id} article={article} />
        ))}
        {/* Render "hasMore" to indicate if there are more articles to load */}
        {hasMore}
      </div>

      {/* FOOTER */}
      <div className="footer">
        <div className="line"> </div>

        {/* SEE MORE NEWS , LOAD MORE ARTICLES */}
        <Link to="/" onClick={handleLoadMore} className="textAndArrow">
          <h4 className="seemore">See more news</h4>
          <img src={Arrow} alt="Arrow" className="arrow" />
        </Link>
      </div>
    </div>
  );
};

export default LatestNewsWidget;
