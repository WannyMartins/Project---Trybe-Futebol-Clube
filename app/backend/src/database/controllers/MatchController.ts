import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private _match: MatchService) { }

  async getAll(req: Request, res: Response) {
    const matches = await this._match.getAll();

    return res.status(200).json(matches);
  }
}
