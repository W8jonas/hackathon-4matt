
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import Button from '@mui/material/Button';

import logo from "../assets/Logo_da_UFJF_2.png"
import './header.css';
import { Link } from 'react-router-dom';

const pages = [
    // {path: '/', name: 'Home'},
    {path: '/', name: 'Alunos'},
    {path: '/dashboard', name: 'Painel'},
];


export function Header({ onLayoutClick, serviceNowActive, onActiveServiceNow, webhookSiteActive, onActiveWebhookSite }) {

    return (
        <AppBar position="static" className="appHeader">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={logo} alt="Logo UFJF" />

                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        {pages.map((page) => (
                            <Link to={page.path}>
                                <Button
                                    key={page.name}
                                    onClick={() => { }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={serviceNowActive}
                                    onChange={onActiveServiceNow}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    size="small"
                                    color="success"
                                />
                            }
                            label="Ativar webhook serviceNow"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={webhookSiteActive}
                                    onChange={onActiveWebhookSite}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    size="small"
                                    color="success"
                                />
                            }
                            label="Ativar webhook site"
                        />
                    </FormGroup>

                    <Button
                        key={'layout-button'}
                        id={'layout-button'}
                        onClick={onLayoutClick && onLayoutClick}
                        sx={{ display: 'none' }}
                    >
                        Layout
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
