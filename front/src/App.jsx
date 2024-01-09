import './App.css'
import SearchPage from './pages/search';
import RecipePage from './pages/recipe';
import { ThemeProvider } from '@mui/material';
import myTheme from './theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <ThemeProvider theme={myTheme}>
      <Router>
          <Routes>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/recipe" element={<RecipePage />} />
          </Routes>
        </Router>
    </ThemeProvider>
    </ThemeProvider>
  );
}

export default App;