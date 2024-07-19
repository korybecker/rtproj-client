import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'react-calendar/dist/Calendar.css';
import { CalendarEvent } from '../interfaces';
import axioz from '../axioz';
import EventModal from './EventModal';
import { Typography, Box, Badge } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const ServerDay = (props: PickersDayProps<Dayjs> & { events?: CalendarEvent[] }) => {
    const { events = [], day, outsideCurrentMonth, ...other } = props;
  
    const isSelected =
        !outsideCurrentMonth && events.some(event => {
            const eventDate = dayjs(event.date);
            return eventDate.isSame(day, 'day'); 
    });

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={isSelected ? <FiberManualRecordIcon /> : undefined}
        sx={{ zIndex: 0 }}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  };

const CalendarComponent: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        axioz.get('/api/calendar/')
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));
    }, []);

    const addEvent = (title: string) => {
        if (selectedDate && !(selectedDate instanceof Array)) { // add event to single date only
            axioz.post('/api/calendar/', { title, date: selectedDate.toISOString().split('T')[0] })
                .then(res => setEvents([...events, res.data]))
                .catch(error => console.error('Error adding event:', error));
        }
    };

    const deleteEvent = (id: number) => {
        axioz.delete(`/api/calendar/${id}/`)
            .then(() => setEvents(events.filter(event => event.id != id)))
            .catch(err => console.error(err));
    }

    const selectedDateEvents = selectedDate
        ? events.filter(event => {
            const eventDate = dayjs(event.date);
            return eventDate.isSame(selectedDate, 'day');
        })
        : [];

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ p: 2 }}>
                <Typography variant="h4">Calendar</Typography>
                <EventModal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    events={selectedDateEvents}
                    onDelete={deleteEvent}
                    onAddEvent={addEvent}
                />
                <DateCalendar 
                    value={selectedDate}
                    onChange={(newDate: Dayjs) => {
                        setSelectedDate(newDate);
                        setModalIsOpen(true);
                    }}
                    slots={{
                        day: (dayProps) => <ServerDay {...dayProps} events={events} />,
                    }}
                    sx={{ boxShadow: 5 }}
                />
            </Box>
        </LocalizationProvider>
    );
};

export default CalendarComponent;