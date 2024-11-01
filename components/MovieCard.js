import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MovieCard = ({ movie, onFavorite }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <Text style={styles.title}>{movie.Title}</Text>
      <Text>{movie.Year}</Text>
      <TouchableOpacity onPress={() => onFavorite(movie)}>
        <Text style={styles.favoriteButton}>❤️ Favoritar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    marginVertical: 5,
    fontWeight: 'bold',
  },
  favoriteButton: {
    fontSize: 20,
  },
});

export default MovieCard;
