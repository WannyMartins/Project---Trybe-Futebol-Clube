import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';

const leaderService = new LeaderboardService();
const leaderController = new LeaderboardController(leaderService);

const leaderRoute = Router();
leaderRoute.get('/leaderboard/home', (req, res) => leaderController.tableHome(req, res));

leaderRoute.get('/leaderboard/away', (req, res) => leaderController.tableAway(req, res));
leaderRoute.get('/leaderboard', (req, res) => leaderController.table(req, res));

export default leaderRoute;
