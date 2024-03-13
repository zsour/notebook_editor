import "./components/style/categories.css";

import { useState } from "react";

import {
  EditorMediatorProvider,
  useEditorMediator,
} from "./components/EditorMediator";

function Home() {
  let [data, setData] = useState({
    Math: {
      extended: false,
      posts: [
        { label: "Dijkstras", codeblocks: [{ description: "", code: "" }] },
      ],
    },
    Graph: {
      extended: false,
      posts: [{ label: "Test", codeblocks: [{ description: "", code: "" }] }],
    },
  });

  function toggleExtend(label) {
    let tmp = { ...data };
    tmp[label].extended = !tmp[label].extended;
    setData({ ...tmp });
  }

  function generateCategory(label, posts) {
    let jsx = [];

    for (let i = 0; i < posts.length; i++) {
      let tmpPost = (
        <div key={`${label}:{i}`} className="categoryPost">
          <p className="categoryPostLabel">{posts[i].label}</p>
          <div className="categoryPostButtons">
            <span className="categoryPostPreviewButton"></span>
            <span className="categoryPostEditButton"></span>
            <span className="categoryPostRemoveButton"></span>
          </div>
        </div>
      );

      jsx.push(tmpPost);
    }

    return (
      <div
        key={label}
        className="category"
        style={{
          height: data[label].extended ? `${34 * posts.length + 40}px` : "40px",
        }}
      >
        <div
          className="categoryHeader"
          onClick={() => {
            toggleExtend(label);
          }}
        >
          <p className="categoryTitle">{label}</p>
        </div>
        <div className="categoryPostsWrapper">{jsx}</div>
      </div>
    );
  }

  function renderCategories() {
    let jsx = [];
    for (let key in data) {
      jsx.push(generateCategory(key, data[key].posts));
    }

    return jsx;
  }

  return <div className="categoryContainer">{renderCategories()}</div>;
}

export default Home;
