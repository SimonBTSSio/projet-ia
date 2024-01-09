import './App.css'
import SearchPage from './pages/search';
import RecipePage from './pages/recipe';
import { ThemeProvider } from '@mui/material';
import myTheme from './theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <ThemeProvider theme={myTheme}>
      <Router>
          <Routes>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/recipe" element={<RecipePage />} />
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
    </ThemeProvider>
    </ThemeProvider>
  );
}

export default App;