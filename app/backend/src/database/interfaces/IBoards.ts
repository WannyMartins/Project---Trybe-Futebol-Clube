import Match from '../models/MatchesModels';

export interface IBoard{
  id: number,
  teamName: string,
  matches: Match[],
}

export default interface IBoardFilter{
  id: number,
  teamName: string,
  matchesHome: Match[],
  matchesAway: Match[],
}
