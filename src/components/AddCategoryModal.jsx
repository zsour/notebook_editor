import React, { useState } from "react";
import "./style/AddCategoryModal.css";
import { useEditorMediator } from "./EditorMediator";
export default function AddCategoryModal() {
  const em = useEditorMediator();

  const [label, setLabel] = useState("");

  return (
    <div
      className="addCategoryModalContainer"
      style={{
        display: em.addCategoryModalOpen ? "block" : "none",
      }}
    >
      <div
        className="addCategoryModalHiddenCloser"
        onClick={() => {
          em.toggleCategoryModal();
        }}
      ></div>

      <div className="addCategoryFormContainer">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="addCategoryFormHeaderContainer">
            <b className="addCategoryFormHeader">Add new category</b>
          </div>

          <div className="addCategoryFormHeaderContainer">
            <p className="addCategoryFormHeader">Category label:</p>
          </div>
          <input
            type="text"
            value={label}
            className="addCategoryFormInput"
            onChange={(e) => {
              setLabel(e.target.value);
            }}
          />
          <div className="addCategoryFormButtonContainer">
            <button
              className="addCategoryFormButton"
              onClick={() => {
                //Add new category.
                setLabel("");
                em.toggleCategoryModal();
              }}
            >
              <p>Save</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
