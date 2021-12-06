import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Button,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {AppStackParamList, Child, Classroom} from '../types';
import database from '@react-native-firebase/database';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AppStackParamList, 'Classroom'>;

export function ClassroomScreen({
    navigation,
    route,
}: Props): React.ReactElement {
    const [classroom, setClassroom] = useState<Classroom | null>(null);
    const [moveChildIndex, setMoveChildIndex] = useState<number>(-1);

    useEffect(() => {
        const reference = database()
            .ref(`data/center/classrooms/${route.params.index}`)
            .on('value', snapshot => {
                setClassroom(snapshot.val());
            });

        // Stop listening for updates when no longer required
        return () => database().ref('/data/center').off('value', reference);
    }, [route.params.index]);

    const onChildCheckInStatusChange = (
        newValue: boolean,
        childIndex: number
    ) => {
        database()
            .ref(
                `/data/center/classrooms/${route.params.index}/children/${childIndex}`
            )
            .update({
                checked_in: newValue,
            })
            .catch(() =>
                ToastAndroid.show(
                    'Check in update was unsuccessful',
                    ToastAndroid.SHORT
                )
            );
    };

    const onChildMoveButtonClick = (childIndex: number) => {
        setMoveChildIndex(childIndex);
    };

    const onMoveToClassroomClick = async (newClassroom: Classroom) => {
        if (classroom && classroom.children) {
            const currentClassroomChildren: Array<Child> = classroom.children;
            const newClassroomIndex = route.params.center.classrooms.findIndex(
                c => c.id === newClassroom.id
            );

            const child = currentClassroomChildren.find(
                (c, i) => i === moveChildIndex
            );

            if (child && newClassroomIndex !== -1) {
                const updatedNewClassroomChildren: Array<Child> =
                    newClassroom.children
                        ? [...newClassroom.children, child]
                        : [child];
                const newClassroomChildrenReference = database().ref(
                    `/data/center/classrooms/${newClassroomIndex}`
                );

                const updatedCurrentClassroomChildren = [
                    ...currentClassroomChildren,
                ];
                updatedCurrentClassroomChildren.splice(moveChildIndex, 1);
                const currentClassroomReference = database().ref(
                    `/data/center/classrooms/${route.params.index}`
                );

                setMoveChildIndex(-1);

                await newClassroomChildrenReference.update({
                    children: updatedNewClassroomChildren,
                });
                await currentClassroomReference.update({
                    children: updatedCurrentClassroomChildren,
                });

                ToastAndroid.show(
                    `${child.fullName} has been moved to ${newClassroom.name}`,
                    ToastAndroid.LONG
                );
            }
        }
    };

    const renderLoading = () => {
        if (!classroom) {
            return (
                <View style={styles.activityIndicatorView}>
                    <ActivityIndicator />
                </View>
            );
        }
    };

    const renderMoveModal = () => {
        return (
            <Modal
                animationType="slide"
                visible={moveChildIndex !== -1}
                onRequestClose={() => {
                    setMoveChildIndex(-1);
                }}>
                <Text style={styles.title}>Move Child To:</Text>
                <ScrollView>
                    {route.params.center.classrooms
                        .filter((c, i) => i !== route.params.index)
                        .map(c => {
                            return (
                                <TouchableOpacity
                                    key={c.id}
                                    style={styles.listItem}
                                    onPress={() => onMoveToClassroomClick(c)}>
                                    <Text style={styles.modalDescription}>
                                        {c.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                </ScrollView>
                <View style={styles.cancelButtonView}>
                    <Button
                        title={'Cancel'}
                        onPress={() => setMoveChildIndex(-1)}
                    />
                </View>
            </Modal>
        );
    };

    const renderClassroom = () => {
        if (classroom) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>{classroom.name}</Text>
                    <ScrollView style={styles.scrollView}>
                        {classroom.children &&
                            classroom.children.map((child, childIndex) => {
                                return (
                                    <View
                                        key={child.fullName + '-' + childIndex}
                                        style={styles.listItem}>
                                        <Text style={styles.description}>
                                            {child.fullName}
                                        </Text>
                                        <View style={styles.actions}>
                                            <View style={styles.checkedInView}>
                                                <Text>Checked In</Text>
                                                <CheckBox
                                                    value={child.checked_in}
                                                    onValueChange={newValue =>
                                                        onChildCheckInStatusChange(
                                                            newValue,
                                                            childIndex
                                                        )
                                                    }
                                                />
                                            </View>
                                            {route.params.center
                                                .allClassroomsAccessible && (
                                                <Button
                                                    title={'Move'}
                                                    onPress={() =>
                                                        onChildMoveButtonClick(
                                                            childIndex
                                                        )
                                                    }
                                                />
                                            )}
                                        </View>
                                    </View>
                                );
                            })}
                    </ScrollView>
                    {renderMoveModal()}
                </View>
            );
        }
    };

    const renderButton = () => {
        return (
            <View style={styles.returnButtonView}>
                <Button
                    title={'Return'}
                    onPress={() => navigation.navigate('Center')}
                />
            </View>
        );
    };

    return (
        <SafeAreaView>
            {renderClassroom()}
            {renderButton()}
            {renderLoading()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    activityIndicatorView: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        marginTop: 54,
        paddingBottom: 8,
    },
    scrollView: {
        marginBottom: 60,
        paddingBottom: 8,
    },
    listItem: {
        height: 96,
        paddingHorizontal: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 24,
        padding: 20,
        fontWeight: '600',
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 1,
        textAlign: 'center',
    },
    description: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    modalDescription: {
        marginTop: 8,
        fontSize: 24,
        fontWeight: '400',
    },
    actions: {
        display: 'flex',
    },
    checkedInView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    returnButtonView: {
        position: 'absolute',
        top: 8,
        left: 24,
    },
    cancelButtonView: {
        marginBottom: 16,
        marginRight: 16,
        marginLeft: '75%',
    },
});
