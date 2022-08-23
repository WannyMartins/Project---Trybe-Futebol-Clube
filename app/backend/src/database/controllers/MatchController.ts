import { Request, Response } from 'express';
import { IMatchPost } from '../interfaces/IMatches';
import MatchService from '../services/MatchService';
import AuthJwt from '../utils/AuthJwt';

export default class MatchController {
  constructor(private _match: MatchService) { }

  async getAll(req: Request, res: Response) {
    const matches = await this._match.getAll();
    return res.status(200).json(matches);
  }

  async filterInProgress(req: Request, res: Response) {
    const { inProgress } = req.query;
    const inProgressTrue: boolean = inProgress === 'true';
    const matches = await this._match.filterInProgress(inProgressTrue);
    return res.status(200).json(matches);
  }

  async create(req: Request, res: Response) {
    const { authorization } = req.headers;

    const validUser = AuthJwt.verify(authorization as string);
    if (!authorization || validUser === null) {
      const e = new Error('Unauthorized');
      e.name = 'ValidationError';
      throw e;
    }

    const matches = await this._match.create(req.body as IMatchPost);
    return res.status(201).json(matches);
  }
}
