import React, { useState, createContext, useRef } from "react";
import {
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signInWithCredential,
  FacebookAuthProvider,
} from "firebase/auth";
import auth from "@react-native-firebase/auth";

import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { loginRequest } from "./authentication.servise";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const ourAuth = useRef(getAuth()).current;

  GoogleSignin.configure({
    webClientId:
      "495982560011-dv13rccc5121bh8pp6ri2mnn6oomip94.apps.googleusercontent.com",
  });

  const signInWithFB = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);
    if (result.isCancelled) {
      throw "User cancelled the login process";
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw "Something went wrong obtaining access token";
    }

    // Create a Firebase credential with the AccessToken
    const facebookAuthProvider = FacebookAuthProvider.credential(
      data.accessToken
    );

    // Sign-in with credential from the Facebook user.
    signInWithCredential(ourAuth, facebookAuthProvider)
      .then((u) => {
        setUser(u);
        console.log(u);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const signInWithGoogle = async () => {
    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const user_sign_in = auth().signInWithCredential(googleCredential);

    user_sign_in
      .then((data) => {
        console.log(data.user);
        setUser(data.user);
      })
      .catch((error) => {
        setError(error);
        console.log(error, "ERROR");
      });
  };

  onAuthStateChanged(ourAuth, (usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(ourAuth, email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(ourAuth, email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setError(null);
    });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        signInWithFB,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
