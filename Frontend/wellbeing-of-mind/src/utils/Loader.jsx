import React from "react";
import "./Loader.css";

const Loader = ({ loading }) => (
  <div className="loader" style={{ opacity: loading ? 1 : 0, transition: "opacity 0.5s" }}></div>
);

export default Loader;