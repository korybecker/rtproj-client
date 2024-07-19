import { useState, useEffect } from 'react';
import { Task } from '../interfaces';
import axioz from '../axioz';
import { TextField, Button, Checkbox, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Task>({ id: 0, task: '', completed: false});

    useEffect(() => {
        axioz.get('/api/tasks/')
            .then(res => setTasks(res.data))
            .catch(err => console.error(err));
    }, []);

    const addTask = () => {
        axioz.post('/api/tasks/', newTask)
            .then(res => setTasks([...tasks, res.data]))
            .catch(err => console.error(err));
        setNewTask({...newTask, task: ''});
    }

    const deleteTask = (id: number) => {
        axioz.delete(`/api/tasks/${id}/`)
            .then(() => setTasks(tasks.filter(task => task.id != id)))
            .catch(err => console.error(err));
    }

    const toggleCompleted = (id: number) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        if (!taskToUpdate) return;

        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed }

        axioz.put(`/api/tasks/${id}/`, updatedTask)
            .then(() => {
                const updatedTasks = tasks.map(task => task.id === id ? updatedTask : task)
                setTasks(updatedTasks);
            })
            .catch(err => console.error(err));
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4">Tasks</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                    label="Task"
                    value={newTask.task}
                    onChange={e => setNewTask({ ...newTask, task: e.target.value })}
                    sx={{ mr: 2 }}
                />
                <Button variant="contained" color="primary" onClick={addTask}>Add Task</Button>
            </Box>
            <List>
                {tasks.map((task: Task) => (
                    <ListItem key={task.id} dense sx={{ boxShadow: 5 }}>
                        <ListItemText primary={task.task} secondary={task.completed ? "Completed" : "Pending"} />
                        <ListItemSecondaryAction>
                            <Checkbox edge="end" checked={task.completed} onChange={() => toggleCompleted(task.id)} />
                            <IconButton edge="end" color="secondary" onClick={() => deleteTask(task.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Box>
        // <div>
        //     <h2>Tasks</h2>
        //     <input 
        //         type="text"
        //         placeholder="Task"
        //         value={newTask.task}
        //         onChange={e => setNewTask({...newTask, task: e.target.value})}
        //     />
        //     <button onClick={addTask}>Add Task</button>
        //     <ul>
        //         {tasks.map((task: Task) => (
        //             <div key={task.id}>
        //                 <li>{task.task} - {task.completed ? "Completed" : "Pending"}</li>
        //                 <button onClick={() => deleteTask(task.id)}>Delete</button>
        //                 <input 
        //                     type="checkbox" 
        //                     checked={task.completed} 
        //                     onChange={() => toggleCompleted(task.id)}
        //                 />
        //             </div>
        //         ))}
        //     </ul>
        // </div>
    )
}

export default Tasks;