// import ILeaderboard from '../interfaces/ILeaderboard';
// import IMatch from '../interfaces/IMatches';
// import Match from '../models/MatchesModels';
// import Team from '../models/TeamsModel';

// export default class LeaderboardService implements ILeaderboard {
//   private _name: string;
//   private _totalPoints: number;
//   private _totalGames: number;
//   private _totalVictories: number;
//   private _totalDraws: number;
//   private _totalLosses: number;
//   private _goalsFavor: number;
//   private _goalsOwn: number;
//   private _goalsBalance: number;
//   private _efficiency: number;
//   private _team = Team;
//   private _match = Match;

//   async calcTotalPoints(id: number): Promise<IMatch> {
//     const match = await this._match.findByPk(id);
//     if (!match) {
//       const e = new Error('There is no match with such id!');
//       e.name = 'NotFound';
//       throw e;
//     }
//     const home = match.homeTeam;
//     const { homeTeamGoals, awayTeamGoals } = match;

//     if (homeTeamGoals > awayTeamGoals) {
//       home._this
//     }

//     // console.log(match);
//     return match as IMatch;
//   }
// }
