export const authConfig = {
    pages: {
        signIn: "/login",
        error: "/error",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const inRoute = nextUrl.pathname;
            if (!isLoggedIn) {
                if (inRoute === "/register" || inRoute === "/login") {
                    return true;
                }
                return Response.redirect(new URL("/", nextUrl));
            } else {
                if (inRoute === "/register" || inRoute === "/login") return true;
                return false;
            }
        },
    },
    providers: [],
};
