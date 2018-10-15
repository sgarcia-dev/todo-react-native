import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, TouchableWithoutFeedback, Text } from "react-native";
import styles from "../common/styles";

export default function EditButton(props) {
  const { onPress } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={editBtnStyles.container}>
        <Text>Edit</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

EditButton.propTypes = {
  onPress: PropTypes.func
};

const editBtnStyles = StyleSheet.create({
  container: {
    marginRight: 20
  }
});
