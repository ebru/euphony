import React from 'react';
import { Button } from 'antd';
import './CustomButton.scss';

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