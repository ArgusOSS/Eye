import styles from "../../../../styles/Home.module.css";
import Typography from "@material-ui/core/Typography";
import Router  from "next/router";
import { logoutUser } from "../../../../lib/auth";

export function ThankYou() {
    const handleLogout = async () => {
        const response = await logoutUser();
        if (response.status == "successful") {
            Router.push('/auth/login');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <Typography variant="h2" className={styles.title}>
                    Thank<span className={styles.colorchanging}> You!</span>
                </Typography>
            </div>
            <div className="row">
                <Typography variant="h4 text-light" className={styles.description}>
                    Your shirt will be <span className={styles.colorchanging}>shipped</span> to you  <span className={styles.colorchanging}>shortly.</span>
                </Typography>
            </div>
            <hr />
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <button className="btn btn-dark btn-lg" onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            </div>
        </div>
    )
}
