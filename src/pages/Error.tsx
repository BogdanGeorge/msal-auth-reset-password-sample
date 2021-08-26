import React from "react";

interface Props {
    title: string;
    description: string;
}

function Error(props: Props) {
    return (
        <>
            <h2>{props.title}</h2>
            <h3>{props.description}</h3>
        </>
    );
}

export default Error;
