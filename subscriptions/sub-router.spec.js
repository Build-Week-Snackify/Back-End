const request = require('supertest');

const db = require('../database/dbConfig');

const server = require('../api/server');



describe('GET /subs', function() {

    it('should require authorization before continuing', function () {
        return request(server)
        .get('/subs')
        .then(res => {
            expect(res.status).toBe(401);
        })
    });

    it('should return a json response', function () {
        return request(server)
        .get('/subs')
        .then(res => {
            expect(res.type).toMatch(/json/i) 
        })
    });
});