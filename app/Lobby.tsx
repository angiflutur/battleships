import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { Game } from "./types";

interface LobbyScreenProps {
  route: any;
}

const Lobby: React.FC<LobbyScreenProps> = ({ route }) => {
  const { games }: { games: Game[] } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
       {games.map((game, index) => (
            <View key={index} style={styles.card}>
              <Text>Game {index + 1}</Text>
              <Text>Status: {game.status}</Text>
              <Text>Player1: {game.player1.email}</Text>
              {game.player2 ? (
                <Text>Player2: {game.player2.email}</Text>
              ) : (
                <Text>Waiting for player 2...</Text>
              )}
            </View>
          ))}
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
  card: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  },
});

export default Lobby;
