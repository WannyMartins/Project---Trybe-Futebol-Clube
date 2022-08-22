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
}
