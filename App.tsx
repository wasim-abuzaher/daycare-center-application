import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CenterView, ClassroomView} from './src/screens';
import {AppStackParamList} from './src/types';

const Stack = createNativeStackNavigator<AppStackParamList>();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Center'}
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="Center" component={CenterView} />
                <Stack.Screen name="Classroom" component={ClassroomView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
