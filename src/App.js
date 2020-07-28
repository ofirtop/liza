import React, { useState, useRef, Fragment } from 'react';
import './App.css';
import Team from './Team';
function App() {
  const [table, setTable] = useState();
  const [selectedQuestion, setselectedQuestion] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [selectedAnswer, setselectedAnswer] = useState();
  const [visibleAnswer, setVisibleAnswer] = useState();
  const [touched, setTouched] = useState([]);

  const [scoreTeam1, setScoreTeam1] = useState(0);
  const [scoreTeam2, setScoreTeam2] = useState(0);
  const [scoreTeam3, setScoreTeam3] = useState(0);

  const answerOutput = useRef();

  let headingTable = null;
  let tableContent = null;

  if (table) {
    headingTable = table.categories.map((category) => <th key={Math.random()}>{category}</th>);

    tableContent = table.qa.map((row, rowIndex) => {
      return (
        <tr key={Math.random()}>
          {row.rowItems.map((rowItem, columnIndex) => (
            //data-touched={touched.contains}
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
  };
  const onChangeHandler = (e) => {
    console.log(e.target.files);
    loadCache(e.target.files[0]);
  };
  const toggleAnswerVisibilityHandler = () => {
    setVisibleAnswer(!visibleAnswer);
    answerOutput.current.classList.toggle('hidden');
    if (visibleAnswer) {
      setselectedQuestion(null);
    }
  };
  //load configuration file
  function loadCache(file) {
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
          <button onClick={toggleAnswerVisibilityHandler}>Show Answer</button>
        </div>

        <table>
          <thead>{<tr>{headingTable}</tr>}</thead>
          <tbody>{tableContent}</tbody>
        </table>
        <div className="question">{selectedQuestion}</div>
        <div className="answer hidden" ref={answerOutput}>
          <i className="material-icons green-text closeAnswer" onClick={toggleAnswerVisibilityHandler}>
            close
          </i>
          <div className="answerContent">{selectedAnswer}</div>
        </div>
      </div>
      <div className="scoreTable">
        <Team teamNumber={1} score={scoreTeam1} setScore={setScoreTeam1} selectedPrice={selectedPrice} />
        <Team teamNumber={2} score={scoreTeam2} setScore={setScoreTeam2} selectedPrice={selectedPrice} />
        <Team teamNumber={3} score={scoreTeam3} setScore={setScoreTeam3} selectedPrice={selectedPrice} />
      </div>
    </Fragment>
  );
}

export default App;
