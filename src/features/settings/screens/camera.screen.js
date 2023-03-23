import React, { useRef, useState, useEffect, useContext } from "react";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { TouchableOpacity } from "react-native";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

const ActionsContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ActionButton = styled.Text`
    color: white;
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.7);
    padding: ${(props => props.theme.space[2])};
`;

export const CameraScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(Camera.Constants.Type.front);
  const cameraRef = useRef();

  useEffect(() => {
    requestPermission();
  }, []);

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  if (!permission) {
    return (
      <Text style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        No access to camera
      </Text>
    );
  }

  return (
    <ProfileCamera
      ref={(camera) => (cameraRef.current = camera)}
      type={type}
      ratio={"16:9"}
    >
      <ActionsContainer>
        <TouchableOpacity onPress={flipCamera}>
          <ActionButton>Flip</ActionButton>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePicture}>
          <ActionButton>Take Picture</ActionButton>
        </TouchableOpacity>
      </ActionsContainer>
    </ProfileCamera>
  );
};
