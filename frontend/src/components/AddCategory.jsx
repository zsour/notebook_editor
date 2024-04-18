import React, { useEffect, useState } from "react";
import "./style/addCategory.css";
import { useEditorMediator } from "./EditorMediator";

function AddCategory() {
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("0");

  const [categories, setCategories] = useState([]);

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

          setCategories([...data]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [em]);

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
            em.addCategory(categoryName, parentCategory)
              .then((message) => {
                console.log(message);
                setLoading(true);
                setCategoryName("");
                setParentCategory("");
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
            id="addCategorySelect"
            value={parentCategory}
          >
            <option value="0">None</option>
            {renderParentOptions()}
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

  return renderPage();
}

export default AddCategory;
