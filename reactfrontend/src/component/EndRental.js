import React from 'react';
import axios from 'axios';

const EndRentalButton = ({ rentalId, onEndRental }) => {
  const handleEndRental = () => {
    axios.put(`http://localhost:8000/api/cars${rentalId}/end`)
      .then(response => {
        if (onEndRental) {
          onEndRental();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <button onClick={handleEndRental}>End Rental</button>
  );
};

export default EndRentalButton;