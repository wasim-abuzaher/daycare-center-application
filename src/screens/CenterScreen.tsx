import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import {AppStackParamList, Center} from '../types';
import database from '@react-native-firebase/database';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
} from 'react-native';
import {ClassroomCard} from '../ui';

type Props = NativeStackScreenProps<AppStackParamList, 'Center'>;

export function CenterScreen({navigation}: Props): React.ReactElement {
    const [center, setCenter] = useState<Center | null>(null);

    /**
     * Connect to Firebase database to fetch center
     */
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

    /**
     * Fetch the center when this view gets focus
     */
    useFocusEffect(() => {
        fetchCenter();
    });

    /**
     * Navigates to the Classroom screen
     * @param index
     */
    const onClassroomClick = (index: number) => {
        if (center) {
            const classroom = center.classrooms[index];
            if (classroom) {
                navigation.navigate('Classroom', {
                    center,
                    index,
                });
            } else {
                ToastAndroid.show(
                    "We couldn't navigate to classroom",
                    ToastAndroid.LONG
                );
            }
        }
    };

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
        padding: 24,
        fontWeight: '600',
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 1,
        textAlign: 'center',
    },
});
