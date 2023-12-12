import React, { ReactElement } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';


const render = (status: Status): ReactElement => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return <></>;
};

const keyDoesntExist = (): Boolean => {
    return (!process.env.REACT_APP_GOOGLE_KEY! || process.env.REACT_APP_GOOGLE_KEY === 'keyhere');
};

export default function MapWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    if (keyDoesntExist()) {
        return <div>No Google Maps API key loaded</div>
    }

    return <Wrapper apiKey={process.env.REACT_APP_GOOGLE_KEY!} render={render}>
        {children}
    </Wrapper>
}