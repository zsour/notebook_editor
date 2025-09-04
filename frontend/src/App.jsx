import { useEffect, useState } from "react";
import "./components/style/home.css";

import { useEditorMediator } from "./components/EditorMediator";

function App() {
  const em = useEditorMediator();
  const [postsFetched, setPostsFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [parentLookup, setParentLookup] = useState({});

  const [categories, setCategories] = useState([]);
  const [categoriesFetched, setCategoriesFetched] = useState(false);

  const [modalOpen, setModalOpen] = useState(true);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (!categoriesFetched) {
      setPostsFetched(false);
      setLoading(true);
      if (em) {
        em.getCategories()
          .then((data) => {
            data.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }

              return -1;
            });
            let lookup = {};
            for (let i = 0; i < data.length; i++) {
              data[i].posts = [];
              lookup[data[i].ID] = i;
            }

            setParentLookup({ ...lookup });
            setCategories([...data]);
            setCategoriesFetched(true);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      }
    }
  }, [em, categoriesFetched]);

  useEffect(() => {
    if (categoriesFetched && !postsFetched && em) {
      setLoading(true);
      em.getPosts()
        .then((data) => {
          setPostsFetched(true);
          data.sort((a, b) => {
            if (a.title > b.title) {
              return 1;
            }

            return -1;
          });

          let tmp = [...categories];

          for (let i = 0; i < data.length; i++) {
            tmp[parentLookup[data[i].parent]].posts.push(data[i]);
          }

          setCategories([...tmp]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [categories, postsFetched, em, parentLookup, categoriesFetched]);

  function renderCategories() {
    let jsx = [];
    for (let i = 0; i < categories.length; i++) {
      jsx.push(
        <div key={`category_${i}`} className="category">
          <div className="categoryHeader">
            <p className="categoryTitle">{categories[i].name}</p>

            <span
              className="categoryRemoveButton"
              onClick={() => {
                createModal(
                  `Are you sure you want to delete the category "${categories[i].name}" and all of its entries?`,

                  () => {
                    setLoading(true);
                    setModalOpen(false);
                    em.deleteCategory(categories[i].ID)
                      .then((message) => {
                        setCategoriesFetched(false);
                      })
                      .catch((err) => {
                        console.log(err);
                        setLoading(false);
                      });
                  },
                );
                setModalOpen(true);
              }}
            ></span>
            <a href={`./editCategory/${categories[i].ID}`}>
              <span className="categoryEditButton"></span>
            </a>
          </div>

          <div className="categoryPostContainer">
            {renderPosts(categories[i].posts)}
          </div>
        </div>,
      );
    }

    return jsx;
  }

  function renderPosts(posts) {
    let jsx = [];
    for (let i = 0; i < posts.length; i++) {
      jsx.push(
        <div key={`post_${posts[i].ID}`} className="categoryPost">
          <p className="categoryPostTitle">{posts[i].title}</p>
          <span
            className="categoryPostRemoveButton"
            onClick={() => {
              setLoading(true);
              setModalOpen(false);
              createModal(
                `Are you sure you want to delete the post "${posts[i].title}"?`,
                () => {
                  setLoading(true);
                  setModalOpen(false);
                  em.deletePost(posts[i].ID)
                    .then((message) => {
                      setCategoriesFetched(false);
                    })
                    .catch((err) => {
                      console.log(err);
                      setLoading(false);
                    });
                },
              );
              setModalOpen(true);
            }}
          ></span>
          <a href={`./editPost/${posts[i].ID}`}>
            <span className="categoryPostEditButton"></span>
          </a>
        </div>,
      );
    }
    return jsx;
  }

  function createModal(question, callback) {
    setModal(
      <div className="modalContainer">
        <span
          className="modalBackground"
          onClick={() => {
            setModalOpen((prev) => !prev);
          }}
        ></span>

        <div className="modal">
          <div className="modalHeader">
            <p>Confirmation</p>
          </div>
          <div className="modalQuestionContainer">
            <p>{question}</p>
          </div>

          <div className="modalButtonContainer">
            <div
              className="modalButton"
              style={{
                backgroundColor: "#393f4f",
              }}
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <p>No</p>
            </div>

            <div
              className="modalButton"
              onClick={() => {
                callback();
              }}
            >
              <p>Yes</p>
            </div>
          </div>
        </div>
      </div>,
    );
  }

  function renderModal() {
    if (modalOpen) {
      return modal;
    }
  }

  function renderPage() {
    if (loading) {
      return (
        <div className="categoryContainer">
          <div className="loading">
            <p>Loading...</p>
          </div>
        </div>
      );
    }

    if (categories.length == 0) {
      return (
        <div className="categoryContainer">
          <div className="loading">
            <p>No categories exist right now.</p>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="categoryContainer">{renderCategories()}</div>
        <div
          className="bottomButtonContainer"
          onClick={() => {
            em.exportToFile()
              .then((message) => {
                console.log(message);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <div className="button">
            <p>Export to JSON</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {renderPage()}
      {renderModal()}
    </>
  );
}

export default App;
