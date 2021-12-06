import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CenterScreen, ClassroomScreen} from './src/screens';
import {AppStackParamList} from './src/types';

const Stack = createNativeStackNavigator<AppStackParamList>();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Center'}
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="Center" component={CenterScreen} />
                <Stack.Screen name="Classroom" component={ClassroomScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
