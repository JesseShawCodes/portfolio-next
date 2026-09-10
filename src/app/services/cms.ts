import cmsMock from '../../config/cms-mock.json';
import { fetchCmsData } from './fetchCmsData';

function getCmsMock(): boolean {
  return process.env.NEXT_PUBLIC_USE_CMS_MOCK === 'true';
}

function getApiUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
}

export async function getCmsRepos() {
  if (getCmsMock()) {
    return cmsMock.repos;
  }

  return fetchCmsData(getApiUrl('/api/repos?populate=*'));
}

export async function getCmsProjects() {
  if (getCmsMock()) {
    return cmsMock.projects;
  }

  const res = await fetch(getApiUrl('/api/projects?populate=logo'), { cache: 'force-cache' });

  if (!res.ok) {
    throw new Error('STRAPI API ERROR');
  }

  return res.json();
}

export async function getCmsWorkExperiences() {
  if (getCmsMock()) {
    return cmsMock.workExperiences;
  }

  const res = await fetch(getApiUrl('/api/work-experiences?populate=logo'), { cache: 'force-cache' });

  if (!res.ok) {
    throw new Error('STRAPI API ERROR');
  }

  return res.json();
}

export async function getCmsEducations() {
  if (getCmsMock()) {
    return cmsMock.educations;
  }

  const res = await fetch(getApiUrl('/api/educations'), { cache: 'force-cache' });

  if (!res.ok) {
    throw new Error('STRAPI API ERROR');
  }

  return res.json();
}
