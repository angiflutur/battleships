const REGISTER_ENDPOINT = "http://163.172.177.98:8081/auth/register";
const LOGIN_ENDPOINT = "http://163.172.177.98:8081/auth/login";
const USER_DETAILS_ENDPOINT = "http://163.172.177.98:8081/user/details/me";

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
    console.log(data); 
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

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
    console.log(data); 
    return data; 
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error; 
  }
};

export const getUserDetails = async (accessToken: string) => {
  try {
    const response = await fetch(USER_DETAILS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log("User details data:", data); 
    return data;
  } catch (error) {
    console.error("Error getting user details:", error);
    throw error;
  }
};
