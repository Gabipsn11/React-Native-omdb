// screens/FavoritesScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const FavoritesScreen = ({ favorites }) => {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.Poster }} style={styles.poster} />
            <Text style={styles.title}>{item.Title} ({item.Year})</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {favorites.length === 0 ? (
                <Text style={styles.emptyMessage}>Nenhum favorito adicionado ainda.</Text>
            ) : (
                <FlatList
                    data={favorites}
                    renderItem={renderItem}
                    keyExtractor={item => item.imdbID}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    card: {
        flexDirection: 'column',
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
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#777',
    },
});

export default FavoritesScreen;
