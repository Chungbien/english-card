import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import WordConent from '../components/content-word';
import SelectUnit from '../components/select-unit';
import * as actions from '../services/redux/action';

function App() {
  return (
    <div className="card">
    <div className="card__img">
      <img
        src="https://image.freepik.com/free-vector/landscape-wallpaper-flat-design_74890-38.jpg"
        alt="image-conver"
      />
    </div>
    {/* <WordConent /> */}
    <SelectUnit />
    {/* <div className="card-action card-action__select"> */}
    <div className="card-action">
      <ion-icon
        class="card-action__previous card-action__arrow"
        name="arrow-back-outline"
      ></ion-icon>
      <div className="card-action__submit">
        Check
      </div>
      <ion-icon
        class="card-action__next card-action__arrow"
        name="arrow-forward-outline"
      ></ion-icon>
    </div>
  </div>
  );
}

const mapStateToProps = state => {
  return {
    msg: state.word.initialMessage
  }
};
const mapDispatchToProps = dispatch => {
  return {
    wordActions: bindActionCreators(actions, dispatch),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);


