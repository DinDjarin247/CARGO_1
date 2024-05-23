import { useParams } from "react-router";
import NewsList from "./NewsList";
import { useEffect, useState } from "react";
const VITE_NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("");
  console.log(useParams());
  const param = useParams();
  const path = param["*"] || "all";
  if (path != category) {
    setCategory(path);
  }

  useEffect(() => {
    const fetchData = async () => {
      const query = path == "all" ? "" : `&category=${path}`;
      const data = await fetch(
        `/api/v2/top-headlines?country=kr&apiKey=${VITE_NEWS_API_KEY}${query}`
      );
      const response = await data.json();
      setArticles(response.articles);
    };

    fetchData();
  }, [category]);

  return (
    <>
      <NewsList articles={articles} />
    </>
  );
};

export default NewsPage;
