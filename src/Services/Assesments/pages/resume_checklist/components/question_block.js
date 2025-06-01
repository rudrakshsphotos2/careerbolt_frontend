import React from 'react'
import './question_block.css'

function QuestionBlock(props) {

  return (
    <div className='Question_block'>
        <div className={props.blockName}>
          <h2>{props.title}</h2>
          <h3>For the choices below choose Yes or No, as you think fit </h3>
            {props.responses.map((response, index) => (
              <div key={index}>
                <label>
                  Question {index + 1}: {props.questionArray[index]}
                  <select
                    value={response || ''}
                    onChange={(e) => {e.preventDefault(); props.handleInputChange(index, Number(e.target.value),e)}}
                    style={{ borderColor: props.errors.includes(index) ? 'red' : 'black' }}
                  >
                    <option value="-1" disabled>Select value</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </label>
              </div>
            ))} 
      </div>
    </div>
  )
}

export default QuestionBlock