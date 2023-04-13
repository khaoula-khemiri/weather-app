import React from 'react';

const Day = ({ date }) => {
    const nb = new Date(date).getDay()
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[nb]
    return (
        <div>
            {day}
        </div>
    );
}

export default Day;
