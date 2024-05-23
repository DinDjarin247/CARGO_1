import { useParams } from "react-router";
import NewsList from "./NewsList";
import { useEffect, useState } from "react";

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("");

  const param = useParams();
  console.log(useParams());
  const path = param["*"] || "all";
  if (path != category) {
    setCategory(path);
  }

  useEffect(() => {
    const fetchData = async () => {
      const query = path == "all" ? "" : `&category=${path}`;
      const data = await fetch(
        `https://newsapi.org/v2/top-headlines?country=kr&apiKey=9d804ec30d46479e895b78a799c40a4c${query}`
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