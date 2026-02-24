import React from 'react';
import ClientProfile from '../components/profile/ClientProfile';
import FreelancerProfile from '../components/profile/FreelancerProfile';

const Profile = ({ profile, setProfile, role }) => {
  // Logic: If role is client, show ClientProfile. Otherwise, show FreelancerProfile.
  return (
    <div className="min-h-screen bg-slate-50/50">
      {role === 'client' ? (
        <ClientProfile profile={profile} setProfile={setProfile} />
      ) : (
        <FreelancerProfile profile={profile} setProfile={setProfile} />
      )}
    </div>
  );
};

export default Profile;