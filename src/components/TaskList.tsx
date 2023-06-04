import styles from './TaskList.module.css'
import { ClipboardText, PlusCircle } from 'phosphor-react'
import { Task } from './Task'
import { useState, FormEvent, ChangeEvent } from 'react'

interface Task {
    id: number;
    content: string;
    done: boolean;
}

export function TaskList() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskText, setNewTaskText] = useState('')

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();

        const newTask: Task = {
            id: tasks.length + 1,
            content: newTaskText,
            done: false
        }
        setTasks([...tasks, newTask]);
        setNewTaskText('');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('')
        setNewTaskText(event.target.value);
    }

    function deleteTask(taskToDelete: number) {
        const tasksWithoutDeleteOne = tasks.filter(task => {
            return task.id != taskToDelete
        })

        setTasks(tasksWithoutDeleteOne.map((tasks, index) => (
            {...tasks, id: index + 1 }
        )));
    }

    function taskDone(taskId: number, taskChange: boolean) {
        const updatedTask = tasks.map(task => {
            if (task.id == taskId) {
                return {
                    ...task,
                    done: taskChange
                }
            }
            return task;
        })
        setTasks(updatedTask);
    }

    const totalTask = tasks.length;
    const totalDone = tasks.filter(task => {return task.done == true}).length;

    return (
        <main className={styles.taskList}>
            <header>
                <form onSubmit={handleCreateNewTask}>
                    <input 
                        type='text'
                        placeholder='Create new task...'
                        onChange={handleNewTaskChange}
                        value={newTaskText}
                        required
                    />
                    <button type='submit'>
                        Create
                        <PlusCircle size={20} />
                    </button>
                </form>
            </header>
            <div className={styles.taskListContentTop}>
                <p className={styles.createdTask}>
                    Created Tasks
                    <span>{totalTask}</span>
                </p>
                <p className={styles.finishedTask}>
                    Done
                    <span>{totalDone} of {totalTask}</span>
                </p>
            </div>
            
            {
            totalTask > 0 
                ? 
                    tasks.map(task => {
                        return (
                            <Task 
                                key={task.id}
                                taskId={task.id}
                                taskContent={task.content}
                                onDeleteTask={deleteTask}
                                onTaskDone={taskDone}
                            />
                        )
                    })
                :
                    <div className={styles.taskListContent}>
                        <ClipboardText className={styles.taskContentIcon} size={56}/>
                        <p>You don't have any tasks registered yet.</p>
                        <p>Create tasks and organize your to-do items.</p>
                    </div>
            }
        </main>
    )
}