const userRoutes = require("../../routes/user.routes")
const request = require('supertest');
const mongoose = require('mongoose');

const {app, server} = require('../../server'); 


async function closeDatabase() {
  await mongoose.connection.close();
}


const closeServerAndDatabase = async () => {
  await server.close();
  await closeDatabase();
};


describe('GET / logout', () => {
  it('It should delete the "token" cookie and respond with status 204', async () => {
    const response = await request(app).get('/api/v1/user/logout');
    expect(response.status).toBe(204);
  });

  afterAll(async () => {
    await closeServerAndDatabase();
  });
});



