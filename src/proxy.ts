import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth';
import { headers } from 'next/headers';

// This function can be marked `async` if using `await` inside
export const proxy = async (request: NextRequest) => {
  "use server";
  const session = await auth.api.getSession({
    headers: await headers()
  })
  // console.log("SEssion : ", session);

  if(session) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ['/addtutor', '/mybookedsessions', '/addutor', '/mytutor'],
}