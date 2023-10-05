const request = require('supertest');
const app = require('../server'); 

describe('/healthz endpoint', () => {
    it('should return a 200 OK status', async () => {
        const response = await request(app).get('/healthz');
        expect(response.statusCode).toBe(200);
    });
});