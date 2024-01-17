import "./style.css";
import {useState} from 'react';

function App() {

    
  let [data, setData] = useState(
    {
      Math: {extended: false, posts: [{label: "Dijkstras", codeblocks: [{description: "", code: ""}]}]},
      Graph: {extended: false, posts: [{label: "Test", codeblocks: [{description: "", code: ""}]}]}
    } 
  );

  function toggleExtend(label){
    let tmp = {...data};
    tmp[label].extended = !tmp[label].extended;
    setData({...tmp});
  }

  function generateCategory(label, posts){
    let jsx = [];

    for(let i = 0; i < posts.length; i++){ 
      let tmpPost = (<div key={`${label}:{i}`} className="categoryPost">
          <p className="categoryPostLabel">{posts[i].label}</p>
          <span className="categoryPostPreviewButton"></span>
          <span className="categoryPostEditButton"></span>
          <span className="categoryPostRemoveButton"></span>
      </div>);

      jsx.push(tmpPost);
    }


    return (<div key={label} className="category" style={{
        height: data[label].extended ? `${34 * posts.length + 40}px` : "40px"
    }}>
          <div className="categoryHeader" onClick={() => {toggleExtend(label)}}>
            <p className="categoryTitle">{label}</p>
          </div>
          <div className="categoryPostsWrapper">
            {jsx}
          </div>
    </div>);
  }

  function renderCategories(){
      let jsx = [];
      for(let key in data){
        jsx.push(generateCategory(key, data[key].posts));
      }

      return jsx;
  }

  return (
    <div className="content">
      <div className="mainContainer">
        <div className="buttonContainer">
          <span className="button">
            <span className="buttonIcon"></span>
            <span className="buttonTitleContainer">
              <p className="buttonTitle">Add Category</p>
            </span>
          </span>


          <span className="button">
            <span className="buttonIcon"></span>
            <span className="buttonTitleContainer">
              <p className="buttonTitle">Add Post</p>
            </span>
          </span>
        </div>


      <div className="categoryContainer">
          {renderCategories()}
      </div>

      </div>
    </div>
  );
}

export default App;
