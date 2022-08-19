import * as chai from 'chai';
import * as Sinon from 'sinon';
import { app } from '../app';
import ILogin from '../database/interfaces/ILogin';
import UsersModel from '../database/models/UsersModel';
 // @ts-ignore
import chaiHttp = require('chai-http');

const {expect} = chai;

chai.use(chaiHttp);

import { Response } from 'superagent';
import { log } from 'console';

const userMock = {
  "username": "User",
  "role": "user",
  "email": "user@user.com",
  "password": "$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO"
}

const userLoginMock: ILogin = {
  email: 'user@user.com',
  password: 'secret_user'
}

describe('Users', () => {
  describe('Login', () => {
    describe('Quando dá certo', () => {

      let chaiHttpResponse: Response;
      beforeEach(() => {
        Sinon.stub(UsersModel, 'findOne').resolves({...userMock} as UsersModel)
      })


      afterEach(() => {
        (UsersModel.findOne as sinon.SinonStub).restore();
      })
      it('estando correto retorna status code 200', async () =>{
          chaiHttpResponse = await chai.request(app)
          .post('/login').send(userLoginMock)

          expect(chaiHttpResponse.status).to.equal(200)

      })

      it('estando correto retorna o token', async () =>{
        chaiHttpResponse = await chai.request(app)
        .post('/login').send(userLoginMock)

        expect(chaiHttpResponse.body).to.haveOwnProperty('token')
      })
    })

    describe('Quando não dá certo', () => {

      let chaiHttpResponse: Response;

      it('estando sem email', async () =>{
        
          Sinon.stub(UsersModel, 'findOne').resolves({...userMock} as UsersModel)
  
          chaiHttpResponse = await chai.request(app)
          .post('/login').send({"password": "123456"})
          
   
          expect(chaiHttpResponse.status).to.equal(400)
          expect(chaiHttpResponse.body).to.haveOwnProperty('message')
          expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' })

          Sinon.restore();
        })


      it('não passando dados', async () =>{

        Sinon.stub(UsersModel, 'findOne').resolves({...userMock} as UsersModel)
  
        chaiHttpResponse = await chai.request(app)
        .post('/login').send()
      
        expect(chaiHttpResponse.status).to.equal(400)
        expect(chaiHttpResponse.body).to.haveOwnProperty('message')
        expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
        Sinon.restore();

  
    })

    it('passando senha errada', async () =>{
        Sinon.stub(UsersModel, 'findOne').resolves({...userMock} as UsersModel)

      chaiHttpResponse = await chai.request(app)
      .post('/login').send({"email": "user@user.com", "password": "123456"})
      
      expect(chaiHttpResponse.status).to.equal(400)
      expect(chaiHttpResponse.body).to.haveOwnProperty('message')
      expect(chaiHttpResponse.body).to.deep.equal({ message: 'Dados Inválidos' })
      Sinon.restore();


  })

  it('passando email errado', async () =>{
      Sinon.stub(UsersModel, 'findOne').resolves()

    chaiHttpResponse = await chai.request(app)
    .post('/login').send({"email": "@user.com", "password": "123456"})
    
    expect(chaiHttpResponse.status).to.equal(401)
    expect(chaiHttpResponse.body).to.haveOwnProperty('message')
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' })
    Sinon.restore();

})


it('testando status 500', async () =>{
  Sinon.stub(UsersModel, 'findAll').resolves([])

chaiHttpResponse = await chai.request(app)
.post('/login').send(userLoginMock)


expect(chaiHttpResponse.status).to.equal(500)
Sinon.restore();

})



  })

  })

})