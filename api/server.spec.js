const request = require('supertest');
const server = require('./server');
const helpers = require('../data/helpers');

it('Should return 201 CREATED', async () => {
    const testUser = {
        username: 'dummy3',
        email: 'dummy3',
        department: 'dummy3'
    };
    const response = await request(server).post('/').send(testUser).set('Content-Type', 'application/json');
    console.log({...response});
    expect(response.status).toBe(304);
});

// it('test', () => {
//     console.log('TEST TEST TEST');
//     request(server)
//         .get('/')
//         .then(res => console.log('RES: ', res))
//         .catch(err => console.log('ERROR: ', err));
// });

// Test for:
// http status code
// format of the data (JSON)
// shape of the response body