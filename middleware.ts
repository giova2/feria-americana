import { auth } from "@/auth"
import { LOGIN_ROUTE } from "./constants";

const PROTECTED_ROUTES = ['/seller']

export default auth((req) => {
  const { nextUrl } = req;
  // req.auth is provided by Auth.js
  console.log('req.auth.user: ' + req.auth?.user?.email);

  // set isAuthenticated to true if req.auth is a truthy value. otherwise set to false.
  const isAuthenticated = !!req.auth;

  // use boolean value to determine if the requested route is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.includes(nextUrl.pathname);

  // redirect to signin if route is a protected route and user is not authenticated
  if (isProtectedRoute && !isAuthenticated)
      return Response.redirect(new URL(LOGIN_ROUTE, nextUrl));
})