import React from "react";
import PropTypes from "prop-types";

import {
  View,
  Text,
  Switch,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";

import commonStyles from "../common/styles";

export default function Todo({ todo, onPress, onToggle, onDelete }) {
  const PREVIEW_LENGTH = 40;

  return (
    <View style={todoStyles.todoContainer}>
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={onPress.bind(this, todo)}>
          <View>
            <Text style={[commonStyles.text, textState()]}>
              {titlePreview()}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flexGrow: 0 }}>
        <TouchableWithoutFeedback onPress={onDelete.bind(this, todo)}>
          <View>
            <Text style={todoStyles.deleteText}>🗑</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flexGrow: 0 }}>
        <Switch
          value={todo.completed}
          onValueChange={onToggle.bind(this, todo)}
        />
      </View>
    </View>
  );

  function textState() {
    return {
      textDecorationLine: todo.completed ? "line-through" : "none",
      color: todo.completed ? "gray" : "black"
    };
  }

  function titlePreview() {
    return todo.title.length > PREVIEW_LENGTH
      ? `${todo.title.substring(1, PREVIEW_LENGTH)}...`
      : todo.title;
  }
}

const todoStyles = StyleSheet.create({
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  deleteText: {
    fontSize: 20,
    marginRight: 10
  }
});

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
