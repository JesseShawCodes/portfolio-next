export async function fetchCmsData(url: string) {
  const res = await fetch(`${url}`)

  if (!res.ok) {
    throw new Error("STRAPI API ERROR")
  }

  return res.json();
}
