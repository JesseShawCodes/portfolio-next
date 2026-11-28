/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { GET } from '../route';

global.fetch = jest.fn();

function createRequest(urlParam) {
  const search = urlParam == null ? '' : `?url=${encodeURIComponent(urlParam)}`;
  return new NextRequest(`http://localhost/api/github${search}`);
}

describe('GET /api/github', () => {
  const originalToken = process.env.GITHUB_TOKEN;

  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.GITHUB_TOKEN;
  });

  afterAll(() => {
    process.env.GITHUB_TOKEN = originalToken;
  });

  it('rejects missing or non-GitHub URLs', async () => {
    const missing = await GET(createRequest(null));
    expect(missing.status).toBe(400);

    const invalid = await GET(createRequest('https://evil.example/repos'));
    expect(invalid.status).toBe(400);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('proxies GitHub responses and omits Authorization without a token', async () => {
    const payload = [{ id: 1 }];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => payload,
    });

    const githubUrl = 'https://api.github.com/users/test/repos';
    const response = await GET(createRequest(githubUrl));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(payload);
    expect(global.fetch).toHaveBeenCalledWith(
      githubUrl,
      expect.objectContaining({
        headers: expect.not.objectContaining({
          Authorization: expect.anything(),
        }),
      })
    );
  });

  it('includes Authorization when GITHUB_TOKEN is set', async () => {
    process.env.GITHUB_TOKEN = 'test-token';
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await GET(createRequest('https://api.github.com/users/test/repos'));

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.github.com/users/test/repos',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      })
    );
  });

  it('forwards GitHub error status codes', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
    });

    const response = await GET(
      createRequest('https://api.github.com/users/test/repos')
    );

    expect(response.status).toBe(403);
  });
});
