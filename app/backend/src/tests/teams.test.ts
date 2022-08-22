import * as chai from 'chai';
import * as Sinon from 'sinon';
import { app } from '../app';
 // @ts-ignore
import chaiHttp = require('chai-http');

const {expect} = chai;

chai.use(chaiHttp);

import { Response } from 'superagent';
import Team from '../database/models/TeamsModel';


const teamsMock = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  }
]

const teamMockId = {
  "id": 3,
  "teamName": "Botafogo"
}


describe('Teams', () => {
  describe('getAll', () => {
    describe('Quando dá certo', () => {

      let chaiHttpResponse: Response;
      beforeEach(() => {
        Sinon.stub(Team, 'findAll').resolves(teamsMock as Team[])
      })


      afterEach(() => {
        (Team.findAll as sinon.SinonStub).restore();
      })
      it('estando correto retorna status code 200 e a lista de teams no bd', async () =>{
          chaiHttpResponse = await chai.request(app)
          .get('/teams')

          expect(chaiHttpResponse.status).to.equal(200)
          expect(chaiHttpResponse.body).to.deep.equal(teamsMock)
      })
    })


    describe('Quando não tem dados no bd retorna a mensagem "Not Found"', () => {

      let chaiHttpResponse: Response;

      beforeEach(() => {
        Sinon.stub(Team, 'findAll').resolves(undefined)
      })


      afterEach(() => {
        (Team.findAll as sinon.SinonStub).restore();
      })


      it('retorna NotFound', async () =>{
          chaiHttpResponse = await chai.request(app)
          .get('/teams')

          expect(chaiHttpResponse.status).to.equal(404)
          expect(chaiHttpResponse.body).to.haveOwnProperty('message')
          expect(chaiHttpResponse.body).to.deep.equal({ message: 'Not Found' })
        })

  })

  })

  describe('getById', () => {
    describe('Quando dá certo', () => {

      let chaiHttpResponse: Response;
      beforeEach(() => {
        Sinon.stub(Team, 'findByPk').resolves(teamMockId as Team)
      })


      afterEach(() => {
        (Team.findByPk as sinon.SinonStub).restore();
      })
      it('estando correto retorna status code 200 e o time com id correspondente ao parametro', async () =>{
          chaiHttpResponse = await chai.request(app)
          .get('/teams/3')

          expect(chaiHttpResponse.status).to.equal(200)
          expect(chaiHttpResponse.body).to.deep.equal(teamMockId)
      })

    })


    describe('Quando não tem dados no bd retorna a mensagem "Not Found"', () => {

      let chaiHttpResponse: Response;

      beforeEach(() => {
        Sinon.stub(Team, 'findByPk').resolves(null)
      })


      afterEach(() => {
        (Team.findByPk as sinon.SinonStub).restore();
      })


      it('retorna NotFound', async () =>{
        it('o parametro passado não corresponde ao um time do bd', async () =>{
       
          chaiHttpResponse = await chai.request(app)
          .get('/teams/1000')
  
          console.log(chaiHttpResponse.body)
          expect(chaiHttpResponse.status).to.equal(404)
          expect(chaiHttpResponse.body).to.deep.equal('Not Found')
      })
  
  })
})
})




})