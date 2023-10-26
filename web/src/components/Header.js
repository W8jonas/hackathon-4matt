
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import logo from "../assets/Logo_da_UFJF_2.png"
import './header.css';

const pages = ['Painel', 'Alunos'];

export function Header({onLayoutClick}) {

    return (
        <AppBar position="static" className="appHeader">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={logo} alt="Logo UFJF" />

                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={()=>{}}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            key={'layout-button'}
                            onClick={onLayoutClick && onLayoutClick}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Layout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
