import IMatch from '../interfaces/IMatches';
import Match from '../models/MatchesModels';
import Team from '../models/TeamsModel';

export default class MatchService {
  private _match = Match;
  async getAll(): Promise<IMatch[]> {
    const match = await this._match.findAll({
      include: [{
        model: Team, as: 'teamHome', attributes: ['teamName'],
      }, {
        model: Team, as: 'teamAway', attributes: ['teamName'],
      }],
    });
    return match as IMatch[];
  }

  async filterInProgress(inProgress: boolean): Promise<IMatch[]> {
    const match = await this._match.findAll({
      include: [{
        model: Team, as: 'teamHome', attributes: ['teamName'],
      }, {
        model: Team, as: 'teamAway', attributes: ['teamName'],
      }],
      where: { inProgress },
    });

    return match as IMatch[];
  }
}
