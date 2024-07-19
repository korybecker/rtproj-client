import { Link } from "react-router-dom"
import { AppBar, Toolbar, Button } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/calendar">Calendar</Button>
                <Button color="inherit" component={Link} to="/tasks">Tasks</Button>
            </Toolbar>
        </AppBar>
        // <div>
        //     <Link to="/">Home</Link>
        //     <Link to="/calendar">Calendar</Link>
        //     <Link to="/tasks">Task</Link>
        // </div>
    );
};

export default Navbar;