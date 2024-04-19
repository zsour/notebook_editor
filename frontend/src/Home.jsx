import { useEffect, useState } from "react";
import "./components/style/home.css";

import { useEditorMediator } from "./components/EditorMediator";

function Home() {
  const em = useEditorMediator();
  const [postsFetched, setPostFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [parentLookup, setParentLookup] = useState({});

  let [categories, setCategories] = useState([]);

  useEffect(() => {
    setPostFetched(false);
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
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [em]);

  useEffect(() => {
    if (categories.length > 0 && !postsFetched && em) {
      setLoading(true);
      em.getPosts()
        .then((data) => {
          setPostFetched(true);
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
  }, [categories, postsFetched, em, parentLookup]);

  function renderCategories() {
    let jsx = [];
    for (let i = 0; i < categories.length; i++) {
      jsx.push(
        <div key={`category_${i}`} className="category">
          <div className="categoryHeader">
            <p className="categoryTitle">{categories[i].name}</p>

            <span className="categoryRemoveButton"></span>
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
          <span className="categoryPostRemoveButton"></span>
          <a href={`./editPost/${posts[i].ID}`}>
            <span className="categoryPostEditButton"></span>
          </a>
        </div>,
      );
    }
    return jsx;
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

    return <div className="categoryContainer">{renderCategories()}</div>;
  }

  return <>{renderPage()}</>;
}

export default Home;
