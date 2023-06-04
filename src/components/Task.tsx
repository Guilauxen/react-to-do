import { Trash } from "phosphor-react";
import styles from './Task.module.css'
import { ChangeEvent, useState } from "react";
import { Modal } from "./Modal";

interface TaskProps {
    taskId: number
    taskContent: string
    onDeleteTask: (task: number) => void;
    onTaskDone: (task: number, taskDone: boolean) => void;
}

export function Task({ taskId, taskContent, onDeleteTask, onTaskDone }: TaskProps) {

    const [taskDone, setTaskDone] = useState(false);

    function handleTaskDone(event: ChangeEvent<HTMLInputElement>) {
        const checked = (event.target.checked);
        if (checked) {
            setTaskDone(true);
        }
        else {
            setTaskDone(false);
        }
        onTaskDone(taskId, checked);
    }

    function handleDeleteTask() {
        onDeleteTask(taskId);
    }

    return (
        <div className={styles.task}>
            <label className={styles.taskCheckbox}>
                <input 
                    type="checkbox" 
                    id="check"
                    onChange={handleTaskDone} 
                />
                <span className={styles.taskCheck} />
            </label>
            <p className={taskDone ? styles.taskDoneText : styles.taskOpenText}>
                {taskContent}
            </p>
            <button onClick={handleDeleteTask}  title="Deletar Tarefa">
                <Trash size={18} /> 
            </button>
            <Modal 
                modalTitle="Deletar Tarefa"
                modalContent={`Você irá excluir a tarefa: <strong>${taskContent}</strong>`}
            />
        </div>
    )
}