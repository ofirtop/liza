import React from 'react';
import styles from './Team.module.css';

const Team = ({ teamNumber, score, setScore, selectedPrice }) => {
  return (
    <div className={styles.Team}>
      <div className={styles.teamName}>Team {teamNumber}</div>
      <hr />
      <div className={styles.score}>{score}</div>
      <div className={styles.actionLine}>
        <div className={styles.plus} onClick={() => setScore(score + selectedPrice)}>
          +
        </div>
        <div className={styles.minus} onClick={() => setScore(score - selectedPrice)}>
          -
        </div>
      </div>
    </div>
  );
};

export default Team;
