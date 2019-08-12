import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { Container, Logo, Input, LoginButton, ButtonText } from "./styles";
import logo from "../../assets/logo.png";
import { Platform } from "react-native";
import api from "../../services/api";

function Login({ navigation }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("user").then(user => {
      if (user) {
        navigation.navigate("Main", { user });
      }
    });
  });

  async function handleLogin() {
    const response = await api.post("/devs", { username: user });

    const { _id } = response.data;

    await AsyncStorage.setItem("user", _id);

    navigation.navigate("Main", { user: _id });
  }

  return (
    <Container behavior="padding" enabled={Platform.OS === "ios"}>
      <Logo source={logo} />
      <Input
        placeholder="Digite o seu usuário do GitHub"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        value={user}
        onChangeText={setUser}
      />
      <LoginButton onPress={handleLogin}>
        <ButtonText>Entrar</ButtonText>
      </LoginButton>
    </Container>
  );
}

export default Login;
