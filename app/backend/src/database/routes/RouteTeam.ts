import { Router } from 'express';
import TeamController from '../controllers/TeamsController';
import TeamService from '../services/TeamService';

const teamService = new TeamService();
const teamController = new TeamController(teamService);

const teamRoute = Router();
teamRoute.get('/teams/:id', (req, res) => teamController.getById(req, res));
teamRoute.get('/teams', (req, res) => teamController.getAll(req, res));

export default teamRoute;
