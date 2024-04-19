import React, { useState, useEffect } from "react";
import "./style/addCategory.css";

import { useEditorMediator } from "./EditorMediator";
import { useParams } from "react-router-dom";

export default function EditCategory() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("0");

  const [categories, setCategories] = useState([]);

  const [categoriesFetched, setCategoriesFetched] = useState(false);
  const em = useEditorMediator();

  useEffect(() => {
    if (em) {
      setLoading(true);
      em.getCategories()
        .then((data) => {
          data.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            } else {
              return -1;
            }
          });

          setCategoriesFetched(true);
          setCategories([...data]);
        })
        .catch((err) => {
          window.location.href = "/";
          console.log(err);
        });
    }
  }, [em]);

  useEffect(() => {
    if (categoriesFetched && id) {
      em.getCategoryById(id)
        .then((data) => {
          console.log(data);
          setParentCategory(data[0].parent);
          setCategoryName(data[0].name);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          window.location.href = "/";
        });
    }
  }, [em, id, categoriesFetched]);

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
        <div className="addCategoryContainer">
          <div className="loading">
            <p>Loading...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="addCategoryContainer">
        <form
          className="addCategoryForm"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            em.editCategory(id, categoryName, parentCategory)
              .then((message) => {
                console.log(message);
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
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
            id="addCategorySelect"
            value={parentCategory}
          >
            <option value="0">None</option>
            {renderParentOptions()}
          </select>

          <div className="submitButtonContainer">
            <button className="submitButton">
              <p>Edit category</p>
            </button>
          </div>
        </form>
      </div>
    );
  }

  return renderPage();
}
