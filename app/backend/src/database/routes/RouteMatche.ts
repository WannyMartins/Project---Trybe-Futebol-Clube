import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const matchService = new MatchService();
const matchController = new MatchController(matchService);

const matchRoute = Router();
matchRoute.get('/matches', (req, res) => matchController.filterInProgress(req, res));
matchRoute.get('/matches', (req, res) => matchController.getAll(req, res));

export default matchRoute;
