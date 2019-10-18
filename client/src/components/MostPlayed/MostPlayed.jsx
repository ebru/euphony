import React from 'react';

import './MostPlayed.scss';

const MostPlayed = props => {
    const { mostPlayed: { name, artistName } } = props;

    return (
        <div className='most-played-container'>
            <p><em>most played so far</em></p>
            <h1>{name}</h1>
            <p><em>by {artistName}</em></p>
        </div>
    );
};

export default MostPlayed;