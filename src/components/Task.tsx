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
            <Modal 
                modalTitle="Delete Task"
                modalContent={`You will delete the task: <strong>${taskContent}</strong>`}
                taskId={taskId}
                onDeleteTask={onDeleteTask}
            />
        </div>
    )
}