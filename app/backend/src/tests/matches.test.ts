import * as chai from 'chai';
import * as Sinon from 'sinon';
import { app } from '../app';
 // @ts-ignore
import chaiHttp = require('chai-http');

const {expect} = chai;

chai.use(chaiHttp);

import { Response } from 'superagent';
import Match from '../database/models/MatchesModels';
import MatchService from '../database/services/MatchService';
import { dataMatchCreatedMock, inProgressFalseMock, inProgressTrueMock, matchCreatedMock, matchesMock } from './mocks/mockMatches';
import AuthJwt from '../database/utils/AuthJwt';
import { userLoginMock, userTokenMock } from './mocks/mockUsers';



describe('Matches', () => {
  describe('getAll', () => {
    describe('Quando dá certo', () => {

      let chaiHttpResponse: Response;


      it('estando correto retorna status code 200 e a lista de partidas no bd', async () =>{

        Sinon.stub(Match, 'findAll')
        .resolves(matchesMock as unknown as Match[])

          chaiHttpResponse = await chai.request(app)
          .get('/matches')

          expect(chaiHttpResponse.status).to.equal(200)
          expect(chaiHttpResponse.body).to.deep.equal(matchesMock)

          Sinon.restore()
      })
    })
    
  })

  describe('filterInProgress', () => {
    describe('Quando dá certo', () => {

      let chaiHttpResponse: Response;
      it('estando correto retorna status code 200 e a lista de partidas em andamento no bd', async () =>{

        Sinon.stub(Match, 'findAll')
        .resolves(inProgressTrueMock as unknown as Match[])

          chaiHttpResponse = await chai.request(app)
          .get('/matches?inProgress=true')

          expect(chaiHttpResponse.status).to.equal(200)
          expect(chaiHttpResponse.body).to.deep.equal(inProgressTrueMock)
          Sinon.restore();

        })

        it('estando correto retorna status code 200 e a lista de partidas em finalizadas no bd', async () =>{

          Sinon.stub(Match, 'findAll')
          .resolves(inProgressFalseMock as unknown as Match[])
  
            chaiHttpResponse = await chai.request(app)
            .get('/matches?inProgress=false')
  
            expect(chaiHttpResponse.status).to.equal(200)
            expect(chaiHttpResponse.body).to.deep.equal(inProgressFalseMock)
            Sinon.restore();
  
          })
  
    })
    
  })

  describe('create', () => {
    describe('Quando dá certo', () => {

      let chaiHttpResponse: Response;
      it('estando correto retorna status code 201 e os dados atualizados no db corretamente', async () =>{


        Sinon.stub(Match, 'create')
        .resolves(matchCreatedMock as unknown as Match)



          chaiHttpResponse = await chai.request(app)
          .post('/matches')
          .set({"Authorization": userTokenMock})
          .send(dataMatchCreatedMock)


          expect(chaiHttpResponse.status).to.equal(201)
          expect(chaiHttpResponse.body)
          .to.deep.equal(matchCreatedMock)
          Sinon.restore();

        })

        describe('Quando dá errado', () => {

          let chaiHttpResponse: Response;
          it('estando quando o token passado é inválido ou não existe', async () =>{
    
    
            Sinon.stub(Match, 'create').resolves(undefined)
            Sinon.stub(AuthJwt, 'verify').returns(null)
              chaiHttpResponse = await chai.request(app)
              .post('/matches')
              .set({"Authorization": 'tokenfake'})
              .send(dataMatchCreatedMock)
    
    
              expect(chaiHttpResponse.status).to.equal(401)
              expect(chaiHttpResponse.body).to.deep.equal({ message: 'Unauthorized' } )
              Sinon.restore();
    
            })
          })

    })
    
  })


})

