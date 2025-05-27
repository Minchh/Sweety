import "../css/Home.css";

import NavBar from "../components/NavBar.jsx";

function Home() {
    return (
        <>
            <title>Home | Sweety</title>
            <div className="page-container">
                <div className="page-overlay">
                    <NavBar />
                    <section className="hero">
                        <h1 className="hero-title">
                            Basic. Elegant. Delicious
                        </h1>
                        <h2 className="hero-subtitle">
                            Bring the best experience
                        </h2>
                        <button className="hero-btn">ORDER NOW</button>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Home;
