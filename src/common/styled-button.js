import React from "react";
import PropTypes from "prop-types";

import { View, Text, TouchableHighlight } from "react-native";

import commonStyles from "./styles";

export default function StyledButton(props) {
  const { onPress, text } = props;
  const layoutStyle = props.layoutStyle || {};
  const buttonStyle = props.buttonStyle || {};
  const textStyle = props.textStyle || {};
  const activeStyles = props.isActive
    ? {
        backgroundColor: "#1565C0"
      }
    : {};

  return (
    <TouchableHighlight onPress={onPress.bind(this)} style={layoutStyle}>
      <View style={[buttonStyle, commonStyles.button, activeStyles]}>
        <Text style={[textStyle, commonStyles.buttonText]}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
}

StyledButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  layoutStyle: PropTypes.any,
  buttonStyle: PropTypes.any,
  textStyle: PropTypes.any
};

StyledButton.defaultProps = {
  isActive: false,
  layoutStyle: {},
  buttonStyle: {},
  textStyle: {}
};
