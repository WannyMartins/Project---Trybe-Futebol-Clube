import * as express from 'express';
import 'express-async-errors';
import error from './database/middlewares/error';
import learderRoute from './database/routes/RouteLeaderboard';
import loginRoute from './database/routes/RouteLogin';
import matchRoute from './database/routes/RouteMatche';
import teamRoute from './database/routes/RouteTeam';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(loginRoute);
    this.app.use(teamRoute);
    this.app.use(matchRoute);
    this.app.use(learderRoute);
    this.app.use(error);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
