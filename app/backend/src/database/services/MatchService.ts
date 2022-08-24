import IMatch, { IMatchPost } from '../interfaces/IMatches';
import Match from '../models/MatchesModels';
import Team from '../models/TeamsModel';
import TeamService from './TeamService';

export default class MatchService {
  private _match = Match;
  private _teamService: TeamService;
  async getAllMatch(): Promise<IMatch[]> {
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
    const { homeTeam, awayTeam } = data;

    const timeCasa = await Team.findByPk(homeTeam);
    const timeFora = await Team.findByPk(awayTeam);

    if (timeCasa === null || timeFora === null) {
      const e = new Error('There is no team with such id!');
      e.name = 'NotFound';
      throw e;
    }

    if (homeTeam === awayTeam) {
      const e = new Error('It is not possible to create a match with two equal teams');
      e.name = 'ValidationError';
      throw e;
    }

    const match: IMatch = await this._match.create({ ...data, inProgress: true });
    return match;
  }

  async finish(id: number): Promise<void> {
    await this.getById(id);

    await this._match.update(
      { inProgress: false },
      { where: { id } },
    );
  }
}
