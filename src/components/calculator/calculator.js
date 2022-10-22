import React, { useState } from 'react'
import Display from '../display/display'
import Buttons from '../button/button'
import './calculator.scss'
import { evaluate, round } from 'mathjs'

function Calculator () {
  const [input, setInput] = useState('')
  const [answer, setAnswer] = useState('')

  // input
  const inputHandler = (event) => {
    if (answer === 'Invalid Input!!') return
    const val = event.target.innerText

    const str = input + val
    if (str.length > 14) return

    if (answer !== '') {
      setInput(answer + val)
      setAnswer('')
    } else setInput(str)
    // setInput(str);
  }

  // Clear screen
  const clearInput = () => {
    setInput('')
    setAnswer('')
  }

  // check brackets are balanced or not
  const checkBracketBalanced = (expr) => {
    const stack = []
    for (let i = 0; i < expr.length; i++) {
      const x = expr[i]
      if (x === '(') {
        stack.push(x)
        continue
      }

      if (x === ')') {
        if (stack.length === 0) return false
        else stack.pop()
      }
    }
    return stack.length === 0
  }

  // calculate final answer
  const calculateAns = () => {
    if (input === '') return
    let result = 0
    let finalexpression = input
    finalexpression = finalexpression.replaceAll('x', '*')
    finalexpression = finalexpression.replaceAll('÷', '/')

    // evaluate square root
    const noSqrt = input.match(/√[0-9]+/gi)

    if (noSqrt !== null) {
      let evalSqrt = input
      for (let i = 0; i < noSqrt.length; i++) {
        evalSqrt = evalSqrt.replace(
          noSqrt[i],
          `sqrt(${noSqrt[i].substring(1)})`
        )
      }
      finalexpression = evalSqrt
    }

    try {
      // check brackets are balanced or not
      if (!checkBracketBalanced(finalexpression)) {
        const errorMessage = { message: 'Brackets are not balanced!' }
        throw errorMessage
      }
      result = evaluate(finalexpression) // mathjs
    } catch (error) {
      result =
        error.message === 'Brackets are not balanced!'
          ? 'Brackets are not balanced!'
          : 'Invalid Input!!' // error.message;
    }
    isNaN(result) ? setAnswer(result) : setAnswer(round(result, 3))
  }

  // remove last character
  const backspace = () => {
    if (answer !== '') {
      setInput(answer.toString().slice(0, -1))
      setAnswer('')
    } else setInput((prev) => prev.slice(0, -1))
  }

  // change prefix of expression
  const changePlusMinus = () => {
    // need to change for answer
    if (answer !== '') {
      const ans = answer.toString()
      if (ans.charAt(0) === '-') {
        const plus = '+'
        setInput(plus.concat(ans.slice(1, ans.length)))
      } else if (ans.charAt(0) === '+') {
        const minus = '-'
        setInput(minus.concat(ans.slice(1, ans.length)))
      } else {
        const minus = '-'
        setInput(minus.concat(ans))
      }
      setAnswer('')
    } else {
      if (input.charAt(0) === '-') {
        const plus = '+'
        setInput((prev) => plus.concat(prev.slice(1, prev.length)))
      } else if (input.charAt(0) === '+') {
        const minus = '-'
        setInput((prev) => minus.concat(prev.slice(1, prev.length)))
      } else {
        const minus = '-'
        setInput((prev) => minus.concat(prev))
      }
    }
  }

  return (
    <>
      <div className="container">
        <div className="main">
          <Display input={input} setInput={setInput} answer={answer} />
          <Buttons
            inputHandler={inputHandler}
            clearInput={clearInput}
            backspace={backspace}
            changePlusMinus={changePlusMinus}
            calculateAns={calculateAns}
          />
        </div>
      </div>
    </>
  )
}

export default Calculator
