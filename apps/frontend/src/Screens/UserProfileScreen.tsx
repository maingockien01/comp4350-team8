import React from 'react';
import '../css/UserProfileScreen.css';
import UserProfileForm from '../Components/UserProfileForm';
import Screen from '../Components/Screen/Screen';

const UserProfileScreen = () => {
  return (
    <Screen>
      <UserProfileForm />
    </Screen>
  );
};

export default UserProfileScreen;
