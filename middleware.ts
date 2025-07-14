// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { parse } from "cookie";
// import { checkServerSession } from "./lib/api/serverApi";

// const privateRoutes = ["/profile", "/notes"];
// const publicRoutes = ["/sign-in", "/sign-up"];

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get("accessToken")?.value;
//   const refreshToken = cookieStore.get("refreshToken")?.value;

//   const isPrivateRoute = privateRoutes.some((route) =>
//     pathname.startsWith(route)
//   );
//   const isPublicRoute = publicRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   if (!accessToken) {
//     if (refreshToken) {
//       const response = await checkServerSession();
//       const setCookie = response.headers["set-cookie"];

//       if (setCookie) {
//         const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

//         for (const cookieStr of cookieArray) {
//           const parsed = parse(cookieStr);
//           const options = {
//             expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
//             path: parsed.Path,
//             maxAge: Number(parsed["Max-Age"]),
//           };
//           if (parsed.accessToken)
//             cookieStore.set("accessToken", parsed.accessToken, options);
//           if (parsed.refreshToken)
//             cookieStore.set("refreshToken", parsed.refreshToken, options);
//         }

//         if (isPublicRoute) {
//           return NextResponse.redirect(new URL("/profile", request.url), {
//             headers: {
//               Cookie: cookieStore.toString(),
//             },
//           });
//         }

//         if (isPrivateRoute) {
//           return NextResponse.next({
//             headers: {
//               Cookie: cookieStore.toString(),
//             },
//           });
//         }
//       }
//     }

//     if (isPublicRoute) {
//       return NextResponse.next();
//     }

//     if (isPrivateRoute) {
//       return NextResponse.redirect(new URL("/sign-in", request.url));
//     }
//   }

//   if (isPublicRoute && accessToken) {
//     return NextResponse.redirect(new URL("/profile", request.url));
//   }

//   if (isPrivateRoute) {
//     return NextResponse.next();
//   }
// }

// export const config = {
//   matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
// };
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!accessToken) {
    if (refreshToken) {
      const user = await checkServerSession();

      // Якщо refreshToken валідний — логін успішний → пропускаємо
      if (user) {
        if (isPublicRoute) {
          return NextResponse.redirect(new URL("/profile", request.url));
        }

        return NextResponse.next();
      }
    }

    // Якщо немає accessToken і не вийшло оновити
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next(); // публічний маршрут без авторизації
  }

  // Якщо користувач авторизований, не пускати на /sign-in і /sign-up
  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
