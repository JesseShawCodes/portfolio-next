import en from '../locales/en.json';

describe('getLocale', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_LOCALE;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns the default English locale', () => {
    const { getLocale } = require('../locale');
    expect(getLocale()).toEqual(en);
  });

  it('returns the requested locale when provided', () => {
    const { getLocale } = require('../locale');
    expect(getLocale('en')).toEqual(en);
  });

  it('falls back to English for an unknown locale code', () => {
    const { getLocale } = require('../locale');
    expect(getLocale('fr')).toEqual(en);
  });

  it('uses NEXT_PUBLIC_LOCALE when set', () => {
    process.env.NEXT_PUBLIC_LOCALE = 'en';
    const { getLocale } = require('../locale');
    expect(getLocale()).toEqual(en);
  });
});
