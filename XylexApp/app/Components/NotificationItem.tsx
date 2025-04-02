import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = {
  image?: string;         // optional image URL or static require()
  title: string;
  subtitle?: string;
  date: string;
};

export default function NotificationItem({ image, title, subtitle, date }: Props) {
  return (
    <View style={styles.container}>
      {image ? (
        <Image source={typeof image === 'string' ? { uri: image } : image} style={styles.thumbnail} />
      ) : (
        <View style={styles.thumbnailPlaceholder} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
        <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  thumbnail: {
    width: 54,
    height: 54,
    borderRadius: 8,
    resizeMode: 'cover',
    marginRight: 12,
  },
  thumbnailPlaceholder: {
    width: 54,
    height: 54,
    borderRadius: 8,
    backgroundColor: '#444',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
  subtitle: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 2,
  },
  date: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
});
