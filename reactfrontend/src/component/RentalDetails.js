import React from 'react';
import EndRental from './EndRental';

const RentalDetails = ({ rentals }) => {
  return (
    <div>
      <h1>Rental Details</h1>
      <table>
        <thead>
          <tr>
            <th>Car Model</th>
            <th>Rental Date</th>
            <th>Return Date</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.id}>
              <td>{rental.car.model}</td>
              <td>{rental.rental_date}</td>
              <td>{rental.return_date}</td>
              <td>{rental.price}</td>
              <td>
                    {rental.return_date ? (
                        'Rental ended'
                    ) : (
                        <EndRental rentalId={rental.id} />
                    )}
                </td>
            </tr>
        ))}
    </tbody>
</table>
    </div>
  );
};

export default RentalDetails;
