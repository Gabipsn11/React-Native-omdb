// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ favorites, setFavorites }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const searchMovies = async () => {
        if (searchQuery) {
            const response = await fetch(`http://www.omdbapi.com/?s=${searchQuery}&apikey=e06e9841`);
            const data = await response.json();
            setMovies(data.Search || []);
        }
    };

    const toggleFavorite = (movie) => {
        if (favorites.some(fav => fav.imdbID === movie.imdbID)) {
            setFavorites(favorites.filter(fav => fav.imdbID !== movie.imdbID));
        } else {
            setFavorites([...favorites, movie]);
        }
    };

    const handleMovieClick = async (movieID) => {
        const response = await fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=e06e9841`);
        const movieDetails = await response.json();
        setSelectedMovie(movieDetails);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar filmes..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={searchMovies}
            />
            <FlatList
                data={movies}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <TouchableOpacity onPress={() => handleMovieClick(item.imdbID)}>
                            <Image source={{ uri: item.Poster }} style={styles.poster} />
                            <Text style={styles.title}>{item.Title}</Text>
                            <TouchableOpacity onPress={() => toggleFavorite(item)}>
                                <Ionicons 
                                    name={favorites.some(fav => fav.imdbID === item.imdbID) ? "heart" : "heart-outline"} 
                                    size={24} 
                                    color="red" 
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item.imdbID}
                numColumns={2} // Exibe dois cards por linha
            />

            {/* Modal para exibir detalhes do filme */}
            {selectedMovie && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedMovie.Title}</Text>
                            <Image source={{ uri: selectedMovie.Poster }} style={styles.modalPoster} />
                            <Text style={styles.modalYear}>Ano: {selectedMovie.Year}</Text>
                            <Text style={styles.modalType}>Tipo: {selectedMovie.Type}</Text>
                            <Text style={styles.modalPlot}>{selectedMovie.Plot}</Text>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButtonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5', // Fundo mais claro para contraste
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff', // Fundo branco para a barra de pesquisa
    },
    card: {
        flex: 1,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3, // Sombra para destaque
        overflow: 'hidden',
    },
    poster: {
        width: '100%',
        height: 200,
        resizeMode: 'cover', // Cobrir o espaço do card
    },
    title: {
        marginVertical: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 5, // Pequeno espaço lateral
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalPoster: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    modalYear: {
        fontSize: 16,
        marginBottom: 5,
    },
    modalType: {
        fontSize: 16,
        marginBottom: 5,
    },
    modalPlot: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
