import React from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import commonStyles from "./styles";

export default function EditButton(props) {
  const { onPress, text } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={commonStyles.navButtonContainer}>
        <Text style={commonStyles.navButtonText}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

EditButton.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string
};
