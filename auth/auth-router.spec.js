const request = require('supertest');

const db = require('../database/dbConfig');

const server = require('../api/server');

process.on('uncaughtException', function (err) {
    console.log(err);
}); 
describe('POST /auth/register/organization', function () {
    beforeEach(async () => {
        await db('org').truncate(); 
    });
    it('should return 201 when registered', async () => {
        const auth = await request(server)

        .post('/auth/register/organization')
        .send({
            username: 'hello44',
      password: 'goodbye',
      email: 'tester@yahoo.com',
      phoneNumber: '123-4578',
      streetAddress: '123 Tester',
      state: 'Nowhere',
      zipcode: '12345',
      organizationName: 'Tester',
      contactPerson: 'Fake Person',
      role: 'organization'
        })
        
        expect(auth.status).toBe(201)
    });

    it('should return 201 when registered', async () => {
        const auth = await request(server)

        .post('/auth/register/organization')
        .send({
            username: 'hello44',
      password: 'goodbye',
      email: 'tester@yahoo.com',
      phoneNumber: '123-4578',
      streetAddress: '123 Tester',
      state: 'Nowhere',
      zipcode: '12345',
      organizationName: 'Tester',
      contactPerson: 'Fake Person',
      role: 'organization'
        })
        
        expect(auth.type).toMatch(/json/i) 
    })
})