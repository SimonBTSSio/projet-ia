import { Link } from 'react-router-dom';
import Navbar from "../home/Navbar.jsx";

const Home = () => {

    return (
        <div className="home">
            <Navbar/>
            <div className="home-container">
                <h1>Bienvenue sur Ma super recette !</h1>
                <div className="buttons-container">
                    <Link to="/search">
                        <button className="login-button">Trouver une recette</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
