import React from 'react';

const FullPageRoute = (props: any) => {
    return (
        <div style={{
            position: "fixed",
            height: "100vh", width: "100vw",
            background: "#fff", zIndex: 18,
            left: 0, top: 0
        }}>
            <props.children/>
        </div>
    );
}

export default FullPageRoute;
