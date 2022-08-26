import ILeaderboard from '../interfaces/ILeaderboard';
import MatchService from './MatchService';
import TeamService from './TeamService';

// name: string,
// totalPoints: number,
// totalGames: number,
// totalVictories: number,
// totalDraws: number,
// totalLosses: number,
// goalsFavor: number,
// goalsOwn: number,
// goalsBalance: number,
// efficiency: number
// }

export default class LeaderboardService {
  constructor(
    private _team: TeamService,
    private _match: MatchService,
    private _leaderboard: ILeaderboard,
  ) {}

  async totalGames(idT: number): Promise<void> {
    const matchesFinished = await this._match.filterInProgress(false);
    const team = await this._team.getById(idT);
    const { id, teamName } = team;
    let games = 0;

    matchesFinished.forEach((t) => {
      if (t.homeTeam === id || t.awayTeam === id) {
        games += 1;
        this._leaderboard.name = teamName;
        return games;
      }
    });

    this._leaderboard.totalGames = games;
  }

  async totalPoints(idT: number): Promise<void> {
    const matchesFinished = await this._match.filterInProgress(false);
    const team = await this._team.getById(idT);
    const home = this._leaderboard;
    const away = this._leaderboard;

    matchesFinished.forEach((t) => {
      if (t.homeTeam === team.id) {
        if (t.homeTeamGoals > t.awayTeamGoals) {
          home.totalPoints += 3;
          away.totalPoints += 0;
        } else if (t.homeTeamGoals < t.awayTeamGoals) {
          away.totalPoints += 3;
          home.totalPoints += 0;
        } else {
          away.totalPoints += 1;
          home.totalPoints += 1;
        }
      }
    });
  }

  // async efficiency(id: number): Promise<number[]> {
  //   const match = await this.checkMatchValid(id);
  //   const home = this._leaderboard;
  //   const away = this._leaderboard;

  //   const { homeTeam, awayTeam } = match;

  //   const pointsHome: number[] = await this.totalPoints(homeTeam);
  //   const pointsAway: number[] = await this.totalPoints(awayTeam);
  //   const gamesHome: number[] = await this.totalGames(homeTeam);
  //   const gamesAway: number[] = await this.totalGames(awayTeam);

  //   const resultHome = (pointsHome[0] / (gamesHome[0] * 3)) * 100;
  //   const resultAway = (pointsAway[1] / (gamesAway[1] * 3)) * 100;

  //   home.efficiency = resultHome;
  //   away.efficiency = resultAway;

  //   return [Number(home.efficiency.toFixed(2)), Number(away.efficiency.toFixed(2))];
  // }

  // async goalsBalance(id: number): Promise<number[]> {
  //   const match = await this.checkMatchValid(id);
  //   const home = this._leaderboard;
  //   const away = this._leaderboard;

  //   const { homeTeam, awayTeam } = match;

  // }
}
