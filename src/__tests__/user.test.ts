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


    it('should be create a new user', async () => {

        const newUser = {
            email: 'user@test.com',
            name: 'test'
        };

        const response = await request(app).post('/users')
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining({
            ...newUser,
            id: expect.any(String)
        }));
        expect(response.body).toHaveProperty('id');
    });

    it('should return an error when creating an existing user', async () => {
        const alreadyExistsUser = {
            email: 'user@test.com',
            name: 'test'
        };

        const response = await request(app).post('/users')
            .send(alreadyExistsUser)

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: `User ${alreadyExistsUser.email} already exists`
        });
    });
})