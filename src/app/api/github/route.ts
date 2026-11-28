import { NextRequest, NextResponse } from "next/server";

const GITHUB_API_ORIGIN = "https://api.github.com";

function isAllowedGitHubUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.origin === GITHUB_API_ORIGIN;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url || !isAllowedGitHubUrl(url)) {
    return NextResponse.json({ error: "Invalid GitHub API URL" }, { status: 400 });
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "JesseShawCodes-Portfolio",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    headers,
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "GitHub API error" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
