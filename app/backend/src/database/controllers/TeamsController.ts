import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private _team: TeamService) { }

  async getAll(req: Request, res: Response) {
    const teams = await this._team.getAll();

    return res.status(200).json(teams);
  }
}
