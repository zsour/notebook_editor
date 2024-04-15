import { useState } from "react";
import "./components/style/home.css";

import {
  EditorMediatorProvider,
  useEditorMediator,
} from "./components/EditorMediator";

function Home() {
  let [categories, setCategories] = useState([
    { title: "Linear Algebra", posts: [], extended: false },
    { title: "Graph", posts: [], extended: false },
  ]);

  function setExtended(index, value) {
    let tmp = [...categories];
    tmp[index].extended = value;
    setCategories([...tmp]);
  }

  function renderCategories() {
    let jsx = [];
    for (let i = 0; i < categories.length; i++) {
      jsx.push(
        <div
          className="category"
          style={{
            height: categories[i].extended ? "400px" : "30px",
          }}
        >
          <div className="categoryHeader">
            <p className="categoryTitle">{categories[i].title}</p>
            <span
              className="categoryExtendButton"
              onClick={() => {
                setExtended(i, !categories[i].extended);
              }}
              style={{
                transform: categories[i].extended
                  ? "translateY(-50%) rotate(90deg)"
                  : "translateY(-50%)",
              }}
            ></span>

            <span className="categoryRemoveButton"></span>
          </div>

          <div className="categoryPostContainer">
            <div className="categoryPost">
              <p className="categoryPostTitle">Depth first search</p>
              <span className="categoryPostRemoveButton"></span>
              <span className="categoryPostEditButton"></span>
            </div>
          </div>
        </div>,
      );
    }

    return jsx;
  }

  return <div className="categoryContainer">{renderCategories()}</div>;
}

export default Home;
