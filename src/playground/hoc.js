// Higher Order Component (HOC) - A component (HOC) that renders another component 
// Reuse code 

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAdmin && <p>This is private info. Please don't share!</p> }
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAduthenticated ? (
                <div><WrappedComponent {...props} /></div>
            ) : (
                <p>Please Login to View the info</p>
            )}
        </div>
    );
}

// const AdminInfo = withAdminWarning(Info); 
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={false} info="There are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAduthenticated={true} info="There are the details" />, document.getElementById('app'));
