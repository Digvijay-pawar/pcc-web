import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#16a34a',
      light: '#22c55e',
      dark: '#15803d',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0284c7',
      light: '#0ea5e9',
      dark: '#0369a1',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f0fdf4',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
    },
    success: {
      main: '#22c55e',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
    info: {
      main: '#0ea5e9',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '1rem',
        },
        contained: {
          boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(22, 163, 74, 0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#0284c7',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#16a34a',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        elevation3: {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export const gradients = {
  primary: 'linear-gradient(135deg, #16a34a 0%, #0284c7 50%, #0ea5e9 100%)',
  primaryDark: 'linear-gradient(135deg, #15803d 0%, #0369a1 100%)',
  secondary: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
  light: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)',
  greenBlue: 'linear-gradient(135deg, #22c55e 0%, #10b981 50%, #06b6d4 100%)',
};

export const shadows = {
  card: '0 4px 12px rgba(22, 163, 74, 0.3)',
  cardHover: '0 6px 16px rgba(22, 163, 74, 0.4)',
  button: '0 4px 12px rgba(22, 163, 74, 0.4)',
  buttonHover: '0 6px 16px rgba(22, 163, 74, 0.5)',
};
