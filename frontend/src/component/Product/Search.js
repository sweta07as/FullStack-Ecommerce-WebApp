import React, { useState, Fragment } from "react";
import MetaData from "../layout/Metadata";
import "./Search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  return (
    <Fragment>
      <MetaData title="SEARCH FABTOKRI" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search products here"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="SEARCH" />
      </form>
    </Fragment>
  );
};

export default Search;
