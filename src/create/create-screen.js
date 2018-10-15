import React from "react";
import { View, TextInput, Alert } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { createTodo } from "../redux/todo-actions";
import StatusBar from "../common/status-bar";
import NavTextButton from "../common/nav-text-button";
import commonStyles from "../common/styles";

export class CreateScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Create New",
    headerRight: (
      <NavTextButton
        text="Create"
        onPress={navigation.getParam("_createTodo")}
      />
    )
  });

  constructor(props) {
    super(props);
    this.state = { todoTitle: null };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      _createTodo: this.createTodo.bind(this, this.state.id)
    });
  }

  createTodo() {
    const newTodo = {
      title: this.state.todoTitle
    };
    this.props.dispatch(createTodo(newTodo)).then(() => {
      Alert.alert("Create succesful!");
      this.props.navigation.popToTop();
    });
  }

  render() {
    const loadingText = this.props.loading ? "Loading ..." : "";
    return (
      <View style={commonStyles.applicationView}>
        <View style={commonStyles.cardView}>
          <TextInput
            style={{ height: 40, fontSize: 20 }}
            onChangeText={todoTitle => this.setState({ todoTitle })}
            value={this.state.todoTitle}
            autoFocus={true}
          />
        </View>
        <StatusBar text={loadingText} type={"info"} />
        <StatusBar text={this.props.error} type={"error"} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  todoDetails: state.todoDetails,
  error: state.error,
  loading: state.loading
});

export default connect(mapStateToProps)(CreateScreen);
