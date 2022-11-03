import { getToken } from "./token";


export function sendShirtSize(size) {
    return fetch("/api/shirts/accept-size", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
            shirt_size: size,
        }),
    }).then((res) => res.json());
}
