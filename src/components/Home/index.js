import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VscDebugRestart } from "react-icons/vsc";
import "./index.css";

let arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
arr1.sort(() => Math.random() - 0.5);
const Home = () => {
  const [numList, setNumList] = useState(arr1);
  const navigate = useNavigate();
  useEffect(() => {
    const loginDetails = localStorage.getItem("loginToken");
    if (loginDetails === null) {
      navigate("/signIn");
    }
  });
  const onClickBox = (index) => {
    let updatedList = [...numList];
    if (numList[index + 4] === 0) {
      updatedList[index] = 0;
      updatedList[index + 4] = numList[index];
      setNumList(updatedList);
    } else if (numList[index - 4] === 0) {
      updatedList[index] = 0;
      updatedList[index - 4] = numList[index];
      setNumList(updatedList);
    } else if ((index + 1) % 4 !== 0 || 1) {
      if (numList[index + 1] === 0) {
        updatedList[index] = 0;
        updatedList[index + 1] = numList[index];
        setNumList(updatedList);
      } else if (numList[index - 1] === 0) {
        updatedList[index] = 0;
        updatedList[index - 1] = numList[index];
        setNumList(updatedList);
      }
    } else if ((index + 1) % 4 === 1) {
      if (numList[index + 1] === 0) {
        updatedList[index] = 0;
        updatedList[index + 1] = numList[index];
        setNumList(updatedList);
      }
    } else if ((index + 1) % 4 === 0) {
      if (numList[index - 1] === 0) {
        updatedList[index] = 0;
        updatedList[index - 1] = numList[index];
        setNumList(updatedList);
      }
    }
  };
  const onResetNumbers = () => {
    let newList = [...numList];
    newList.sort(() => Math.random() - 0.5);
    setNumList(newList);
  };

  const onClickLogOut = () => {
    navigate("/signIn");
  };

  const initialArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const completed = initialArr.toString() === numList.toString();

  return (
    <div className="Home-page">
      <button className="logout-button" onClick={onClickLogOut}>
        Logout
      </button>
      <h1 className="puzzle-heading">Super Puzzle</h1>
      <ul className="puzzle-box">
        {numList.map((item, i) => (
          <li
            key={i}
            className={`puzzle-item ${item === 0 && "empty-box"}`}
            onClick={() => {
              onClickBox(i);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="reset-result-container">
        <p className="result-text">{completed ? "Solved 🎉" : "unSolved"}</p>
        <button
          type="button"
          className="restart-button"
          onClick={onResetNumbers}
        >
          <VscDebugRestart size={20} />
          Reset
        </button>
      </div>
      <p className="result-text">Sample Solved Image</p>
      <img
        src="https://res.cloudinary.com/sunil013/image/upload/v1671968758/300px-15-puzzle_jts7ou.jpg"
        alt="result"
        className="result-image"
      />
    </div>
  );
};

export default Home;
