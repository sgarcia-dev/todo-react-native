import React from "react";
import { View, TextInput, Alert } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getTodo, updateTodo } from "../redux/todo-actions";
import StatusBar from "../common/status-bar";
import NavTextButton from "../common/nav-text-button";
import commonStyles from "../common/styles";

export class EditScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Editing Todo ...",
    headerRight: (
      <NavTextButton text="Save" onPress={navigation.getParam("_saveTodo")} />
    )
  });

  constructor(props) {
    super(props);
    const id = this.props.navigation.getParam("todoId", "NO-ID");
    this.state = { id, todoTitle: null };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      _saveTodo: this.saveTodo.bind(this, this.state.id)
    });

    this.props.dispatch(getTodo(this.state.id));
  }

  componentDidUpdate(prevProps) {
    const { todoDetails } = this.props;

    if (
      !this.state.todoTitle ||
      todoDetails.title !== prevProps.todoDetails.title
    ) {
      this.setState(prevState => ({
        ...prevState,
        todoTitle: todoDetails.title
      }));
    }
  }

  saveTodo() {
    const newTodo = {
      ...this.props.todoDetails,
      title: this.state.todoTitle
    };
    this.props.dispatch(updateTodo(this.state.id, newTodo)).then(() => {
      Alert.alert("Update succesful!");
      this.props.navigation.popToTop();
    });
  }

  render() {
    const loadingText = this.props.loading ? "Loading ..." : "";
    return (
      <View style={{ flex: 1 }}>
        <View style={commonStyles.applicationView}>
          <View style={commonStyles.cardView}>
            <TextInput
              style={{ height: 40, fontSize: 20 }}
              onChangeText={todoTitle => this.setState({ todoTitle })}
              value={this.state.todoTitle}
              autoFocus={true}
            />
          </View>
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

export default connect(mapStateToProps)(EditScreen);
