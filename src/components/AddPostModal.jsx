import React from "react";
import { useEditorMediator } from "./EditorMediator";
import "./style/AddPostModal.css";
function AddPostModal() {
  const em = useEditorMediator();
  return (
    <div
      className="postModalContainer"
      style={{
        display: em.addPostModalOpen ? "block" : "none",
      }}
    >
      <div className="postModalHiddenCloser" onClick={em.togglePostModal}></div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="postModalFormContainer"
      >
        <div className="postModalFormContainerLeft">
          <div className="formContainerLabelHeader">
            <p className="formContainerLabel">Post title:</p>
          </div>

          <input type="text" className="postTitle" />

          <div className="formContainerLabelHeader">
            <p className="formContainerLabel">Parent category:</p>
          </div>
          <select name="" id="" className="postCategorySelect">
            <option value="">test</option>
          </select>
        </div>
        <div className="postModalFormContainerRight">
          <textarea
            name=""
            id=""
            className="postModalTextArea"
            placeholder="Insert your code here..."
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default AddPostModal;
