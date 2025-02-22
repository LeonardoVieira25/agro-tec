import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { LoadingContextProvider } from './context/loadingContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import MyAccount from './pages/MyAccount';

const theme = createTheme({
  palette: {
    primary: {
      main: '#405DE6', // Cor principal
    },
    secondary: {
      main: '#F7F7FC', // Cor secundária
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
  },
});

function App() {
  return (
    <>
      <LoadingContextProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <div>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/minhaconta" element={<MyAccount />} />
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
      </LoadingContextProvider>
    </>
  );
}

export default App;
