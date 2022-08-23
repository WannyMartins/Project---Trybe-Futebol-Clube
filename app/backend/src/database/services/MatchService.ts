import IMatch, { IMatchPost } from '../interfaces/IMatches';
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

  async getById(id: number): Promise<IMatch> {
    const match = await this._match.findByPk(Number(id));
    if (!match) {
      const e = new Error('There is no team with such id!');
      e.name = 'NotFound';
      throw e;
    }

    return match as IMatch;
  }

  async create(data: IMatchPost): Promise<IMatch> {
    const { homeTeam, awayTeam } = data;

    await this.getById(Number(homeTeam));
    await this.getById(Number(awayTeam));

    const match = await this._match.create({ ...data, inProgress: true });
    return match as IMatch;
  }
}
