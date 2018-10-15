import React from "react";
import { View, Button, Text } from "react-native";
import { connect } from "react-redux";

import { getTodo } from "../redux/todo-actions";
import StatusBar from "../common/status-bar";
import NavTextButton from "../common/nav-text-button";
import commonStyles from "../common/styles";

export class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Todo Details",
    headerRight: (
      <NavTextButton text="Edit" onPress={navigation.getParam("_editTodo")} />
    )
  });

  constructor(props) {
    super(props);
    const id = this.props.navigation.getParam("todoId", "NO-ID");
    this.state = { id };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      _editTodo: this.editTodo.bind(this, this.state.id)
    });

    this.props.dispatch(getTodo(this.state.id));
  }

  editTodo() {
    this.props.navigation.push("Edit", { todoId: this.state.id });
  }

  render() {
    const { todoDetails, loading } = this.props;
    const loadingText = loading ? "Loading ..." : "";
    return (
      <View style={{ flex: 1 }}>
        <View style={commonStyles.applicationView}>
          <View style={commonStyles.cardView}>
            <Text style={{ fontSize: 20 }}>{todoDetails.title}</Text>
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

export default connect(mapStateToProps)(DetailsScreen);
