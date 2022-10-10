import { useRouter } from 'next/router';
import Router from 'next/router';
import { useEffect } from 'react';

export default function Login() {
    const query = useRouter().query
    const access_token = query.access;
    const refresh_token = query.refresh;

    // console.log("Access token is: ", access_token);
    // console.log("Refresh token is: ", refresh_token);
    // console.log("Query is: ", query);

    var to_forward = "/dashboard/shirt";
    if (query.shirt_size === null) {
        to_forward = "/dashboard/shirt";
    } else {
        to_forward = "/dashboard/greetings";
    }

    if (access_token && refresh_token) {
        window.sessionStorage.setItem("access_token", access_token);
        window.sessionStorage.setItem("refresh_token", refresh_token);
        window.sessionStorage.setItem("name", query.username);
        window.sessionStorage.setItem("size", query.shirt_size);
    }

    useEffect(() => {
        Router.push(to_forward);
    },[]);

    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    );
}
