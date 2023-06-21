import { View, Text, StyleSheet } from 'react-native';

const Doing = ({ doing: { content, deadline } }) => {
  return (
    <View style={styles.viewerContainer}>
      <View style={styles.viewerTextContainer}>
        <Text style={styles.viewerTextContent}>{content}</Text>
        <Text style={styles.viewerTextDeadline}>{deadline}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewerContainer: {
    flex: 1,
    marginTop: 64,
    width: '80%',
  },
  viewerTextContainer: {
    gap: 8,
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  viewerTextContent: {
    maxHeight: 100,
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewerTextDeadline: {
    fontSize: 12,
    textAlign: 'right',
  },
});

export default Doing;
