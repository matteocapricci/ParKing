import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#728BBE',
            main: '#445478',
            dark: '#304269',
            contrastText: '#fff',
            opacity: 'rgba(79,195,247,0.16)'
        },
        secondary: {
            light: '#FFBF4B',
            main: '#FFAF1F',
            dark: '#E59D1B',
            contrastText: '#fff'
        },
        error: {
            light: '#d32f2f1a',
            main: '#ff0000',
            dark: '#ba000d',
            contrastText: '#fff',
        },
        warning: {
            light: '#facf44',
            main: '#f5a844',
            dark: '#e65100',
            contrastText: '#fff',
        },
        success: {
            light: '#4caf50',
            main: '#2e7d32',
            dark: '#1b5e20',
            contrastText: '#fff'
        },
        info: {
            light: '#f8f8f8',
            main: '#c0bfbf',
            dark: '#333333',
            contrastText: '#212121'
        },
        background: {
            light: '#f8f8f8',
            main: '#6e7a96',
            dark: '#304269',
            text: '#304269',
            contrastText: '#f7f7f7',
            highlightedText: '#FFAF1F'
        }
    },
});

export default theme;