import React from 'react'

const Spacer = ({ children, size }) => {
    return (
        <div style={ !size ? { margin: 10 } : { margin: size }}>
            {children}
        </div>
    )
}

export default Spacer
