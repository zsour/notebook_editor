import React, { useState } from "react";
import "./style/addCategory.css";
import { useEditorMediator } from "./EditorMediator";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("-1");

  const em = useEditorMediator();

  return (
    <div className="addCategoryContainer">
      <form
        className="addCategoryForm"
        onSubmit={(e) => {
          e.preventDefault();
          em.addCategory(categoryName, parentCategory)
            .then(() => {
              console.log("Category created.");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        <div className="labelContainer">
          <p>Category name</p>
        </div>
        <input
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
          className="addCategoryInput"
          type="text"
          placeholder="Name..."
          value={categoryName}
        />

        <div className="labelContainer">
          <p>Parent category</p>
        </div>

        <select
          onChange={(e) => {
            setParentCategory(e.target.value);
          }}
          name="parentCategory"
          defaultValue={parentCategory}
          id="addCategorySelect"
        >
          <option value="-1">None</option>
          <option value="Math">Math</option>
          <option value="Graph">Graph</option>
        </select>

        <div className="submitButtonContainer">
          <button className="submitButton">
            <p>Add category</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
