import React from 'react'
import "./Page.css";
const Page = ({ postperpeg, totalPosts, setpage, pagactive }) => {
  let page = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postperpeg); i++) {
    page.push(i);
  }

  return (
    <div className="page">
      {page.map((post, index) => {
        return (
          <button key={index} onClick={() => setpage(post)}>
            {/* {post === pagactive  ? "active " : ""} */}
            {post}
          </button>
        );
      })}
    </div>
  );
};
export default  Page;