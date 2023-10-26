import React from 'react';
import LeftComponent from './LeftComponent';
import RightComponent from './RightComponent';

const ServiceDetailBody = () => {
    return (
        <div className='flex flex-row gap-6'>
            <LeftComponent />
            <RightComponent />
        </div>
    )
}

export default ServiceDetailBody;