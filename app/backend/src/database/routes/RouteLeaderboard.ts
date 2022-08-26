import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';
import MatchService from '../services/MatchService';
import TeamService from '../services/TeamService';

const matchService = new MatchService();
const teamService = new TeamService();
const leaderService = new LeaderboardService(matchService, teamService);
const leaderController = new LeaderboardController(leaderService, teamService);

const leaderRoute = Router();
leaderRoute.get('/leaderboard/home', (req, res) => leaderController.table(req, res));

export default leaderRoute;
