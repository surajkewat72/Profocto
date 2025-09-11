
"use client";

import { useState, useEffect } from 'react';

const DateRange = ({ startYear, endYear, id }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Present';
        
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        return `${months[date.getMonth()]}, ${date.getFullYear()}`;
    };

    if (!isClient) {
        // Return a simple fallback during SSR
        return (
            <p id={id} className="sub-content">
                {new Date(startYear).getFullYear()} - {endYear ? new Date(endYear).getFullYear() : 'Present'}
            </p>
        );
    }

    const start = new Date(startYear);
    const end = endYear ? new Date(endYear) : null;
    
    return (
        <p id={id} className="sub-content">
            {formatDate(startYear)} - {end && !isNaN(end.getTime()) ? formatDate(endYear) : 'Present'}
        </p>
    );
};

export default DateRange;