import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Container,
  CardsContainer,
  CardBio,
  CardFooter,
  CardName,
  Logo,
  Card,
  Avatar,
  ButtonsContainer,
  Button,
  Like,
  Dislike,
  Empty,
  BackToLoginButton,
} from "./styles";
import logo from "../../assets/logo.png";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import api from "../../services/api";

function Main({ navigation }) {
  const id = navigation.getParam("user");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/devs", {
        headers: {
          user: id
        }
      });

      setUsers(response.data);
    }

    loadUsers();
  }, [id]);

  async function handleLike() {
    const [user, ...rest] = users;

    await api.post(`/devs/${user._id}/likes`, null, {
      headers: { user: id }
    });

    setUsers(rest);
  }

  async function handleDislike() {
    const [user, ...rest] = users;
    await api.post(`/devs/${user._id}/dislikes`, null, {
      headers: { user: id }
    });

    setUsers(rest);
  }

  async function handleLogout() {
    await AsyncStorage.clear();
    navigation.navigate("Login");
  }

  return (
    <Container>
      <BackToLoginButton onPress={handleLogout}>
        <Logo source={logo} />
      </BackToLoginButton>
      <CardsContainer>
        {users.length === 0 ? (
          <Empty>Acabou :(</Empty>
        ) : (
          users.map((user, index) => (
            <Card key={user._id} style={{ zIndex: users.length - index }}>
              <Avatar
                source={{
                  uri: user.avatar
                }}
              />
              <CardFooter>
                <CardName> {user.name} </CardName>
                <CardBio numberOfLines={3}>{user.bio}</CardBio>
              </CardFooter>
            </Card>
          ))
        )}
      </CardsContainer>
      {users.length > 0 && (
        <ButtonsContainer>
          <Button onPress={handleDislike}>
            <Like source={dislike} />
          </Button>
          <Button onPress={handleLike}>
            <Dislike source={like} />
          </Button>
        </ButtonsContainer>
      )}
    </Container>
  );
}

export default Main;
