import { useState } from 'react';
import styles from './Modal.module.css';
import { Trash, X } from 'phosphor-react';

interface ModalProps {
    modalTitle: string
    modalContent: string,
    taskId: number,
    onDeleteTask: (task: number) => void;
}

export function Modal({ modalTitle, modalContent, taskId, onDeleteTask }: ModalProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalClose, setModalClose] = useState(false);
    
    function toggleModal() {
        if (!modalOpen) {
            setModalOpen(true);
            setModalClose(false);
        }
        else {
            setModalClose(true);
            setTimeout(() => {
                setModalOpen(false);
            }, 280);
        }
    }
    
    function handleDeleteTask() {
        toggleModal();
        setTimeout(() => {
            onDeleteTask(taskId);
        }, 280);
    }

    return (
        <div>
            <button onClick={toggleModal}><Trash size={18} /> </button>
            {modalOpen && (
                <div className={styles.modal}>
                    <div className={`${styles.modalContent} ${modalClose ? styles.modalContentClose : styles.modalContentOpen}`}>
                        <header>
                            <h3>{modalTitle}</h3>
                            <span 
                                className={styles.closeButton}
                                onClick={toggleModal}
                            >
                                <X/>
                            </span>
                        </header>
                        <p dangerouslySetInnerHTML={{ __html: modalContent}} />
                        <footer>
                            <a 
                                href='#' 
                                id="btnModal" 
                                type="button"
                                className={styles.closeButton}
                                onClick={handleDeleteTask}
                            >
                                <Trash size={16} />
                                Delete
                            </a>
                        </footer>
                    </div>
                </div>
            )}
      </div>
    );   
}