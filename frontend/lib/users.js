import { getToken } from "./token";
import create from "zustand";


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

export function useMyStore(stateSelector) {
    return create((set, get) => ({ 
        shirtSize: null,
        userName: null,
        hydrate: async () => {
            const res = await fetch("/api/authentication/me", {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            const user = await res.json();
            set({ shirtSize: user.shirt_size, userName: user.username });
        }
    }))[stateSelector];
};
