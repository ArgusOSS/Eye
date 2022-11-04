import {NextResponse} from "next/server";

export async function middleware(req) {
    let res = NextResponse.next();
    let url = req.url;
    let cookie = req.cookies?.user;
    console.log("the cookie is: ", cookie)
    
    // if (url.includes('/dashboard')) {
    //     if (cookie === undefined) {
    //         return NextResponse.redirect('http://localhost:3000/auth/login');
    //     }
    // }
    return res;
}