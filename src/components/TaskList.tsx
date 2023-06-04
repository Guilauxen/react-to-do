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
                        placeholder='Adicione uma nova tarefa'
                        onChange={handleNewTaskChange}
                        value={newTaskText}
                        required
                    />
                    <button type='submit'>
                        Criar
                        <PlusCircle size={20} />
                    </button>
                </form>
            </header>
            <div className={styles.taskListContentTop}>
                <p className={styles.createdTask}>
                    Tarefas criadas
                    <span>{totalTask}</span>
                </p>
                <p className={styles.finishedTask}>
                    Concluídas
                    <span>{totalDone} de {totalTask}</span>
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
                        <p>Você ainda não tem tarefas cadastradas</p>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </div>
            }
        </main>
    )
}