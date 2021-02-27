import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database'

describe('User', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const conn = getConnection();
        await conn.dropDatabase();
        await conn.close();
    });

    it('should be create a new survey', async () => {

        const newSurvey = {
            title: 'test title',
            description: 'test description'
        };

        const response = await request(app).post('/surveys')
            .send(newSurvey);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining({
            ...newSurvey,
            id: expect.any(String)
        }));
    });

    it('should be return a list of surveys', async () => {

        const response = await request(app).get('/surveys');

        expect(response.body instanceof Array).toBeTruthy();
    });
})