import styles from './Task.module.css'
import { ChangeEvent, useState, useEffect } from "react";
import { Modal } from "./Modal";

interface TaskProps {
    taskId: number
    taskContent: string
    onDeleteTask: (task: number) => void;
    onTaskDone: (task: number, taskDone: boolean) => void;
}

export function Task({ taskId, taskContent, onDeleteTask, onTaskDone }: TaskProps) {

    const [taskDone, setTaskDone] = useState(false);
    const [taskAppear, setTaskAppear] = useState(false);

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

    useEffect(() => {
        setTimeout(() => {
            setTaskAppear(true);
        }, 100);
    }, []);

    function handleDeleteTask() {
        setTimeout(() => {
            onDeleteTask(taskId);
        }, 300);
      }

    return (
        <div className={`${styles.task} ${taskAppear ? styles.taskAppear : ''}`}>
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
                onDeleteTask={handleDeleteTask}
            />
        </div>
    )
}