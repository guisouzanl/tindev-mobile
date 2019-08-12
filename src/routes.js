import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Login from "./pages/Login/index";
import Main from "./pages/Main/index";

export default createAppContainer(
  createSwitchNavigator({
    Login,
    Main
  })
);
