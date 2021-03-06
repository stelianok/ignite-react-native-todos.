import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import { Task } from './TasksList';

interface TaskItemProps {
    index: number;
    item: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, taskNewTitle: string) => void;
}
export function TaskItem({ index, item, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTaskValue, setUpdatedTaskValue] = useState(item.title);

    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setUpdatedTaskValue(item.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask(item.id, updatedTaskValue);
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            }
            else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing]);

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {item.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                                style={styles.taskMarkerDone}
                            />
                        )}
                    </View>

                    <TextInput
                        style={item.done ? styles.taskTextDone : styles.taskText}
                        value={updatedTaskValue}
                        onChangeText={setUpdatedTaskValue}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer} >
                {isEditing ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={22} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleStartEditing}
                    >
                        <Icon name="edit" size={22} color="#b2b2b2" />
                    </TouchableOpacity>
                )}

                <View
                    style={styles.iconsDivider}
                />

                <TouchableOpacity
                    disabled={isEditing}
                    onPress={() => removeTask(item.id)}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium',
        marginLeft: 15,
    },
    iconsContainer: {
        flexDirection: 'row',
        marginRight: 15,
        marginVertical: 15,

        justifyContent: 'space-between',
        alignItems: 'center',

    },
    iconsDivider: {
        backgroundColor: '#b2b2b2',
        width: 1.25,
        height: 25,

        marginHorizontal: 5,
    },
});