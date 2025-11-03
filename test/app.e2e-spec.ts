import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  // DB가 계속 동일했으면 좋겠어
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // e2e 환경도 실제 main.ts 처럼 동일하게 Pipe를 적용해야한다
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my movie api.');
  });

  describe('/movies', () => {
    it('(GET)', () =>
      request(app.getHttpServer()).get('/movies').expect(200).expect([]));

    it('(POST)', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Movie',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });

    it('(POST) 404', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Movie',
          year: 2000,
          genres: ['test'],
          extra: 'extra test',
        })
        .expect(400);
    });

    it('(DELETE)', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('(GET)', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });

    it('(GET) 404', () => {
      return request(app.getHttpServer()).get('/movies/111').expect(404);
    });

    it('(PATCH)', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Patch Test' })
        .expect(200);
    });

    it('(DELETE)', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
  });
});
