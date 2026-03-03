import { NextRequest, NextResponse } from "next/server";

function isAssetOrInternalPath(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  );
}

export function middleware(request: NextRequest) {
  const hostHeader =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const host = hostHeader?.toLowerCase().split(":")[0];
  const { pathname } = request.nextUrl;

  if (host === "sceduler.erinkerr.me") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.host = "scheduler.erinkerr.me";
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (host === "scheduler.erinkerr.me") {
    if (isAssetOrInternalPath(pathname)) {
      return NextResponse.next();
    }

    if (pathname === "/") {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = "/scheduler";
      return NextResponse.rewrite(rewriteUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
