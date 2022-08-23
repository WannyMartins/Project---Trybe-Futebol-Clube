import * as chai from 'chai';
import * as Sinon from 'sinon';
import { app } from '../app';
 // @ts-ignore
import chaiHttp = require('chai-http');

const {expect} = chai;

chai.use(chaiHttp);

import { Response } from 'superagent';
import matchesMock from './mocks/mockMatches'
import Match from '../database/models/MatchesModels';



describe('Matches', () => {
  describe('getAll', () => {
    describe('Quando dá certo', () => {

      let chaiHttpResponse: Response;
      beforeEach(() => {
        Sinon.stub(Match, 'findAll').resolves(matchesMock as unknown as Match[])
      })


      afterEach(() => {
        (Match.findAll as sinon.SinonStub).restore();
      })
      it('estando correto retorna status code 200 e a lista de partidas no bd', async () =>{
          chaiHttpResponse = await chai.request(app)
          .get('/matches')

          expect(chaiHttpResponse.status).to.equal(200)
          expect(chaiHttpResponse.body).to.deep.equal(matchesMock)
      })
    })
  })


})

