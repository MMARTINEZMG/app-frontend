const Footer = () => {
    return (
        <footer className="bg-[#121317] text-gray-200 py-8 border-t-2 border-gray-600">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-lg font-bold mb-4">About Us</h3>
                    <p>
                        We are committed to providing top-notch support and solutions to help you
                        succeed. Contact us for any inquiries or assistance.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                    <ul>
                        <li><a href="#support-form" className="hover:underline">Support Form</a></li>
                        <li><a href="#about" className="hover:underline">About</a></li>
                        <li><a href="#services" className="hover:underline">Services</a></li>
                        <li><a href="#contact" className="hover:underline">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                    <p>Email: <a href="mailto:support@example.com" className="text-green-400 hover:underline">support@example.com</a></p>
                    <p>Phone: +1 123 456 7890</p>
                    <p>Address: 123 Tech Street, Innovation City</p>
                </div>
            </div>
            <div className="text-center mt-8 border-t border-gray-700 pt-4">
                <p>&copy; 2024 TechLife Solutions. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
