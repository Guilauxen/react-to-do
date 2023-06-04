import './global.css';
import styles from './App.module.css';
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';

export function App() {

    return (
        <div>
            <Header />

            <div className={styles.wrapper}>
                <TaskList />
            </div>
        </div>
    )
}