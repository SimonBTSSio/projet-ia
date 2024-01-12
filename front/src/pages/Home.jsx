import { Link } from 'react-router-dom';
import Navbar from "../home/Navbar.jsx";

const Home = () => {

    const token = localStorage.getItem('token');

    return (
        <div className="home">
            <Navbar/>
            <div className="home-container">
                <h1>Bienvenue sur Ma super recette !</h1>
                <div className="buttons-container">
                    {
                        token ? (
                            <div>
                                <Link to="/search">
                                    <button className="login-button">Chercher des recettes</button>
                                </Link>
                                <Link to="/my-recipes">
                                    <button className="login-button">Mes recettes favorites</button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="login-button">Connectez-vous pour chercher des recettes</button>
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;
