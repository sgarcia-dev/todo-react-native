import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

import commonStyles from "./styles";

export default function StatusBar(props) {
  const { text, type, isVisible } = props;

  if (!text) {
    return null;
  }

  return (
    <View style={[commonStyles.statusBarContainer, backgroundColor()]}>
      <Text style={commonStyles.statusBarText}>{text}</Text>
    </View>
  );

  function backgroundColor() {
    if (type === "error") {
      return { backgroundColor: "#d50000" };
    } else if (type === "info") {
      return { backgroundColor: "#1E88E5" };
    } else if (type === "success") {
      return { backgroundColor: "#2E7D32" };
    } else {
      return {};
    }
  }
}

StatusBar.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string
};
