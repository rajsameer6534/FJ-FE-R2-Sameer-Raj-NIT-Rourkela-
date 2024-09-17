import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import RideHistory from './RideHistory';
import RideStatistics from './RideStatistics';
import RideBooking from './RideBooking';

const DashboardRoutes = ({ user, rideHistory }) => (
  <Routes>
    <Route path="profile" element={<Profile user={user} />} />
    <Route path="ride-history" element={<RideHistory />} />
    <Route path="ride-statistics" element={<RideStatistics rideHistory={rideHistory} />} />
    <Route path="ride-booking" element={<RideBooking onConfirmRide={(ride) => console.log(ride)} />} />
  </Routes>
);

export default DashboardRoutes;
