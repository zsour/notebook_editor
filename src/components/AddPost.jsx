import React, { useEffect, useState } from "react";
import "./style/addPost.css";

function AddPost() {
  const [codeblocks, setCodeblocks] = useState([]);

  function addCodeBlock() {
    console.log();
    setCodeblocks((prev) => {
      return [...prev, { desc: "" }];
    });
  }

  function editDesc(codeblockIndex, currentValue) {
    setCodeblocks((prev) => {
      prev[codeblockIndex].desc = currentValue;
      return [...prev];
    });
  }

  function editCode(codeblockIndex, currentValue) {
    setCodeblocks((prev) => {
      prev[codeblockIndex].code = currentValue;
      return [...prev];
    });
  }

  function removeCodeblock(codeblockIndex) {
    setCodeblocks((prev) => {
      let tmp = [...prev];
      tmp.splice(codeblockIndex, 1);
      return [...tmp];
    });
  }

  useEffect(() => {
    console.log(codeblocks);
  }, [codeblocks]);

  function renderCodeblocks() {
    let jsx = [];
    for (let i = 0; i < codeblocks.length; i++) {
      jsx.push(
        <div className="codeblock" key={i}>
          <div className="codeblockHeader">
            <p className="codeblockHeaderText">Codeblock {i + 1}</p>
            <span
              className="codeblockRemoveButton"
              onClick={() => {
                removeCodeblock(i);
              }}
            ></span>
          </div>

          <textarea
            className="codeblockDesc"
            value={codeblocks[i].desc}
            onChange={(e) => {
              editDesc(i, e.target.value);
            }}
          ></textarea>

          <textarea
            className="codeblockCode"
            value={codeblocks[i].code}
            onChange={(e) => {
              editCode(i, e.target.value);
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
            addCodeBlock();
          }}
        >
          <p>Add code block</p>
        </button>
      </div>

      <div className="codeblockContainer">{renderCodeblocks()}</div>
    </div>
  );
}

export default AddPost;
