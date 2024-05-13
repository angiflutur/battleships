import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getUserDetails } from '../api';

interface UserDetailsScreenProps {
  route: any;  
}

const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({ route }) => {
  const { accessToken } = route.params;
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetails(accessToken);
        setUserData(data);
    
      } catch (error) {
        console.error("Error getting user details:", error);
      }
    };

    fetchUserDetails();
  }, [accessToken]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      {userData && (
        <View>
          <Text>Email: {userData && userData.user.email}</Text>
          <Text>Current games playing: {userData && userData.currentlyGamesPlaying}</Text>
          <Text>Games lost: {userData && userData.gamesLost}</Text>
          <Text>Games played: {userData && userData.gamesPlayed}</Text>
          <Text>Games won: {userData && userData.gamesWon}</Text>

        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default UserDetailsScreen;
