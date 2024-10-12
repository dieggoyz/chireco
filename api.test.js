const request = require('supertest');
const app = require('./index');

describe('GET /api', () => {
  it('should return all regions', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('regions');
    expect(res.body.regions.length).toBeGreaterThan(0);
  });
});

describe('GET /api/:id', () => {
  it('should return communes of a specific region', async () => {
    const res = await request(app).get('/api/i');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([
      "Alto Hospicio",
      "Iquique",
      "Camiña",
      "Colchane",
      "Huara",
      "Pica",
      "Pozo Almonte",
    ]);
  });

  it('should return 404 for a non-existent region', async () => {
    const res = await request(app).get('/api/nonexistent');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'Region not found');
  });
});
