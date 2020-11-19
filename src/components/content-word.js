import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function WordConent(props) {
  const { word, onChange } = props;
  const [answer, setAnswer] = useState("Your answer...");

  const handleOnChange = (e) => {
    onChange(e.target.value);
    setAnswer(e.target.value);
  };

  useEffect(() => {
    if (props.word !== null) {
      document.getElementById("input-word").value = "";
      setAnswer("Your answer...");
    }
  }, [props.word]);

  return (
    <>
      <div className="card__title word">{answer}</div>
      <div className="card-subtitle word-detail">
        <div className="card-subtitle__item word-detail__phonetic">
          <div className="item__icon">
            <ion-icon name="mic-outline"></ion-icon>
          </div>
          <div className="item__word">{`/${word && word.phonetic}/`}</div>
        </div>
        <div className="card-subtitle__item word-detail__meaning">
          <div className="item__icon">
            <ion-icon name="text-outline"></ion-icon>
          </div>
          <div className="item__word">{word && word.meaning}</div>
        </div>
      </div>
      <div className="card__content">
        {word && word.sentence}
        <q>{word && word.translate}</q>
      </div>
      <div className="card__form">
        <input
          type="text"
          name=""
          id={`input-word`}
          onChange={handleOnChange}
        />
      </div>
    </>
  );
}

export default WordConent;
