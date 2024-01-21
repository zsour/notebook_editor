import React from "react";
import "./style/AddCategoryModal.css";
import { useEditorMediator } from "./EditorMediator";
export default function AddCategoryModal() {
  const em = useEditorMediator();

  

  return (
    <div
      className="addCategoryModalContainer"
      style={{
        display: em.addCategoryModalOpen ? "block" : "none",
      }}
    >
      <div className="addCategoryModalHiddenCloser" onClick={() => {
        em.toggleCategoryModal();
      }}></div>

      <div className="addCategoryFormContainer"></div>
    </div>
  );
}
