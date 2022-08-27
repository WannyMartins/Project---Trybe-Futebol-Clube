export default interface ILeaderboard extends ILeader{
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
}

export interface ILeader {

  name: string,
  totalPoints: number,
  totalGames: number,

}
