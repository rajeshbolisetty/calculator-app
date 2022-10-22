import React from 'react'
import './button.scss'
import PropTypes from 'prop-types'

const Buttons = ({ inputHandler, clearInput, backspace, calculateAns }) => {
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      document.getElementById('equalbtn').click()
    }
  })

  return (
    <div className="show-btn">
      <button className="btn" onClick={clearInput}>
        C
      </button>
      <button className="btn" onClick={backspace}>
        ⌫
      </button>
      <button className="btn" onClick={inputHandler}>
        %
      </button>
      <button className="btn lastColumn" onClick={inputHandler}>
        ÷
      </button>
      <button className="btn" onClick={inputHandler}>
        7
      </button>
      <button className="btn" onClick={inputHandler}>
        8
      </button>
      <button className="btn" onClick={inputHandler}>
        9
      </button>
      <button className="btn lastColumn" onClick={inputHandler}>
        x
      </button>
      <button className="btn" onClick={inputHandler}>
        4
      </button>
      <button className="btn" onClick={inputHandler}>
        5
      </button>
      <button className="btn" onClick={inputHandler}>
        6
      </button>
      <button className="btn lastColumn" onClick={inputHandler}>
        -
      </button>
      <button className="btn" onClick={inputHandler}>
        1
      </button>
      <button className="btn" onClick={inputHandler}>
        2
      </button>
      <button className="btn" onClick={inputHandler}>
        3
      </button>
      <button className="btn lastColumn" onClick={inputHandler}>
        +
      </button>
      <button className="btn zero" onClick={inputHandler}>
        0
      </button>
      <button className="btn" onClick={inputHandler}>
        .
      </button>
      <button className="btn lastColumn" id="equalbtn" onClick={calculateAns}>
        =
      </button>
    </div>
  )
}

Buttons.propTypes = {
  inputHandler: PropTypes.string,
  clearInput: PropTypes.string,
  backspace: PropTypes.string,
  calculateAns: PropTypes.string
}

export default Buttons
