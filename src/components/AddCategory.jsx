import React, { useEffect, useState } from "react";
import "./style/addCategory.css";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("-1");

  return (
    <div className="addCategoryContainer">
      <form
        className="addCategoryForm"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(categoryName, parentCategory);
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
          <option value="0">Math</option>
          <option value="1">Graph</option>
        </select>

        <div className="buttonContainer">
          <button className="submitButton">
            <p>Add category</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
