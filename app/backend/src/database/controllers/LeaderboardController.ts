import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import TeamService from '../services/TeamService';

export default class LeaderboardController {
  constructor(private _leader: LeaderboardService, private _team: TeamService) { }

  async table(req: Request, res: Response) {
    const teams = await this._team.getAll();

    const result = teams.forEach(async (t) => {
      await this._leader.totalGames(t.id);
      await this._leader.totalPoints(t.id);
    });

    return res.status(200).json({ result });
  }
}
