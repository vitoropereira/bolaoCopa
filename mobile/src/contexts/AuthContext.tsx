import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { api } from "../service/api";

WebBrowser.maybeCompleteAuthSession();

interface AuthProviderProps {
  children: ReactNode;
}

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}
export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, serUser] = useState({} as UserProps);
  const [isUserLoading, serIsUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "1014525004712-j31t43uqonbvn4vu3rlimqbv8cdm5s6e.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  async function signIn() {
    serIsUserLoading(true);
    try {
      await promptAsync();
    } catch (error) {
      console.log(error);
    } finally {
      serIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {
      serIsUserLoading(true);
      const tokenResponse = await api.post("/users", { access_token });
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenResponse.data.token}`;

      const userInfoResponse = await api.get("/me");

      serUser(userInfoResponse.data.user);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      serIsUserLoading(false);
    }
  }

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
