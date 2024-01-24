import "./style.css";
import { useState } from "react";
import AddCategoryModal from "./components/AddCategoryModal";
import {
  EditorMediatorProvider,
  useEditorMediator,
} from "./components/EditorMediator";
import ActionButton from "./components/ActionButton";
import AddPostModal from "./components/AddPostModal";
function App() {
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

  return (
    <EditorMediatorProvider>
      <div className="content">
        <div className="mainContainer">
          <div className="buttonContainer">
            <ActionButton label="New Category" action="NEW_CATEGORY" />
            <ActionButton label="New Post" action="NEW_POST" />
          </div>

          <div className="categoryContainer">{renderCategories()}</div>
        </div>

        <AddCategoryModal />
        <AddPostModal />
      </div>
    </EditorMediatorProvider>
  );
}

export default App;
