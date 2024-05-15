import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, View, Button } from "react-native";
import { getGameDetails } from "./api";
import { Game } from "./types";

interface GameDetailsScreenProps {
  route: any;
  navigation: any;
}

const GameDetailsScreen: React.FC<GameDetailsScreenProps> = ({ route, navigation }) => {
  const { gameId, accessToken } = route.params;
  const [gameDetails, setGameDetails] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const data = await getGameDetails(gameId, accessToken);
        setGameDetails(data);
      } catch (error) {
        console.error("Error getting game details:", error);
      }
    };

    fetchGameDetails();
  }, [gameId, accessToken]);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {gameDetails ? (
        <View style={styles.card}>
          <Text style={styles.title}>Game Details</Text>
          <Text style={styles.label}>Status: {gameDetails.status}</Text>
          <Text style={styles.label}>Player 1: {gameDetails.player1.email}</Text>
          {gameDetails.player2 && (
            <Text style={styles.label}>Player 2: {gameDetails.player2.email}</Text>
          )}
          <Text style={styles.label}>Moves:</Text>
          {gameDetails.moves.map((move, index) => (
            <Text key={index} style={styles.value}>
              {`Move ${index + 1}: (${move.x}, ${move.y}) - ${move.result ? "Hit" : "Miss"}`}
            </Text>
          ))}
        </View>
      ) : (
        <Text>Loading game details...</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
});

export default GameDetailsScreen;
