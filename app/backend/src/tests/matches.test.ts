import * as chai from 'chai';
import * as Sinon from 'sinon';
import { app } from '../app';
 // @ts-ignore
import chaiHttp = require('chai-http');

const {expect} = chai;

chai.use(chaiHttp);

import { Response } from 'superagent';
import Match from '../database/models/MatchesModels';
import { inProgressMatchesMock, matchesMock } from './mocks/mockMatches';



describe('Matches', () => {
  describe('getAll', () => {
    describe('Quando dá certo', () => {

      let chaiHttpResponse: Response;
      beforeEach(() => {
      })


      afterEach(() => {
        (Match.findAll as sinon.SinonStub).restore();
      })
      it('estando correto retorna status code 200 e a lista de partidas no bd', async () =>{

        Sinon.stub(Match, 'findAll').resolves(matchesMock as unknown as Match[])

          chaiHttpResponse = await chai.request(app)
          .get('/matches')

          expect(chaiHttpResponse.status).to.equal(200)
          expect(chaiHttpResponse.body).to.deep.equal(matchesMock)
      })
    })
    
  })

  describe('filterInProgress', () => {
    describe('Quando dá certo', () => {

      let chaiHttpResponse: Response;
      beforeEach(() => {
        Sinon.stub(Match, 'findAll').resolves(inProgressMatchesMock as unknown as Match[])
      })


      afterEach(() => {
        (Match.findAll as sinon.SinonStub).restore();
      })
      it('estando correto retorna status code 200 e a lista de partidas no bd', async () =>{
          chaiHttpResponse = await chai.request(app)
          .get('/matches?inProgress=true')

          expect(chaiHttpResponse.status).to.equal(200)
          expect(chaiHttpResponse.body).to.deep.equal(inProgressMatchesMock)
      })
    })
    
  })



})

