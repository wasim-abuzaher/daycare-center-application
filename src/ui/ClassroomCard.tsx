import React from 'react';
import {Classroom} from '../types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
    /**
     * Function that returns the number of children who are checked in or checked out of the classroom,
     * or 0 if classroom doesn't have children
     * @param arg one of 'in' or 'out'
     */
    const getStat = (arg: string): number => {
        if (!classroom.children) {
            return 0;
        }

        const totalChildren = classroom.children.length;
        const checkedInChildren = classroom.children.filter(
            c => c.checked_in
        ).length;
        return arg === 'in'
            ? checkedInChildren
            : totalChildren - checkedInChildren;
    };

    return (
        <TouchableOpacity onPress={() => onClassroomClick(index)}>
            <View style={styles.container}>
                <Text style={styles.title}>{classroom.name}</Text>
                <View style={styles.stats}>
                    <Text style={styles.description}>
                        Children:{' '}
                        {classroom.children ? classroom.children.length : 0}
                    </Text>
                    <View style={styles.stats}>
                        <MaterialIcons name={'how-to-reg'} size={20} />
                        <Text style={styles.statDescription}>
                            {getStat('in')}
                        </Text>
                        <MaterialIcons name={'highlight-off'} size={20} />
                        <Text style={styles.statDescription}>
                            {getStat('out')}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: 120,
        justifyContent: 'center',
        paddingHorizontal: 24,
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
    },
    stats: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    description: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    statDescription: {
        marginHorizontal: 4,
        fontSize: 18,
        fontWeight: '400',
    },
});
