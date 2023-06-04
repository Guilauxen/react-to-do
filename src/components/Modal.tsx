import { useState } from 'react';
import styles from './Modal.module.css';
import { Trash, Upload, X } from 'phosphor-react';

interface ModalProps {
    modalTitle: string
    modalContent: string
}

export function Modal({ modalTitle, modalContent }: ModalProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <div>
            <button onClick={toggleModal}><Upload /></button>
            {modalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
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
                            <a href='#' id="btnModal" type="button"
                                className={styles.closeButton}
                                onClick={toggleModal}>
                                <Trash size={16} />
                                Excluir
                            </a>
                        </footer>
                    </div>
                </div>
            )}
      </div>
    );   
}