import ITeams from '../interfaces/ITeams';
import Team from '../models/TeamsModel';

export default class TeamService {
  private _team = Team;

  async getAll(): Promise<Array<ITeams>> {
    const teams = await this._team.findAll();

    if (!teams) {
      const e = new Error('Not Found');
      e.name = 'NotFound';
      throw e;
    }

    return teams;
  }

  async getById(id: number): Promise<ITeams> {
    const team = await this._team.findByPk(id);

    if (team === null) {
      const e = new Error('There is no team with such id!');
      e.name = 'NotFound';
      throw e;
    }

    return team;
  }
}
