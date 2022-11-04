import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

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

  const [request, response, promptAsync] = Google.useAuthRequest({});

  async function signIn() {
    serIsUserLoading(true);
    console.log("entrei");
    try {
      await promptAsync();
    } catch (error) {
      console.log(error);
    } finally {
      serIsUserLoading(false);
    }
  }

  async function signInWithGoogle(accessToken: string) {
    console.log("token de autenticação ===>>> " + accessToken);
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
