export async function fetchGitHubData(url: string) {
  const res = await fetch(`/api/github?url=${encodeURIComponent(url)}`);

  if (!res.ok) {
    throw new Error("GITHUB API ERROR");
  }

  return res.json();
}
