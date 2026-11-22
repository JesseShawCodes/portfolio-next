import cmsMock from '../../config/content.json';

function getCmsMock(): boolean {
  return process.env.NEXT_PUBLIC_USE_CMS_MOCK === 'true';
}

function getApiUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
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
