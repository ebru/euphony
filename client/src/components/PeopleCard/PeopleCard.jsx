import React from 'react';

import './PeopleCard.scss';

const PeopleCard = ({ people }) => (
  <div class='people-card-container'>
    <ul class='people-list'>
      {
        people.map(person =>
          <li><a href={person.profileUrl} target='_blank'>{person.name}</a></li>
        )
      }
    </ul>
  </div>
);

export default PeopleCard;