import { useState } from "react";
import Router from "next/router";
import styles from "../../../../styles/Home.module.css";
import Typography from "@material-ui/core/Typography";
import { sendShirtSize } from "../../../../lib/users";

export function DashboardShirt() {
    const [size, setSize] = useState("xs");

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(size);
        sendShirtSize(size).then((data) => {
            if (data.message === "success") {
                Router.push("/dashboard/thankyou");
            }
        }
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <div className="row">
                    <Typography variant="h2" className={styles.title}>
                        Select<span className={styles.colorchanging}> Shirt</span> Size
                    </Typography>
                </div>
                <hr />
                <div className="row justify-content-center">
                    <div className="col">
                        <select 
                            className="form-select form-select-lg mb-3" 
                            aria-label=".form-select-lg example"
                            onChange={(e) => setSize(e.target.value)}
                        >
                            <option defaultValue value="xs">Extra-Small</option>
                            <option value="s">Small</option>
                            <option value="m">Medium</option>
                            <option value="l">Large</option>
                            <option value="xl">Extra-Large</option>
                        </select>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col text-center">
                        <button type="submit" className="btn btn-dark btn-lg btn-block">Select</button>
                    </div>
                </div>

            </fieldset>
        </form>
    )
}
