import React from 'react'
import PropTypes from 'prop-types'

function WordConent(props) {
  return (
    <>
      <div class="card__title word">Lorem ipsum dolor sit</div>
      <div class="card-subtitle word-detail">
        <div class="card-subtitle__item word-detail__phonetic">
          <div class="item__icon">
            <ion-icon name="mic-outline"></ion-icon>
          </div>
          <div class="item__word">/əˈpiːlɪŋ/</div>
        </div>
        <div class="card-subtitle__item word-detail__meaning">
          <div class="item__icon">
            <ion-icon name="text-outline"></ion-icon>
          </div>
          <div class="item__word">Thu hut</div>
        </div>
      </div>
      <div class="card__content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore
    </div>
      <div class="card__form">
        <input type="text" name="" id="" />
      </div>
    </>
  )
}

export default WordConent

