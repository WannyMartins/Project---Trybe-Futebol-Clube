import IBoardFilter, { IBoard } from '../interfaces/IBoards';
import ILeaderboard from '../interfaces/ILeaderboard';
import Match from '../models/MatchesModels';
import Team from '../models/TeamsModel';
import LBCalc from '../utils/LeaderboardCalc';

export default class LeaderboardService {
  private _team = Team;
  private _match = Match;

  async getTableFilter(): Promise<IBoardFilter[]> { // query para separar os dados da mesma tabela personalizando o que time mandante e o que é da casa
    const teams: Team[] = await this._team.findAll({ include: [
      { model: this._match, as: 'matchesHome', where: { inProgress: false } },
      { model: this._match, as: 'matchesAway', where: { inProgress: false } },
    ] });
    return teams as unknown as IBoardFilter[];
  }

  async getTable(): Promise<IBoard[]> {
    const teams: Team[] = await this._team.findAll({ include: [
      { model: this._match, as: 'matches', where: { inProgress: false } },
    ] });
    return teams as unknown as IBoard[];
  }

  async classificationTableHome(): Promise<ILeaderboard[]> {
    const teamsData = await this.getTableFilter();
    const score: ILeaderboard[] = teamsData.map((el) => {
      const scoreTotalH = LBCalc.scoreTotalHome(el.matchesHome);
      const totalGoalsHome = LBCalc.totalGoalsHome(el.matchesHome);
      return {
        name: el.teamName,
        totalPoints: scoreTotalH.totalPoints,
        totalGames: el.matchesHome.length,
        totalVictories: scoreTotalH.totalVictories,
        totalDraws: scoreTotalH.totalDraws,
        totalLosses: scoreTotalH.totalLosses,
        goalsFavor: totalGoalsHome.goalsFavor,
        goalsOwn: totalGoalsHome.goalsOwn,
        goalsBalance: totalGoalsHome.goalsBalance,
        efficiency: LBCalc.efficiency(scoreTotalH.totalPoints, el.matchesHome.length),
      };
    });
    return LBCalc.order(score) as unknown as ILeaderboard[];
  }

  async classificationTableAway(): Promise<ILeaderboard[]> {
    const teamsData = await this.getTableFilter();
    const score: ILeaderboard[] = teamsData.map((el) => {
      const scoreTotalA = LBCalc.scoreTotalAway(el.matchesAway);
      const totalGoalsAway = LBCalc.totalGoalsAway(el.matchesAway);
      return {
        name: el.teamName,
        totalPoints: scoreTotalA.totalPoints,
        totalGames: el.matchesAway.length,
        totalVictories: scoreTotalA.totalVictories,
        totalDraws: scoreTotalA.totalDraws,
        totalLosses: scoreTotalA.totalLosses,
        goalsFavor: totalGoalsAway.goalsFavor,
        goalsOwn: totalGoalsAway.goalsOwn,
        goalsBalance: totalGoalsAway.goalsBalance,
        efficiency: LBCalc.efficiency(scoreTotalA.totalPoints, el.matchesAway.length),
      };
    });
    return LBCalc.order(score) as unknown as ILeaderboard[];
  }

  async classificationTable(): Promise<ILeaderboard[]> {
    const teamsData = await this.getTable();
    const score: ILeaderboard[] = teamsData.map((el) => {
      const scoreTotal = LBCalc.scoreTotal(el.matches);
      const totalGoals = LBCalc.totalGoalsHome(el.matches);
      return {
        name: el.teamName,
        totalPoints: scoreTotal.totalPoints,
        totalGames: el.matches.length,
        totalVictories: scoreTotal.totalVictories,
        totalDraws: scoreTotal.totalDraws,
        totalLosses: scoreTotal.totalLosses,
        goalsFavor: totalGoals.goalsFavor,
        goalsOwn: totalGoals.goalsOwn,
        goalsBalance: totalGoals.goalsBalance,
        efficiency: LBCalc.efficiency(scoreTotal.totalPoints, el.matches.length),
      };
    });
    return LBCalc.order(score) as unknown as ILeaderboard[];
  }
}
