import React, { useContext } from "react";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  Title,
  AnimationWrapper,
} from "../components/account.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import LottieView from "lottie-react-native";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const AccountScreen = ({ navigation }) => {
  const { signInWithFB, signInWithGoogle,  error, isLoading } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <AccountCover />
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../../assets/watermelon.json")}
        />
      </AnimationWrapper>
      <Title> Meals To Go</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </AuthButton>
        </Spacer>
        <Spacer size="large">
          <AuthButton icon="facebook" mode="contained" onPress={() =>signInWithFB()}>
            Sign In With FB
          </AuthButton>
        </Spacer>
        <Spacer size="large">
          <AuthButton icon="google" mode="contained" onPress={() =>signInWithGoogle()}>
            Sign In With Google
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
