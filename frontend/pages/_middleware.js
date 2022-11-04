import {NextResponse} from "next/server";

export function middleware(req) {
    let res = NextResponse.next();
    let url = req.url;
    let cookie = req.cookies?.user;

    if (url.includes('/dashboard')) {
        if (cookie === undefined) {
            return NextResponse.redirect('http://localhost:3000/auth/login');
        }
    }
    return res;
}
