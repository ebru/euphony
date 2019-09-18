import React from 'react';
import { Button } from 'antd';

const CustomButton = ({ children, ...otherProps }) => {
    return (
        <Button
            className='custom-button'
            {...otherProps}
        >
            <span><b>{children}</b></span>
        </Button>
    );
}

export default CustomButton;