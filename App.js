import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import { Provider, connect } from "react-redux";

import store from "./src/redux/store";
import HomeScreen from "./src/home/home-screen";
import CreateScreen from "./src/create/create-screen";
import DetailsScreen from "./src/details/details-screen";
import EditScreen from "./src/edit/edit-screen";

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Create: CreateScreen,
    Details: DetailsScreen,
    Edit: EditScreen
  },
  {
    initialRouteName: "Home"
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
