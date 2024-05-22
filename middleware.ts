import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// import { authMiddleware } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/','/flags/(.*)','/resources/(.*)','/favicon.ico','/images/(.*)','/sounds/(.*)','/api/webhooks/stripe']);

export default clerkMiddleware((auth, request) => {
  if(!isPublicRoute(request)) {
    auth().protect();
  }
});




export const config = {
  // matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  matcher: [
    '/((?!.*\\..*|_next).*)', // Matches all routes except static files and _next
    '/',
    '/(api|trpc)(.*)'
  ],
};



 
// export default authMiddleware({
//   publicRoutes: [],
// });
 
// export const config = {
//   // Protects all routes, including api/trpc.
//   // See https://clerk.com/docs/references/nextjs/auth-middleware
//   // for more information about configuring your Middleware
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };