import NavBar from "../components/NavBar";
import SupportForm from "../components/SupportForm";
import Footer from "../components/Footer.jsx";

const App = () => {
    return (
        <div className="min-h-screen bg-[#121317] text-gray-800">
            <NavBar />
            <main className="py-10">
                <div className="container mx-auto px-4">
                    <SupportForm />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;
