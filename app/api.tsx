const REGISTER_ENDPOINT = "http://163.172.177.98:8081/auth/register";
const LOGIN_ENDPOINT = "http://163.172.177.98:8081/auth/login";
const USER_DETAILS_ENDPOINT = "http://163.172.177.98:8081/user/details/me";
const GAME_ENDPOINT = "http://163.172.177.98:8081/game";

// AUTH
// 1. POST: /auth/register - Create user
export const registerUser = async (email: string, password: string) => {
  try {
    const response = await fetch(REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to register user");
    }

    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// 2. POST: /auth/login - Authenticate user
export const authenticateUser = async (email: string, password: string) => {
  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to authenticate user");
    }

    return data;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

// 3. GET: user/details/me - User details
export const getUserDetails = async (accessToken: string) => {
  try {
    const response = await fetch(USER_DETAILS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting user details:", error);
    throw error;
  }
};


// GAME
// 4. GET: /game - Get all games
export const getAllGames = async (accessToken: string) => {
  try {
    const response = await fetch(`${GAME_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
    });
    const responseData = await response.json();
    const gamesData = responseData.games;
    
    return gamesData;  
  } catch (error) {
    console.error("Error getting all games:", error);
    throw error;
  }
};

// 5. POST: /game - Create game
export const createGame = async (accessToken: string) => {
  try {
    const response = await fetch(`${GAME_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
    });
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
};

// 6. POST: /game/join/{id} - Join game
export const joinGame = async (id: string, accessToken: string) => {
  try {
    const response = await fetch(`${GAME_ENDPOINT}/join/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to join game");
    }

    return data; 
  } catch (error) {
    console.error("Error joining game:", error);
    throw error;
  }
};

// 7. GET: /game/{id} - Get game details using the ID
export const getGameDetails = async (id: string, accessToken: string) => {
  try {
    const response = await fetch(`${GAME_ENDPOINT}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
     alert(data.message || "Failed to get game details");
    }
    return data; 
  } catch (error) {
    console.error("Error getting game details:", error);
    throw error;
  }
};

