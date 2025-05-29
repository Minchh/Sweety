import NavBar from "../components/NavBar.jsx";

function AboutUs() {
    return (
        <>
            <title>About Us | Sweety </title>

            <div className="page-container" style={{ height: "100vh" }}>
                <NavBar />

                <h1
                    style={{
                        display: "flex",
                        marginTop: "5rem",
                        justifyContent: "center",
                        alignContent: "center",
                        color: "#f0f0f0",
                    }}
                >
                    We are working on...
                </h1>
            </div>
        </>
    );
}

export default AboutUs;
