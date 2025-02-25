import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { LoadingContextProvider } from './context/loadingContext';
import AdminPage from './pages/AdminPage';
import Analysis from './pages/Analysis';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyAccount from './pages/MyAccount';
import StepsPage from './pages/StepsPage';
const theme = createTheme({
  palette: {
    primary: {
      main: '#428C5C', // Cor principal
    },
    secondary: {
      main: '#F1F1F1', // Cor secundária
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
                <Route path="/steps" element={<StepsPage />} />
                <Route path="/analysisform" element={<Analysis />} />
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
      </LoadingContextProvider>
    </>
  );
}

export default App;
