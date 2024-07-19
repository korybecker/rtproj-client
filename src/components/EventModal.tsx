import { useState } from 'react';
import Modal from 'react-modal';
import { CalendarEvent } from '../interfaces';
import { Box, List, Button, Typography, TextField, IconButton, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface EventModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    events: CalendarEvent[];
    onDelete: (id: number) => void;
    onAddEvent: (title: string) => void;
};

const EventModal: React.FC<EventModalProps> = ({ isOpen, onRequestClose, events, onDelete, onAddEvent}) => {
    const [title, setTitle] = useState('');
    console.log(events);

    const handleAddEvent = () => {
        onAddEvent(title);
        setTitle('');
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} >
            <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 24, width: 400, mx: 'auto', mt: 10}}>
                <Typography variant="h6">Events</Typography>
                <TextField
                    fullWidth
                    label="Title"
                    onChange={e => setTitle(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleAddEvent} sx={{ mb: 2 }}>Add Event</Button>
                <List>
                    {events.map((event) => (
                        <ListItem key={event.id} secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(event.id)}>
                                <DeleteIcon />
                            </IconButton>
                        }>
                            <ListItemText primary={`${event.title} - ${event.date}`} />
                        </ListItem>
                    ))}
                </List>
                <Button variant="outlined" onClick={onRequestClose}>Close</Button>
            </Box>
            {/* <h2>Events</h2>
            <input 
                type="text" 
                placeholder="Title..." 
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
            />
            <button onClick={handleAddEvent}>Add Event</button>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        {event.title} - {event.date}
                        <button onClick={() => onDelete(event.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={onRequestClose}>Close</button> */}
        </Modal>
    );
};

export default EventModal;