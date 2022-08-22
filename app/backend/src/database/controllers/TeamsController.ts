import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private _team: TeamService) { }

  async getAll(req: Request, res: Response) {
    const teams = await this._team.getAll();

    return res.status(200).json(teams);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      const e = new Error('Bad Request');
      e.name = 'InvalidData';
      throw e;
    }
    const team = await this._team.getById(Number(id));

    return res.status(200).json(team);
  }
}
