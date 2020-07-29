import React from 'react';
import styles from './Team.module.css';

const Team = ({ teamNumber, teamsScore, setTeamsScore, selectedPrice }) => {
  const setScore = (score) => {
    const newTeamsScore = [...teamsScore];
    newTeamsScore[teamNumber] = score;

    setTeamsScore(newTeamsScore);
  };
  return (
    <div className={styles.Team}>
      <div className={styles.teamName}>Team {teamNumber}</div>
      <hr />
      <div className={styles.score}>{teamsScore[teamNumber]}</div>
      <div className={styles.actionLine}>
        <div className={styles.plus} onClick={() => setScore(teamsScore[teamNumber] + selectedPrice)}>
          +
        </div>
        <div className={styles.minus} onClick={() => setScore(teamsScore[teamNumber] - selectedPrice)}>
          -
        </div>
      </div>
    </div>
  );
};

export default Team;
