import { AppBar, Button } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import logo from '../assets/img/cuisine.png';
import {useCallback, useState} from "react";
import AvatarDialog from "./AvatarDialog.jsx";
import useGetConnectedUser from "../components/hooks/useGetConnectedUser.jsx";
import {Link} from "react-router-dom";

const Navbar = () => {

    const localStorageToken = localStorage.getItem('token');

    const [myToken, setMyToken] = useState(localStorageToken);
    const user = useGetConnectedUser();

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('email');
        setMyToken(null);
    }, []);

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to='/'>
                        <img src={logo} alt="La Gova" style={{height: '50px'}}/>
                    </Link>
                </Typography>
                <Box sx={{display: { xs: 'none', md: 'flex' }, gap: '1em' }}>
                    <ul style={{ listStyleType: 'none', display: 'flex', gap: '1em' }}>
                        {
                            !myToken ? (
                                <>
                                    <Link to="/register">
                                        <button className="login-button">Créer un compte</button>
                                    </Link>
                                    <Link to="/login">
                                        <button className="login-button">Se connecter</button>
                                    </Link>
                                </>
                            ) : (
                                <li>
                                    <AvatarDialog firstName={user.connectedUser?.login} handleLogout={ handleLogout }/>
                                </li>
                            )
                        }
                        <li><a href="#"><Button>FR | EN</Button></a></li>
                    </ul>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;