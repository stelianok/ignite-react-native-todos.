import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameNameExists = tasks.find((task) => (task.title === newTaskTitle));


    if (!taskWithSameNameExists) {
      const task: Task = {
        id: Number(new Date().getTime()),
        title: newTaskTitle,
        done: false,
      }

      setTasks(oldState => [...oldState, task]);
    }
    else {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com mesmo nome");
    }

  }

  function handleEditTask(id: number, taskNewTitle: string) {
    const updatedTasks: Task[] = tasks.map((task) => {
      if (task.id === id) {
        task.title = taskNewTitle;
      }
      return task;
    });

    setTasks(updatedTasks);
  }
  function handleToggleTaskDone(id: number) {
    const updatedTasks: Task[] = tasks.map((task) => {
      if (task.id === id) {
        task.done = (task.done ? false : true);
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks(oldState => oldState.filter(
              task => task.id !== id
            ));
          },
          style: "default",
        }
      ]
    )

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})