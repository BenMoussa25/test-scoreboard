import React from 'react';

const ScoreboardTable = ({ scoreboard }) => {
  const getTrophyIcon = (rank) => {
    if (rank === 1) {
      return (
        <i
          className="fas fa-trophy fa-2xl"
          style={{
            background: '-webkit-linear-gradient(90deg, rgba(221,119,30,1) 0%, rgba(255,236,52,1) 69%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        />
      );
    } else if (rank === 2) {
      return (
        <i
          className="fas fa-trophy fa-2xl"
          style={{
            background: '-webkit-linear-gradient(90deg, rgba(154,154,154,1) 0%, rgba(255,254,248,1) 69%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        />
      );
    } else if (rank === 3) {
      return (
        <i
          className="fas fa-trophy fa-2xl"
          style={{
            background: '-webkit-linear-gradient(90deg, rgba(117,48,18,1) 0%, rgba(244,109,30,1) 69%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        />
      );
    }
    return rank;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th>Score</th>
          <th>Solves</th>
          <th>Bloods</th>
        </tr>
      </thead>
      <tbody>
        {scoreboard.map((team, index) => (
          <tr key={team.id || index}>
            <td className="rank">{getTrophyIcon(index + 1)}</td>
            <td>{team.team}</td>
            <td>
              <span>{team.score}</span>
            </td>
            <td>
              <span>{team.num_solves}</span>
            </td>
            <td>
              <span>{team.num_bloods}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScoreboardTable;
