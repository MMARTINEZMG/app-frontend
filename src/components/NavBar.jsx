import { ArrowRight } from "iconsax-react";

const Navbar = () => {
    return (
        <nav className="bg-[#121317] text-white p-4 shadow-lg border-b-2 border-gray-600">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <a href="#" className="text-xl font-bold text-[#90e048] pr-8">
                        TechLife Solutions
                    </a>
                    <a href="#about" className="hover:underline">About</a>
                    <a href="#services" className="hover:underline">Services</a>
                    <a href="#contact" className="hover:underline">Contact</a>
                    <a href="#support-form" className="hover:underline">Support</a>
                </div>
                <div className="space-x-4">
                    <a
                        href="/login"
                        className="bg-[#A8FF53] text-black py-1 px-4 rounded flex items-center space-x-2 hover:bg-[#90e048]"
                    >
                        <span className="font-medium">Login</span>
                        <ArrowRight size="16" color="#000" />
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
