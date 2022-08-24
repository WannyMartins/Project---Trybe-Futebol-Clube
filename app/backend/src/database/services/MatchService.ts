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
    if (match === null) {
      const e = new Error('There is no match with such id!');
      e.name = 'NotFound';
      throw e;
    }
    return match;
  }

  async create(data: IMatchPost): Promise<IMatch> {
    // const { homeTeam, awayTeam } = data;

    // await this.getById(homeTeam);
    // await this.getById(awayTeam);

    const match: IMatch = await this._match.create({ ...data, inProgress: true });
    return match;
  }

  async finish(id: number): Promise<void> {
    const existeMatchId = await this.getById(id);

    if (!existeMatchId) {
      const e = new Error('There is no match with such id!');
      e.name = 'NotFound';
      throw e;
    }

    await this._match.update(
      { inProgress: false },
      { where: { id } },
    );
  }
}
