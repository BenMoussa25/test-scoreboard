import React from 'react';
import { parseActivityDate } from '../utils/helpers';

const ActivityFeed = ({ activities }) => {
  return (
    <div className="panel">
      <div className="panel-body">
        <ul className="list-group">
          {activities.map((activity, index) => {
            const status = activity.first_blood ? 'red' : 'lightblue';
            const title = activity.first_blood ? 'NEW BLOOD!' : 'NEW Solve!';
            const desc = activity.first_blood ? 'first blooded' : 'just solved';

            return (
              <li
                key={activity.id || index}
                className="list-group-item slide-in-right"
                style={{ boxShadow: `inset -7px 0 0 ${status}` }}
              >
                <div className="media">
                  <div className="media-body">
                    <small className="text-muted pull-right">
                      {parseActivityDate(activity.date)}
                    </small>
                    <h4 className="media-heading">{title}</h4>
                    <span>
                      User <b>"{activity.user}"</b> from team <b>{activity.team}</b>{' '}
                      {desc} <b>"{activity.challenge}"!</b>
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ActivityFeed;
