const request = require('supertest');
const { User } = require('../models');
let server;

describe('/api/auth', () => {
  beforeEach(() => { server = require('../server'); });
  afterEach(async () => { 
    await server.close();
    await User.destroy({ where: {} });
  });

  describe('POST /', () => {
    let email;
    let password;
    let user;

    const exec = async () => {
      return await request(server)
        .post('/api/auth')
        .send({ email, password });
    };

    beforeEach(async () => {
      email = 'test@test.com';
      password = '12345';
      user = await User.create({ name: 'test', email, password });
    });

    it('should return 400 if email is invalid', async () => {
      email = 'invalid';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if password is invalid', async () => {
      password = 'wrongpassword';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 200 and a valid JWT if credentials are valid', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
  });
});
