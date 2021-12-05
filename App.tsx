import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    ToastAndroid,
    useColorScheme,
    View,
} from 'react-native';
import database from '@react-native-firebase/database';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Center} from './src/types';
import {ClassroomCard, ClassroomView} from './src/ui';

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [center, setCenter] = useState<Center | null>(null);
    const [selectedClassroom, setSelectedClassroom] = useState<number | null>(
        null
    );

    const fetchCenter = () => {
        database()
            .ref('/data/center')
            .once('value', snapshot => {
                setCenter(snapshot.val());
            })
            .catch(() => {
                ToastAndroid.show(
                    'Failed to load center info',
                    ToastAndroid.LONG
                );
            });
    };

    // This useEffect will fetch the center for the first time, or show a toast message if it fails
    useEffect(() => {
        if (!center) {
            fetchCenter();
        }
    }, [center]);

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const onClassroomClick = (index: number) => {
        setSelectedClassroom(index);
    };

    const onChildMove = () => {
        fetchCenter();
    };

    if (center && selectedClassroom !== null) {
        const classroom = center.classrooms[selectedClassroom];

        if (!classroom) {
            return (
                <View>
                    <Text>Couldn't load the classroom</Text>
                </View>
            );
        }

        return (
            <ClassroomView
                center={center}
                classroom={classroom}
                index={selectedClassroom}
                onChildMove={onChildMove}
                onClose={() => setSelectedClassroom(null)}
            />
        );
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <View
                    style={{
                        backgroundColor: isDarkMode
                            ? Colors.black
                            : Colors.white,
                    }}>
                    {center &&
                        center.classrooms.map((classroom, index) => {
                            return (
                                <ClassroomCard
                                    key={classroom.id}
                                    index={index}
                                    classroom={classroom}
                                    onClassroomClick={onClassroomClick}
                                />
                            );
                        })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;
