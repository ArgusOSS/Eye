import { useRouter } from 'next/router';
import Router from 'next/router';
import { useEffect } from 'react';
import { useCookies } from "react-cookie"


export default function Social() {
    const query = useRouter().query
    const access_token = query.access;
    const refresh_token = query.refresh;
    const [cookie, setCookie] = useCookies(["user"])

    const to_forward = "/dashboard/status";

    const user = {
        access_token: access_token,
        refresh_token: refresh_token,
    }

    setCookie("user", JSON.stringify(user), {
        path: "/",
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
    })

    useEffect(() => {
        Router.push(to_forward);
    },[]);

    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    );
}
