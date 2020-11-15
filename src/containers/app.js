import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import WordConent from "../components/content-word";
import SelectUnit from "../components/select-unit";
import * as actions from "../services/redux/action";

function App() {
  return (
    <div className="card">
      <div className="card__img">
        <img src="https://source.unsplash.com/random" alt="image-conver" />
      </div>
      <WordConent />
      {/* <div className="card-action card-action__select"> */}
      <div className="card-action">
        <div className="card-action__submit">Check</div>
      </div>
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
