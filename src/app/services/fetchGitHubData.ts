export async function fetchGitHubData(url: string) {
  const res = await fetch(`${url}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json"
    },
  })

  if (!res.ok) {
    throw new Error("GITHUB API ERROR")
  }

  return res.json();
}
