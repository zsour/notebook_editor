import React, { useState, useReducer } from "react";
import "./style/addPost.css";

function AddPost() {
  const [postTitle, setPostTitle] = useState("");

  const initialState = { desc: "", code: "", extended: true };

  const [codeblocks, dispatch] = useReducer(reducer, []);

  function reducer(current, action) {
    switch (action.type) {
      case "CREATE_CODEBLOCK":
        return [...current, initialState];

      case "REMOVE_CODEBLOCK": {
        let tmp = [...current];
        console.log("removing", action.codeblockIndex);
        tmp.splice(action.codeblockIndex, 1);
        return [...tmp];
      }

      case "UPDATE_DESC": {
        let tmp = [...current];
        tmp[action.codeblockIndex].desc = action.value;
        return [...tmp];
      }

      case "UPDATE_CODE": {
        let tmp = [...current];
        tmp[action.codeblockIndex].code = action.value;
        return [...tmp];
      }

      case "TOGGLE_EXTEND": {
        let tmp = [...current];
        tmp[action.codeblockIndex].extended = action.value;
        return [...tmp];
      }

      default:
        return current;
    }
  }

  function renderCodeblocks() {
    let jsx = [];
    for (let i = 0; i < codeblocks.length; i++) {
      jsx.push(
        <div
          className="codeblock"
          key={i}
          style={{
            height: codeblocks[i].extended ? "auto" : "30px",
          }}
        >
          <div className="codeblockHeader">
            <p className="codeblockHeaderText">Codeblock {i + 1}</p>
            <span
              className="codeblockExtendButton"
              onClick={() => {
                dispatch({
                  type: "TOGGLE_EXTEND",
                  codeblockIndex: i,
                  value: !codeblocks[i].extended,
                });
              }}
              style={{
                transform: codeblocks[i].extended
                  ? "translateY(-50%) rotate(90deg)"
                  : "translateY(-50%)",
              }}
            ></span>
            <span
              className="codeblockRemoveButton"
              onClick={() => {
                dispatch({ type: "REMOVE_CODEBLOCK", codeblockIndex: i });
              }}
            ></span>
          </div>

          <textarea
            className="codeblockDesc"
            value={codeblocks[i].desc}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_DESC",
                codeblockIndex: i,
                value: e.target.value,
              });
            }}
          ></textarea>

          <textarea
            className="codeblockCode"
            value={codeblocks[i].code}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_CODE",
                codeblockIndex: i,
                value: e.target.value,
              });
            }}
          ></textarea>
        </div>,
      );
    }

    return jsx;
  }

  return (
    <div className="addPostContainer">
      <div className="addPostButtonContainer">
        <button
          className="addPostButtonContainerButton"
          onClick={() => {
            dispatch({ type: "CREATE_CODEBLOCK" });
          }}
        >
          <p>Add code block</p>
        </button>
      </div>

      <form
        className="postForm"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="postFormLabel">
          <p>Post title</p>
        </div>
        <input
          type="text"
          value={postTitle}
          className="postTitleInput"
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
          placeholder="Title..."
        />

        <div className="postFormLabel">
          <p>Post category</p>
        </div>

        <select className="postCategorySelect">
          <option value="0">Math</option>
          <option value="1">Graph</option>
        </select>
        <div className="codeblockContainer">{renderCodeblocks()}</div>

        <div className="addPostFormButtonContainer">
          <button className="addPostFormSubmitButton">
            <p>Add post</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
