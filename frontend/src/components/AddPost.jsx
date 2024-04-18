import React, { useState, useReducer, useEffect } from "react";
import "./style/addPost.css";
import { Editor, useMonaco } from "@monaco-editor/react";
import { useEditorMediator } from "./EditorMediator";

function AddPost() {
  const [loading, setLoading] = useState(true);

  const [postTitle, setPostTitle] = useState("");

  const [parent, setParent] = useState("0");

  const initialState = { desc: "", code: "", extended: true };

  const [categories, setCategories] = useState([]);

  const monaco = useMonaco();
  const [codeblocks, dispatch] = useReducer(reducer, []);

  const em = useEditorMediator();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("arta", {
        base: "vs-dark",
        inherit: "true",
        rules: [
          { token: "identifier", foreground: "#aaaaaa" },
          { token: "keyword", foreground: "#6644aa" },
          { token: "string", foreground: "#ffcc33" },
          { token: "comment", foreground: "#444444" },
          { token: "type", foreground: "#bb1166" },
        ],
        colors: {
          "editor.background": "#1e2129",
        },
      });
      monaco.editor.setTheme("arta");
    }
  }, [monaco]);

  useEffect(() => {
    setLoading(true);
    if (em) {
      em.getCategories()
        .then((data) => {
          data.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            } else {
              return -1;
            }
          });

          setCategories([...data]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [em]);

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

      case "RESET": {
        return [];
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

          <Editor
            className="codeblockCode"
            defaultLanguage="javascript"
            height="500px"
            theme="arta"
            options={{
              minimap: {
                enabled: false,
              },
              padding: {
                top: 10,
              },

              lineNumbersMinChars: 2,

              bracketPairColorization: {
                enabled: true,
              },
            }}
            value={codeblocks[i].code}
            onChange={(val) => {
              dispatch({
                type: "UPDATE_CODE",
                codeblockIndex: i,
                value: val,
              });
            }}
          />
        </div>,
      );
    }

    return jsx;
  }

  function renderParentOptions() {
    let jsx = [];

    for (let i = 0; i < categories.length; i++) {
      jsx.push(
        <option key={`parent_option_${i}`} value={categories[i].ID}>
          {categories[i].name}
        </option>,
      );
    }

    return jsx;
  }

  function renderPage() {
    if (loading) {
      return (
        <div className="addPostContainer">
          <div className="loading">
            <p>Loading...</p>
          </div>
        </div>
      );
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
            setLoading(true);
            em.addPost(postTitle, parent, codeblocks)
              .then((message) => {
                console.log(message);
                setPostTitle("");
                setParent("0");
                dispatch({ type: "RESET" });
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
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

          <select
            className="postCategorySelect"
            value={parent}
            onChange={(e) => {
              setParent(e.target.value);
            }}
          >
            <option value="0">None</option>
            {renderParentOptions()}
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

  return renderPage();
}

export default AddPost;
