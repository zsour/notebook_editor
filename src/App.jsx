import "./style.css";
import {useState} from 'react';

function App() {

 let [height, setHeight] = useState("0px");

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
        <div className="category" style={{height: height}} onClick={() => {
            setHeight('120px');             
          }}>
          <div className="categoryHeader">
            <p className="categoryTitle">Math</p>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}

export default App;
