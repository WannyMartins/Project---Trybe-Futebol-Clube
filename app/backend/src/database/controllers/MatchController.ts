import { Request, Response } from 'express';
import { IMatchPost } from '../interfaces/IMatches';
import User from '../models/UsersModel';
import MatchService from '../services/MatchService';
import AuthJwt from '../utils/AuthJwt';

export default class MatchController {
  constructor(private _match: MatchService) { }

  async getAllMatch(req: Request, res: Response) {
    const { inProgress } = req.query;
    const { authorization } = req.headers;
    if (!authorization) {
      const e = new Error('Unauthorized');
      e.name = 'ValidationError';
      throw e;
    }

    const inProgressTrue: boolean = inProgress === 'true';
    if (!inProgress) {
      const matches = await this._match.getAllMatch();
      return res.status(200).json(matches);
    }
    const matches = await this._match.filterInProgress(inProgressTrue);
    return res.status(200).json(matches);
  }

  async create(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      const e = new Error('Unauthorized');
      e.name = 'ValidationError';
      throw e;
    }
    const email = AuthJwt.verify(authorization as string);
    const valid = await User.findOne({ where: { email } });

    if (!valid) {
      const e = new Error('Token must be a valid token');
      e.name = 'ValidationError';
      throw e;
    }

    const matches = await this._match.create(req.body as IMatchPost);
    return res.status(201).json(matches);
  }

  async finish(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { id } = req.params;

    const validUser = AuthJwt.verify(authorization as string);
    if (!authorization || validUser === null) {
      const e = new Error('Unauthorized');
      e.name = 'ValidationError';
      throw e;
    }

    await this._match.finish(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  async updateGoals(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { id } = req.params;

    const validUser = AuthJwt.verify(authorization as string);
    if (!authorization || validUser === null) {
      const e = new Error('Unauthorized');
      e.name = 'ValidationError';
      throw e;
    }

    await this._match.updateGoals(Number(id), req.body);
    return res.status(200).json({ message: 'Update Goals!' });
  }
}
