import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { getAllGames, getUserDetails } from "./api";
import { Game } from "./types";

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
  const [games, setGames] = useState<Game[]>([]);

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

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesResponse = await getAllGames(accessToken);
        setGames(gamesResponse);
        console.log(gamesResponse);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    };

    fetchGames(); // Apelăm funcția pentru a obține jocurile inițiale
  }, []);

  const navigateBack = () => {
    navigation.goBack();
  };

  const handleListAllGames = () => {
    navigation.navigate("Lobby", { games });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Details</Text>
      {userData && (
        <React.Fragment>
          <Text>Email: {userData.user.email}</Text>
          <Text>Current games playing: {userData.currentlyGamesPlaying}</Text>
          <Text>Games lost: {userData.gamesLost}</Text>
          <Text>Games played: {userData.gamesPlayed}</Text>
          <Text>Games won: {userData.gamesWon}</Text>

          <TouchableOpacity onPress={handleListAllGames}>
            <Text style={styles.button}>List All Games</Text>
          </TouchableOpacity>

        </React.Fragment>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    fontSize: 18,
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});

export default UserDetailsScreen;
