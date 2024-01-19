import React from "react";
import "./style/AddCategoryModal.css";
import { useEditorMediator } from "./EditorMediator";
export default function AddCategoryModal() {
  const em = useEditorMediator();

  

  return (
    <div
      class="addCategoryModalContainer"
      style={{
        display: em.addCategoryModalOpen ? "block" : "none",
      }}
    ></div>
  );
}
