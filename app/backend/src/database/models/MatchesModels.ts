import { INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './TeamsModel';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team',
  },

  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team',
  },

  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: INTEGER,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'match',
  tableName: 'matches',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'id', as: 'matches' });

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeTeams' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayTeams' });

export default Match;
