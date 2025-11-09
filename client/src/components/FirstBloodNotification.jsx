import React, { useEffect, useState } from 'react';

const FirstBloodNotification = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 8500);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!notification) return null;

  return (
    <div className="toast-area">
      <div className="toast">
        <div className="toast-content">
          <br />
          <p>
            Congratulations to team <b>"{notification.team}"</b>
            <br />
            for first blooding the challenge <b>"{notification.challenge}"</b>!
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

export default FirstBloodNotification;
