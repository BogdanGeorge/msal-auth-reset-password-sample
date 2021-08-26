import React from "react";
import AuthenticatedUserDetails from "components/AuthenticatedUserDetails";

function About() {
    console.log("About page");
    return (
        <div>
            <h1>About</h1>
            <AuthenticatedUserDetails />
        </div>
    );
}

export default About;
