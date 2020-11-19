import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WordConent from "../components/content-word";
import * as actions from "../services/redux/action";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastsContainer, ToastsStore } from "react-toasts";

function App() {
  const url = "http://localhost:1325";
  const { unitId } = useParams();
  const [unitExam, setUnitExam] = useState(null);
  const [listWord, setListWord] = useState([]);
  const [randomWord, setRandomWord] = useState(null);
  const [answerTxt, setAnswerTxt] = useState("");
  // TODO:
  // B1: Get all Word of unit by unitId
  // B2: Mout flag for all word
  // B3: Get random word
  // B4: Check correct word ==> set flag = true
  // B5: Get random word

  useEffect(() => {
    if (unitId) {
      axios
        .get(`${url}/units/${unitId}`)
        .then(function (response) {
          setUnitExam(response.data);
          const listWithFlag = [];
          response.data.words.map((word) => {
            listWithFlag.push({
              ...word,
              correctFlag: false,
            });
          });
          setListWord(listWithFlag);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (listWord && listWord.length > 0) {
      handleGetRandomWord();
    }
  }, [listWord]);

  const handleGetRandomWord = () => {
    while (true) {
      const randomIndex = Math.floor(Math.random() * 30);
      if (!listWord[randomIndex].correctFlag) {
        setRandomWord(listWord[randomIndex]);
        break;
      }
    }
  };

  const handleSubmit = () => {
    if (
      answerTxt.toString().trim().toLowerCase() ===
      randomWord.text.toString().trim().toLowerCase()
    ) {
      ToastsStore.success("Good Job bro!");
      const newListWord = [...listWord];
      newListWord.map((w) => {
        if (w.id === randomWord.id) {
          w.correctFlag = true;
        }
      });
      setListWord(newListWord);
      handleGetRandomWord();
    } else {
      ToastsStore.error("Try again bro!");
    }
  };

  return (
    <div className="card">
      <div className="card__img">
        <img src="https://source.unsplash.com/random" alt="image-conver" />
      </div>
      <WordConent word={randomWord} onChange={(value) => setAnswerTxt(value)} />
      {/* <div className="card-action card-action__select"> */}
      <div className="card-action">
        <div className="card-action__submit" onClick={handleSubmit}>
          Check
        </div>
      </div>
      <ToastsContainer store={ToastsStore} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    msg: state.word.initialMessage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    wordActions: bindActionCreators(actions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
