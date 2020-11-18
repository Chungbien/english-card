import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Input, Button, Row, Col, Select } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";
import { ToastsContainer, ToastsStore } from "react-toasts";

const { Option } = Select;

export default function FormAddWord() {
  const url = "http://localhost:1325";
  const quotes = [
    {
      id: 0,
      quote: "Sói thì đi săn chứ đéo cần cho ăn.",
    },
    {
      id: 1,
      quote: "Sư tử và hổ thì đều diễn xiếc. Sói thì đéo",
    },
    {
      id: 2,
      quote: "Con quỷ không ở dưới gầm giường. Nó ở trong mày",
    },
  ];
  const [word, setWord] = useState({
    text: null,
    phonetic: null,
    meaning: null,
    sentence: null,
    translate: null,
  });
  const [units, setUnits] = useState([]);
  const [unitSelectId, setUnitSelectId] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    let newWord = { ...word };
    newWord = Object.assign(newWord, { [e.target.id]: e.target.value });
    setWord(newWord);
  };

  useEffect(() => {
    axios
      .get(`${url}/units`)
      .then(function (response) {
        console.log(response);
        setUnits(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleChangeUnit = (value) => {
    setUnitSelectId(value);
  };

  const handleSubmit = () => {
    console.log(units);
    const unitSelect = units.filter((u) => u.id === unitSelectId)[0];
    let isComplete = true;
    if (!unitSelect) {
      ToastsStore.error("I dont have Unit 0! Are u ok?");
      return;
    }
    Object.values(word).map((value) => {
      if (!value) {
        isComplete = false;
        return;
      }
    });
    if (unitSelect.words.length === 30) {
      ToastsStore.error(
        "I haved 30 words! F*cking enough! Change your unit or edit db.json!"
      );
      return;
    }
    if (!isComplete) {
      ToastsStore.error(
        "Screen has 5 fields! You must have filled out all of them!"
      );
      return;
    }
    const wordInUnit = unitSelect.words.find(
      (w) =>
        word.text.toLowerCase() === w.text.toLowerCase() ||
        word.phonetic.toLowerCase() === w.phonetic.toLowerCase()
    );
    if (wordInUnit) {
      ToastsStore.error("Hey! I got it! Check your fucking WORD");
      return;
    } else {
      setLoading(true);
      const { text, phonetic, meaning, sentence, translate } = word;
      unitSelect.words.push({
        id: unitSelect.words.length + 1,
        text,
        phonetic,
        meaning,
        sentence,
        translate,
      });
      axios
        .put(`${url}/units/${unitSelect.id}`, unitSelect)
        .then(function (response) {
          // Đoạn này đáng nhẽ phải clone units và set lại word.
          // Trick vcl
          units.filter((u) => u.id === response.data.id)[0][`words`] =
            response.data.words;
          setLoading(false);
          ToastsStore.success("Good Job bro!");
          setWord({
            text: null,
            phonetic: null,
            meaning: null,
            sentence: null,
            translate: null,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const renderUnits = () => {
    return (
      <>
        {units.map((unit) => (
          <Option
            value={unit.id}
            disabled={unit && unit.words && unit.words.length === 30}
          >
            {`${unit.id} - ${unit.name}`}
          </Option>
        ))}
      </>
    );
  };

  return (
    <div className="card">
      <div className="card__title word">Lorem ipsum dolor sit</div>
      <div className="card__form">
        <Row>
          <Col span={12}>
            <Select
              style={{ width: "80%" }}
              defaultValue="0 - Select Unit"
              onChange={handleChangeUnit}
            >
              {renderUnits()}
            </Select>
          </Col>
          <Col span={12}>{`"${quotes[unitSelectId % 3].quote}"`}</Col>
        </Row>
      </div>
      <div className="card__content">
        <Input
          className="content__input"
          id="text"
          placeholder="New word - Từ mới"
          onChange={(e) => handleChange(e)}
          value={word.text}
        />
        <br />
        <Input
          className="content__input"
          id="phonetic"
          placeholder="Phonetic - Phiên âm"
          onChange={(e) => handleChange(e)}
          value={word.phonetic}
        />
        <br />
        <Input
          className="content__input"
          id="meaning"
          placeholder="Meaning of word - Ý nghĩa"
          onChange={(e) => handleChange(e)}
          value={word.meaning}
        />
        <br />
        <Input
          className="content__input"
          id="sentence"
          placeholder="Sentence - Câu văn"
          onChange={(e) => handleChange(e)}
          value={word.sentence}
        />
        <br />
        <Input
          className="content__input"
          id="translate"
          placeholder="Translate - Dịch câu"
          onChange={(e) => handleChange(e)}
          value={word.translate}
        />
        <br />
      </div>
      <div className="card-action card-action__select">
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          size={"large"}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <ToastsContainer store={ToastsStore} />
      </div>
    </div>
  );
}
