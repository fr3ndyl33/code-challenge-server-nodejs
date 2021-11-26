const app = require('./app');
const request = require('supertest');
const {response} = require("express");

jest.setTimeout(15000);

afterEach(() => {
    jest.useRealTimers();
});

describe('SERVER', () => {
    it('GET / --> 404 no route provided', function(done) {
       request(app)
           .get('/')
           .expect(404, done);
    });
})

describe('Temperature API', () => {
   it('GET /temperature --> array of product object with temperature', () => {
      jest.useFakeTimers('legacy');
      request(app)
          .get('/temperature')
          .expect('Content-type', /json/)
          .expect(200)
          .then((response) => {
              expect(response.body).toEqual(
                  expect.arrayContaining([
                      expect.objectContaining({
                          id: expect.any(String),
                          name: expect.any(String),
                          minimumTemperature: expect.any(Number),
                          maximumTemperature: expect.any(Number),
                          temperature: expect.any(Number)
                      })
                  ])
              )
          })
   });
    it('GET /temperature?limit=1 --> array of product object with temperature with only 1 result', () => {
        jest.useFakeTimers('legacy');
        request(app)
            .get('/temperature')
            .query({ limit: 1 })
            .expect('Content-type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(String),
                            name: expect.any(String),
                            minimumTemperature: expect.any(Number),
                            maximumTemperature: expect.any(Number),
                            temperature: expect.any(Number)
                        })
                    ])
                );
                expect(response.body.length).toEqual(1);
            })
    });
   it('GET /temperature/:id --> temperature object by ID', () => {
       jest.useFakeTimers('legacy');
       const id = '1';
       request(app)
           .get('/temperature/' + id)
           .expect('Content-type', /json/)
           .expect(200)
           .then((response) => {
               expect(response.body).toEqual(
                   expect.objectContaining({
                       id: expect.stringContaining(id),
                       temperature: expect.any(Number),
                       name: expect.any(String),
                       minimumTemperature: expect.any(Number),
                       maximumTemperature: expect.any(Number),
                   })
               )
           });

   });
    it('GET /temperature/:id --> 404 product temperature not found', () => {
        return request(app)
            .get('/temperature/9999')
            .expect(404)
    })
});

describe('Product API', () => {
    it('GET /product --> array of products', () => {
        return request(app)
            .get('/product')
            .expect('Content-type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(String),
                            name: expect.any(String),
                            minimumTemperature: expect.any(Number),
                            maximumTemperature: expect.any(Number)
                        })
                    ])
                )
            })
    })
    it('GET /product?limit=1 --> array of products only 1 result', () => {
        return request(app)
            .get('/product')
            .query({limit: 1})
            .expect('Content-type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(String),
                            name: expect.any(String),
                            minimumTemperature: expect.any(Number),
                            maximumTemperature: expect.any(Number)
                        })
                    ])
                );
                expect(response.body.length).toEqual(1);
            })
    })
    it('GET /product/:id --> product object', () => {
        return request(app)
            .get('/product/1')
            .expect('Content-type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: expect.any(String),
                        name: expect.any(String),
                        minimumTemperature: expect.any(Number),
                        maximumTemperature: expect.any(Number)
                    })
                )
            })
    })
    it('GET /product/:id --> 404 product not found', () => {
        return request(app)
            .get('/product/9999')
            .expect(404)
    })
})
