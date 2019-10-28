import React from 'react';
import { Icon } from 'antd';

const CustomIcon = ({ children, ...otherProps }) => {
    return (
        <Icon
            className='custom-icon'
            {...otherProps}
        />
    );
};

export default CustomIcon;