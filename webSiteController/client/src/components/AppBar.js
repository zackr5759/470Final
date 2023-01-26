import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {VideogameAsset} from "@mui/icons-material";
import Button from "@mui/material/Button";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Logout'];

function ResponsiveAppBar(props) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const cookieValueName = document.cookie
        .split('; ')
        .find((row) => row.startsWith('username='))
        ?.split('=')[1];

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="sticky">

            <Container maxWidth="xl">

                <Toolbar disableGutters sx = {{justifyContent: 'center'}}>

                    <VideogameAsset sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,  }} />

                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.35rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Bored Board Gaming
                    </Typography>

                    <Box sx={{ flexGrow: 0,  }}>
                        {props.displayProfile &&
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar/>
                                </IconButton>
                            </Tooltip>
                        }
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem> {cookieValueName} </MenuItem>
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    {((setting === "Logout") ? (<Button onClick={props.accountLogOut} sx={{xs: 'flex', alignItems: 'center', justifyContent: 'center' }}> Log Out</Button>) : <Typography textAlign="center">{setting}</Typography>)}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                </Toolbar>

            </Container>

        </AppBar>
    );
}
export default ResponsiveAppBar;