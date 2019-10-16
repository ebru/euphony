import React from 'react';

import './PeopleCard.scss';

const PeopleCard = ({ people }) => (
  <div className='people-card-container'>
    <ul className='people-list'>
      {
        people.map(person =>
          <li key={person.id}><a href={person.profileUrl} target='_blank' rel='noopener noreferrer'>{person.name}</a></li>
        )
      }
    </ul>
  </div>
);

export default PeopleCard;