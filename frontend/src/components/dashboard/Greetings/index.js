import styles from "../../../../styles/Home.module.css";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import Router from "next/router";
import { logoutUser } from "../../../../lib/auth";


export function Greetings() {
    const handleLogout = async () => {
        const response = await logoutUser();
        if (response.status == "successful") {
            Router.push('/auth/login');
        }
    };

    // useEffect to fetch from sessionstorage 
    const [userName, setName] = useState("");
    const [shirtSize, setSize] = useState("");
    useEffect(() => {
        setName(window.sessionStorage.getItem("name"));
        setSize(window.sessionStorage.getItem("size"));
    }, []);
    

    return (
        <div className="container">
            <div className="row">
                <Typography variant="h4" className="text-light" >
                    Welcome, <span className={styles?.colorchanging}>{userName}!</span>
                </Typography>
            </div>
            <hr />
            <div className="row">
                <Typography variant="h4 text-light" className={styles?.description}>
                    Your shirt size is <b className={styles?.colorchanging}>{shirtSize?.toUpperCase()}</b>.
                </Typography>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-center p-3">
                    <button className="btn btn-dark btn-lg" onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            </div>
        </div>
    )
}
