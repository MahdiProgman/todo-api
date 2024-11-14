import request from 'supertest';
import api from './../../app/api';

describe('test home route', () => {
  it('should be send 200', async () => {
    const { statusCode } = await request(api).get('/');

    expect(statusCode).toEqual(200);
  });
});
