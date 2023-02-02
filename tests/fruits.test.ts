import httpStatus from 'http-status';
import app from 'index';
import supertest from 'supertest';
import { FruitInput } from '../src/services/fruits-service';

describe('tests about fruits api', () => {
  it('should return status 200 if successful and the body', async () => {
    const response = await supertest(app).get('/fruits');
    expect(response.status).toBe(httpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return status 404 if it does not find the fruit', async () => {
    const response = await supertest(app).get('/fruits/jagaiugahiugh');
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  const newFruit: FruitInput = {
    name: 'strawberry',
    price: 1500,
  };
  it('should return status 422 when body is invalid', async () => {
    const response = await supertest(app).post('/fruits/').send(newFruit.name);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('should return status 201 when body is valid', async () => {
    const response = await supertest(app).post('/fruits/').send(newFruit);
    expect(response.status).toBe(httpStatus.CREATED);
  });

  it('should return status 409 when fruit already exist', async () => {
    const response = await supertest(app).post('/fruits/').send(newFruit);
    expect(response.status).toBe(httpStatus.CONFLICT);
  });
});
