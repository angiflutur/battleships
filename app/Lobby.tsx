import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Game } from "./types";
import { createGame, getAllGames } from "./api";

interface LobbyScreenProps {
  route: any;
}

const Lobby: React.FC<LobbyScreenProps> = ({ route }) => {
  const { accessToken, userData }: { games: Game[], accessToken: string, userData: any} = route.params;

  const [games, setGames] = useState<Game[]>([]);
  const [showMyGames, setShowMyGames] = useState(true);

  const handleShowMyGames = async () => {
    setShowMyGames(true);
  };

  const handleShowAllGames = async () => {
    setShowMyGames(false);
  };

  const handleCreateGame = async () => {
    try {
      const newGame = await createGame(accessToken);
      // Optionally, you can update the games state with the newly created game
      // setGames([...games, newGame]);
      console.log("New game created:", newGame);
    } catch (error) {
      console.error("Failed to create game:", error);
    }
  };

  const fetchGames = async () => {
    try {
      const gamesResponse = await getAllGames(accessToken);
      setGames(gamesResponse);
      console.log(gamesResponse);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const filteredGames = showMyGames
    ? games.filter((game) => game.player1.email === userData.user.email || (game.player2 && game.player2.email === userData.user.email))
    : games;

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      fetchGames();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} onScroll={handleScroll}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleShowMyGames} style={[styles.button, showMyGames ? styles.activeButton : null]}>
          <Text style={styles.buttonText}>My Games</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShowAllGames} style={[styles.button, !showMyGames ? styles.activeButton : null]}>
          <Text style={styles.buttonText}>All Games</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCreateGame} style={styles.button}>
          <Text style={styles.buttonText}>Create Game</Text>
        </TouchableOpacity>
      </View>
      {filteredGames.map((game, index) => (
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "blue",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
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
