import * as request from 'supertest';
import { INestApplication } from "@nestjs/common"

const app: INestApplication = global.app;

describe('Hello', () => {
    
    it('GET /rest-api/hello', () => {
        return request(app.getHttpServer())
            .get('/rest-api/hello')
            .expect(200)
            .expect('Hello from comp-4350 team 8 updated!');
    });   
})