export interface IMatchPost {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;

}

export default interface IMatch extends IMatchPost {
  id: number;
  inProgress: boolean;
}
