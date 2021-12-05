import React, {useEffect, useState} from 'react';
import {Center} from '../types';
import database from '@react-native-firebase/database';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
} from 'react-native';
import {ClassroomView} from './ClassroomView';
import {ClassroomCard} from './ClassroomCard';

interface Props {}

export function CenterView({}: Props): React.ReactElement {
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
        <SafeAreaView>
            <Text style={styles.title}>{center ? center.name : ''}</Text>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View>
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
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        paddingHorizontal: 24,
        fontWeight: '600',
    },
});
