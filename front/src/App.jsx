import './App.css';
import SearchPage from './pages/search';
import RecipePage from './pages/recipe';
import WithChatbot from './WithChatbot';
import { ThemeProvider } from '@mui/material';
import myTheme from './theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Lists from "./pages/Lists.jsx";
import ListDetail from "./pages/ListDetail.jsx";
import MyRecipes from "./pages/MyRecipes.jsx";

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <Router>
          <Routes>
              <Route path="/search" element={<WithChatbot><SearchPage /></WithChatbot>} />
              <Route path="/lists" element={<WithChatbot><Lists /></WithChatbot>} />
              <Route path="/list/:id" element={<WithChatbot><ListDetail /></WithChatbot>} />
              <Route path="/recipe" element={<WithChatbot><RecipePage /></WithChatbot>} />
              <Route path="/" element={<WithChatbot><Home /></WithChatbot>} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/my-recipes" element={<MyRecipes />} />
          </Routes>
        </Router>
    </ThemeProvider>
  );
}

export default App;