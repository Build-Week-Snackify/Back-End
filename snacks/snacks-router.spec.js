const request = require('supertest');

const db = require('../database/dbConfig');

const server = require('../api/server');


process.on('uncaughtException', function (err) {
    console.log(err);
}); 

describe('GET /snacks', function() {

    it('should require authorization before continuing', function () {
        return request(server)
        .get('/snacks')
        .then(res => {
            expect(res.status).toBe(401);
        })
    });

    it('should return a json response', function () {
        return request(server)
        .get('/snacks')
        .then(res => {
            expect(res.type).toMatch(/json/i) 
        })
    });
});