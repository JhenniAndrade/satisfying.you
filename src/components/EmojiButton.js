import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ICON_SIZE = 60;

const EmojiButton = ({ label, color, onSelect }) => {
  let emoji;
  if (label === 'Péssimo') emoji = '😭';
  else if (label === 'Ruim') emoji = '🙁';
  else if (label === 'Neutro') emoji = '😐';
  else if (label === 'Bom') emoji = '🙂';
  else if (label === 'Excelente') emoji = '😄';

  return (
    <TouchableOpacity 
      style={styles.iconContainer} 
      onPress={() => onSelect(label)}
      activeOpacity={0.7}
    >
      <View style={[styles.circleIcon, { borderColor: color }]}>
        <Text style={[styles.emojiText, { color }]}>{emoji}</Text>
      </View>
      <Text style={styles.iconLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: { alignItems: 'center', width: '18%' },
  circleIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  emojiText: { fontSize: 36 },
  iconLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default EmojiButton;
