import React, { useState, useRef, Fragment } from 'react';
import './App.css';
import Team from './Team';

function App() {
  const [table, setTable] = useState();
  const [selectedQuestion, setselectedQuestion] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedAnswer, setselectedAnswer] = useState();
  const [visibleQA, setVisibleQA] = useState();
  const [touched, setTouched] = useState([]);
  const [teamsScore, setTeamsScore] = useState([0, 0, 0]);

  const QAOutput = useRef();
  const answerOutput = useRef();

  let headingTable = null;
  let tableContent = null;

  if (table) {
    headingTable = table.categories.map((category) => <th key={Math.random()}>{category}</th>);

    tableContent = table.qa.map((row, rowIndex) => {
      return (
        <tr key={Math.random()}>
          {row.rowItems.map((rowItem, columnIndex) => (
            <td
              data-touched={`${columnIndex}-${rowIndex}`}
              className={touched.includes(`${columnIndex}-${rowIndex}`) ? 'touched' : ''}
              onClick={(e) => onClickHandler(e, rowItem.question, rowItem.answer)}
              key={Math.random()}
            >
              {rowItem.value}$
            </td>
          ))}
        </tr>
      );
    });
  }

  const onClickHandler = (e, question, answer) => {
    if (e.target.classList.contains('touched')) {
      return;
    }
    setselectedQuestion(question);
    setselectedAnswer(answer);
    setSelectedPrice(parseInt(e.target.childNodes[0].data));
    setTouched(touched.concat(e.target.dataset.touched));
    toggleQAVisibilityHandler();
  };
  const onChangeHandler = (e) => {
    console.log(e.target.files);
    loadConfigurationFile(e.target.files[0]);
  };
  const toggleQAVisibilityHandler = () => {
    setVisibleQA(!visibleQA);
    QAOutput.current.classList.toggle('hidden');
    if (visibleQA) {
      setselectedQuestion(null);
      answerOutput.current.classList.toggle('hidden');
    }
  };
  const toggleAnswerVisibilityHandler = () => {
    answerOutput.current.classList.toggle('hidden');
  };
  //load configuration file
  function loadConfigurationFile(file) {
    var reader = new FileReader();

    reader.onload = function (evt) {
      const text = evt.target.result;
      setTable(JSON.parse(text));
    };
    reader.readAsText(file);
  }

  return (
    <Fragment>
      <div className="main">
        <div className="header">
          <input type="file" name="file" onChange={onChangeHandler} className="upload" />

          <h1>Lizuchka's Ultimate Game</h1>
          <button onClick={toggleQAVisibilityHandler}>Show Answer</button>
        </div>

        <table>
          <thead>{<tr>{headingTable}</tr>}</thead>
          <tbody>{tableContent}</tbody>
        </table>
        <div className="answer hidden" ref={QAOutput}>
          <i className="material-icons green-text closeAnswer" onClick={toggleQAVisibilityHandler}>
            close
          </i>
          <div className={`question ${selectedQuestion === null ? 'hidden' : null}`} display>
            {selectedQuestion}
            <p className="demo-link" onClick={toggleAnswerVisibilityHandler}>
              click <span className="underline">here</span> to see the answer
            </p>
          </div>
          <div className="answerContent hidden" ref={answerOutput}>
            {selectedAnswer}
          </div>
        </div>
      </div>
      <div className="scoreTable">
        {teamsScore.map((score, index) => {
          return (
            <Team
              teamNumber={index}
              teamsScore={teamsScore}
              setTeamsScore={setTeamsScore}
              selectedPrice={selectedPrice}
            />
          );
        })}
      </div>
    </Fragment>
  );
}

export default App;
