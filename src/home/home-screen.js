import React from "react";
import { View, FlatList, Alert, StyleSheet } from "react-native";
import { connect } from "react-redux";

import {
  getTodos,
  filterTodosAction,
  toggleTodoAction,
  deleteTodo
} from "../redux/todo-actions";

import StatusBar from "../common/status-bar";
import StyledButton from "../common/styled-button";
import NavTextButton from "../common/nav-text-button";
import commonStyles from "../common/styles";
import Todo from "./todo";

export class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Todos Home",
    headerRight: (
      <View style={{ flexDirection: "row" }}>
        <NavTextButton
          text="Refresh"
          onPress={navigation.getParam("_refreshTodos")}
        />
        <NavTextButton
          text="New"
          onPress={navigation.getParam("_createTodo")}
        />
      </View>
    )
  });

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.setParams({
      _refreshTodos: this.refreshTodos.bind(this),
      _createTodo: this.createTodo.bind(this)
    });

    this.props.dispatch(getTodos());
  }

  refreshTodos() {
    this.props.dispatch(getTodos());
  }

  createTodo() {
    this.props.navigation.push("Create");
  }

  filterTodos(filter) {
    this.props.dispatch(filterTodosAction(filter));
  }

  toggleTodoState(selectedTodo, value) {
    this.props.dispatch(toggleTodoAction(selectedTodo.id));
  }

  deleteTodo(todo) {
    this.props.dispatch(deleteTodo(todo.id)).then(() => {
      Alert.alert("Delete succesful!");
    });
  }

  viewTodoDetails(todo) {
    this.props.navigation.push("Details", { todoId: todo.id });
  }

  renderTodo({ item }) {
    return (
      <Todo
        todo={item}
        onPress={this.viewTodoDetails.bind(this)}
        onToggle={this.toggleTodoState.bind(this)}
        onDelete={this.deleteTodo.bind(this)}
      />
    );
  }

  render() {
    const loadingText = this.props.loading ? "Loading ..." : "";
    return (
      <View style={{ flex: 1 }}>
        <View style={homeStyles.tabContainer}>
          <StyledButton
            text={"All"}
            isActive={this.props.filter === "all"}
            onPress={this.filterTodos.bind(this, "all")}
            layoutStyle={homeStyles.tabButton}
          />
          <StyledButton
            text={"Not Done"}
            isActive={this.props.filter === "not_done"}
            onPress={this.filterTodos.bind(this, "not_done")}
            layoutStyle={homeStyles.tabButton}
          />
          <StyledButton
            text={"Done"}
            isActive={this.props.filter === "completed"}
            onPress={this.filterTodos.bind(this, "completed")}
            layoutStyle={homeStyles.tabButton}
          />
        </View>
        <View style={homeStyles.mainView}>
          <FlatList
            data={this.props.filteredTodos}
            renderItem={this.renderTodo.bind(this)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <StatusBar text={loadingText} type={"info"} />
        <StatusBar text={this.props.error} type={"error"} />
      </View>
    );
  }
}

const homeStyles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "white"
  },
  tabContainer: {
    flexDirection: "row",
    width: "100%"
  },
  tabButton: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  filter: state.filter,
  filteredTodos: state.filteredTodos,
  error: state.error,
  loading: state.loading
});

export default connect(mapStateToProps)(HomeScreen);
