import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const matchService = new MatchService();
const matchController = new MatchController(matchService);

const matchRoute = Router();

matchRoute.get('/matches', (req, res) => matchController.getAll(req, res));
matchRoute.patch('/matches/:id/finish', (req, res) => matchController.finish(req, res));
matchRoute.post('/matches', (req, res) => matchController.create(req, res));

export default matchRoute;
