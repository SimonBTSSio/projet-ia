import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div className="home-container">
            <h1>Bienvenue sur Ma super recette !</h1>
            <div className="buttons-container">
                <Link to="/register">
                    <button className="signup-button">Créer un compte</button>
                </Link>
                <Link to="/login">
                    <button className="login-button">Se connecter</button>
                </Link>
                <Link to="/search">
                    <button className="login-button">Trouver une recette</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
