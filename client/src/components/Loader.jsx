import React from "react";
import loading from "../assest/img/loading.gif";

export default function Loader() {
  return (
    <>
      <div className="loading">
        <img src={loading} alt="loading" />
      </div>
    </>
  );
}
