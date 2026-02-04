import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Home</h1>

            <Link to="/pet">
                <button className="button">Go to Pet</button>
            </Link>

            <Link to="/select">
                <button className="button">Go to Pet Selection</button>
            </Link>

        </div>
    )
}

export default Home;