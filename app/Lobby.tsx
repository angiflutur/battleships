import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Game } from "./types";
import { createGame, getAllGames, joinGame } from "./api";

interface LobbyScreenProps {
  route: any;
  navigation: any;
}

const Lobby: React.FC<LobbyScreenProps> = ({ route, navigation }) => {
  const {
    accessToken,
    userData,
  }: { games: Game[]; accessToken: string; userData: any } = route.params;

  const [games, setGames] = useState<Game[]>([]);
  const [showMyGames, setShowMyGames] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleShowMyGames = () => {
    setShowMyGames(true);
  };

  const handleShowAllGames = () => {
    setShowMyGames(false);
  };

  const handleCreateGame = async () => {
    try {
      const newGame = await createGame(accessToken);
      console.log("New game created:", newGame);
      fetchGames();
    } catch (error) {
      console.error("Failed to create game:", error);
    }
  };

  const handleJoinGame = async (gameId: string) => {
    try {
      const joinedGame = await joinGame(gameId, accessToken);
      console.log("Joined game:", joinedGame);
      setError(null);
      navigation.navigate('GameDetailsScreen', { gameId, accessToken });
    } catch (err: any) {
      console.error("Failed to join game:", err.message);
      setError(err.message || "Failed to join game.");
    }
  };

  const handleViewGameDetails = (gameId: string) => {
    navigation.navigate('GameDetailsScreen', { gameId, accessToken, userData});
  };

  const fetchGames = async () => {
    try {
      const gamesResponse = await getAllGames(accessToken);
      setGames(gamesResponse);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (error) {
      timeoutId = setTimeout(() => {
        setError(null);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [error]);

  useEffect(() => {
    fetchGames();
  }, []);

  const filteredGames = showMyGames
    ? games.filter(
        (game) =>
          game.player1.email === userData.user.email ||
          (game.player2 && game.player2.email === userData.user.email)
      )
    : games;

  const filteredGamesByKeyword = searchKeyword
    ? filteredGames.filter(
        (game) =>
          game.player1.email.includes(searchKeyword) ||
          (game.player2 && game.player2.email.includes(searchKeyword))
      )
    : filteredGames;

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      fetchGames();
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onScroll={handleScroll}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleShowMyGames}
          style={[styles.button, showMyGames ? styles.activeButton : null]}
        >
          <Text style={styles.buttonText}>My Games</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShowAllGames}
          style={[styles.button, !showMyGames ? styles.activeButton : null]}
        >
          <Text style={styles.buttonText}>All Games</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCreateGame} style={styles.button}>
          <Text style={styles.buttonText}>Create Game</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setSearchKeyword}
        value={searchKeyword}
        placeholder="Search by email"
      />
      <Button title="Search" onPress={fetchGames} />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {filteredGamesByKeyword.map((game, index) => (
        <View key={index} style={styles.card}>
          <Text>Game {index + 1}</Text>
          <Text>Status: {game.status}</Text>
          <Text>Player1: {game.player1.email}</Text>
          {game.player2 ? (
            <Text>Player2: {game.player2.email}</Text>
          ) : (
            <Text>Waiting for player 2...</Text>
          )}
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => handleJoinGame(game.id)}
          >
            <Text style={styles.joinButtonText}>Join Game</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => handleViewGameDetails(game.id)}
          >
            <Text style={styles.detailsButtonText}>Game Details</Text>
          </TouchableOpacity>
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
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    width: "100%",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#0056b3",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  card: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  joinButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: "#28a745",
    borderRadius: 5,
    alignItems: "center",
  },
  joinButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  detailsButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: "#17a2b8",
    borderRadius: 5,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "90%",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default Lobby;
