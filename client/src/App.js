import './App.css'; // <-- THIS LINE IS THE FIX
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Auth } from './pages/auth/Auth';
import { CreateRecipe } from './pages/create-recipe/CreateRecipe';
import { SavedRecipes } from './pages/saved-recipes/SavedRecipes';
import { Navbar } from './components/Navbar';
import { Profile } from './pages/profile/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;