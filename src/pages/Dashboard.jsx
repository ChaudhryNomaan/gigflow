import React from 'react';
import ClientDashboard from '../components/dashboard/ClientDashboard';
import FreelancerDashboard from '../components/dashboard/FreelancerDashboard';

const Dashboard = ({ profile, role }) => {
  return (
    <div className="min-h-screen bg-slate-50/30">
      {role === 'client' ? (
        <ClientDashboard profile={profile} />
      ) : (
        <FreelancerDashboard profile={profile} />
      )}
    </div>
  );
};

export default Dashboard;