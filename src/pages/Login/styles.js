import styled from "styled-components";

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;
export const Logo = styled.Image``;
export const Input = styled.TextInput`
  height: 46px;
  align-self: stretch;
  background-color: #fff;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 4px;
  margin-top: 20;
  padding: 0px 15px;
`;

export const LoginButton = styled.TouchableOpacity`
  height: 46px;
  align-self: stretch;
  background-color: #df4723;
  border-radius: 4px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #ffff;
  font-weight: bold;
  font-size: 16px;
`;
