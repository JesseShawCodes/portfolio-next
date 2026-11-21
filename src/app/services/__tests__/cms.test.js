import cmsMock from '../../../config/content.json';

const mockFetchCmsData = jest.fn();

jest.mock('../fetchCmsData', () => ({
  fetchCmsData: (...args) => mockFetchCmsData(...args),
}));

describe('cms', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env = { ...originalEnv, NEXT_PUBLIC_API_URL: 'https://cms.example.com' };
    global.fetch = jest.fn();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('with CMS mock enabled', () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_USE_CMS_MOCK = 'true';
    });

    it('returns mock repos, projects, work experiences, and educations', async () => {
      const {
        getCmsRepos,
        getCmsProjects,
        getCmsWorkExperiences,
        getCmsEducations,
      } = require('../cms');

      await expect(getCmsRepos()).resolves.toEqual(cmsMock.repos);
      await expect(getCmsProjects()).resolves.toEqual(cmsMock.projects);
      await expect(getCmsWorkExperiences()).resolves.toEqual(cmsMock.workExperiences);
      await expect(getCmsEducations()).resolves.toEqual(cmsMock.educations);
      expect(global.fetch).not.toHaveBeenCalled();
      expect(mockFetchCmsData).not.toHaveBeenCalled();
    });
  });

  describe('with CMS mock disabled', () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_USE_CMS_MOCK = 'false';
    });

    it('fetches repos via fetchCmsData', async () => {
      const repos = { data: [{ name: 'repo' }] };
      mockFetchCmsData.mockResolvedValueOnce(repos);

      const { getCmsRepos } = require('../cms');
      await expect(getCmsRepos()).resolves.toEqual(repos);
      expect(mockFetchCmsData).toHaveBeenCalledWith(
        'https://cms.example.com/api/repos?populate=*'
      );
    });

    it('fetches projects successfully', async () => {
      const projects = { data: [{ name: 'project' }] };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(projects),
      });

      const { getCmsProjects } = require('../cms');
      await expect(getCmsProjects()).resolves.toEqual(projects);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://cms.example.com/api/projects?populate=logo',
        { cache: 'force-cache' }
      );
    });

    it('throws when projects fetch fails', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false });

      const { getCmsProjects } = require('../cms');
      await expect(getCmsProjects()).rejects.toThrow('STRAPI API ERROR');
    });

    it('fetches work experiences successfully', async () => {
      const workExperiences = { data: [{ title: 'Dev' }] };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(workExperiences),
      });

      const { getCmsWorkExperiences } = require('../cms');
      await expect(getCmsWorkExperiences()).resolves.toEqual(workExperiences);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://cms.example.com/api/work-experiences?populate=logo',
        { cache: 'force-cache' }
      );
    });

    it('throws when work experiences fetch fails', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false });

      const { getCmsWorkExperiences } = require('../cms');
      await expect(getCmsWorkExperiences()).rejects.toThrow('STRAPI API ERROR');
    });

    it('fetches educations successfully', async () => {
      const educations = { data: [{ schoolName: 'Test U' }] };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(educations),
      });

      const { getCmsEducations } = require('../cms');
      await expect(getCmsEducations()).resolves.toEqual(educations);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://cms.example.com/api/educations',
        { cache: 'force-cache' }
      );
    });

    it('throws when educations fetch fails', async () => {
      global.fetch.mockResolvedValueOnce({ ok: false });

      const { getCmsEducations } = require('../cms');
      await expect(getCmsEducations()).rejects.toThrow('STRAPI API ERROR');
    });
  });
});
