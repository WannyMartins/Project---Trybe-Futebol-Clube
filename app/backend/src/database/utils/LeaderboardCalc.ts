import ILeaderboard from '../interfaces/ILeaderboard';
import Match from '../models/MatchesModels';

export default class LeaderboardCalc {
  static scoreTotal(match: Match[]) {
    const result = {
      totalPoints: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0 };
    match.forEach((item) => {
      if (item.homeTeamGoals > item.awayTeamGoals || item.homeTeamGoals < item.awayTeamGoals) {
        result.totalPoints += 3;
        result.totalVictories += 1;
      } else if (item.homeTeamGoals === item.awayTeamGoals) {
        result.totalPoints += 1;
        result.totalDraws += 1;
      } if (item.homeTeamGoals < item.awayTeamGoals || item.homeTeamGoals > item.awayTeamGoals) {
        result.totalPoints += 0;
        result.totalLosses += 1;
      }
    });
    return result;
  }

  static scoreTotalHome(match: Match[]) {
    const result = {
      totalPoints: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0 };
    match.forEach((item) => {
      if (item.homeTeamGoals > item.awayTeamGoals) {
        result.totalPoints += 3;
        result.totalVictories += 1;
      } else if (item.homeTeamGoals === item.awayTeamGoals) {
        result.totalPoints += 1;
        result.totalDraws += 1;
      } else if (item.homeTeamGoals < item.awayTeamGoals) {
        result.totalPoints += 0;
        result.totalLosses += 1;
      }
    });
    return result;
  }

  static scoreTotalAway(match: Match[]) {
    const result = {
      totalPoints: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0 };
    match.forEach((item) => {
      if (item.homeTeamGoals < item.awayTeamGoals) {
        result.totalPoints += 3;
        result.totalVictories += 1;
      } else if (item.homeTeamGoals === item.awayTeamGoals) {
        result.totalPoints += 1;
        result.totalDraws += 1;
      } else if (item.homeTeamGoals > item.awayTeamGoals) {
        result.totalPoints += 0;
        result.totalLosses += 1;
      }
    });
    return result;
  }

  static totalGoalsHome(match: Match[]) {
    const result = {
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
    };
    match.forEach((item) => {
      result.goalsFavor += item.homeTeamGoals;
      result.goalsOwn += item.awayTeamGoals;
    });
    result.goalsBalance = result.goalsFavor - result.goalsOwn;

    return result;
  }

  static totalGoalsAway(match: Match[]) {
    const result = {
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
    };
    match.forEach((item) => {
      result.goalsFavor += item.awayTeamGoals;
      result.goalsOwn += item.homeTeamGoals;
    });
    result.goalsBalance = result.goalsFavor - result.goalsOwn;

    return result;
  }

  static efficiency(P: number, J: number): number {
    return Number(((P / (J * 3)) * 100).toFixed(2));
  }

  static order(data: ILeaderboard[]) {
    const order = data.sort((first, second) =>
      second.totalPoints - first.totalPoints
    || second.totalVictories - first.totalVictories
    || second.goalsBalance - first.goalsBalance
    || second.goalsFavor - first.goalsFavor
    || second.goalsOwn - first.goalsFavor);
    return order;
  }
}
