// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
    const [favorites, setFavorites] = useState([]);

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen 
                    name="Home" 
                    children={() => <HomeScreen favorites={favorites} setFavorites={setFavorites} />} 
                    options={{
                        tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
                    }} 
                />
                <Tab.Screen 
                    name="Favorites" 
                    children={() => <FavoritesScreen favorites={favorites} />} 
                    options={{
                        tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />,
                    }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
