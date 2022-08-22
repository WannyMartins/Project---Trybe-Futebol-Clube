import IMatch from '../interfaces/IMatches';
import Match from '../models/MatchesModels';

export default class MatchService {
  private _match = Match;
  async getAll(): Promise<IMatch[]> {
    const match = await this._match.findAll();
    return match as IMatch[];
  }
}
