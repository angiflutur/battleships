import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { getUserDetails } from "./api";

interface UserDetailsScreenProps {
  route: any;
  navigation: any;
}

const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({
  route,
  navigation,
}) => {
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

  const navigateToLobby = () => {
    navigation.navigate("Lobby", { accessToken, userData });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Details</Text>
      {userData && (
        <View style={styles.card}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Email:  </Text>
            <Text style={styles.value}>{userData.user.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Current games playing:  </Text>
            <Text style={styles.value}>{userData.currentlyGamesPlaying}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Games lost:  </Text>
            <Text style={styles.value}>{userData.gamesLost}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Games played:  </Text>
            <Text style={styles.value}>{userData.gamesPlayed}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Games won:  </Text>
            <Text style={styles.value}>{userData.gamesWon}</Text>
          </View>

          <TouchableOpacity style={styles.buttonContainer} onPress={navigateToLobby}>
            <Text style={styles.buttonText}>Go to Lobby</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default UserDetailsScreen;
