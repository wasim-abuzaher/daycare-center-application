import React from 'react';
import {Classroom} from '../types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
    classroom: Classroom;
    index: number;
    onClassroomClick: (id: number) => void;
}

export function ClassroomCard({
    classroom,
    index,
    onClassroomClick,
}: Props): React.ReactElement {
    return (
        <TouchableOpacity onPress={() => onClassroomClick(index)}>
            <View style={styles.container}>
                <Text style={styles.title}>{classroom.name}</Text>
                <Text style={styles.description}>
                    Children:{' '}
                    {classroom.children ? classroom.children.length : 0}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
    },
    description: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
});
