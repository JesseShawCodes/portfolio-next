import { fetchGitHubData } from '../fetchGitHubData';

global.fetch = jest.fn();

describe('fetchGitHubData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return data on successful fetch', async () => {
    const mockData = { message: 'Success!' };
    const mockUrl = 'https://api.github.com/users/test';

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await fetchGitHubData(mockUrl);

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/github?url=${encodeURIComponent(mockUrl)}`
    );
  });

  it('should throw an error on failed fetch', async () => {
    const mockUrl = 'https://api.github.com/users/test';

    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(fetchGitHubData(mockUrl)).rejects.toThrow('GITHUB API ERROR');
  });
});
