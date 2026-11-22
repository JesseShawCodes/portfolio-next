import cmsMock from '../../../config/content.json';

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

    it('returns mock work experiences and educations', async () => {
      const {
        getCmsWorkExperiences,
        getCmsEducations,
      } = require('../cms');

      await expect(getCmsWorkExperiences()).resolves.toEqual(cmsMock.workExperiences);
      await expect(getCmsEducations()).resolves.toEqual(cmsMock.educations);
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  describe('with CMS mock disabled', () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_USE_CMS_MOCK = 'false';
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
