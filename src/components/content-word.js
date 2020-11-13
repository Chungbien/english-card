import React from 'react'
import PropTypes from 'prop-types'

function WordConent(props) {
  return (
    <>
      <div className="card__title word">Lorem ipsum dolor sit</div>
      <div className="card-subtitle word-detail">
        <div className="card-subtitle__item word-detail__phonetic">
          <div className="item__icon">
            <ion-icon name="mic-outline"></ion-icon>
          </div>
          <div className="item__word">/əˈpiːlɪŋ/</div>
        </div>
        <div className="card-subtitle__item word-detail__meaning">
          <div className="item__icon">
            <ion-icon name="text-outline"></ion-icon>
          </div>
          <div className="item__word">Thu hut</div>
        </div>
      </div>
      <div className="card__content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore
    </div>
      <div className="card__form">
        <input type="text" name="" id="" />
      </div>
    </>
  )
}

export default WordConent

