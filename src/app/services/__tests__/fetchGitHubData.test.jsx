import { fetchGitHubData } from '../fetchGitHubData';

// Mock the global fetch function
global.fetch = jest.fn();

describe('fetchGitHubData', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case for a successful fetch
  it('should return data on successful fetch', async () => {
    const mockData = { message: 'Success!' };
    const mockUrl = 'https://api.github.com/users/test';

    // Mock the fetch function to resolve with a successful response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await fetchGitHubData(mockUrl);

    // Assert that the result matches the mock data
    expect(result).toEqual(mockData);
    // Assert that fetch was called once
    expect(global.fetch).toHaveBeenCalledTimes(1);
    // Assert that fetch was called with the correct URL and headers
    expect(global.fetch).toHaveBeenCalledWith(mockUrl, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    });
  });

  // Test case for a failed fetch
  it('should throw an error on failed fetch', async () => {
    const mockUrl = 'https://api.github.com/users/test';

    // Mock the fetch function to resolve with a failed response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    // Assert that the function throws an error
    await expect(fetchGitHubData(mockUrl)).rejects.toThrow('GITHUB API ERROR');
  });
});
