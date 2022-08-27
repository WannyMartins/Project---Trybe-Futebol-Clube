import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private _leader: LeaderboardService) { }

  async tableHome(req: Request, res: Response) {
    const classification = await this._leader.classificationTableHome();

    return res.status(200).json(classification);
  }

  async tableAway(req: Request, res: Response) {
    const classification = await this._leader.classificationTableAway();

    return res.status(200).json(classification);
  }

  async table(req: Request, res: Response) {
    const classification = await this._leader.classificationTable();

    return res.status(200).json(classification);
  }
}
