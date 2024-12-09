import React from "react";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-gray-800 text-white p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-xl font-bold">Dashboard</div>
                    <a
                        href="/login"
                        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                    >
                        Logout
                    </a>
                </div>
            </nav>
            <main className="p-10 text-center">
                <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard!</h1>
                <p className="text-lg text-gray-700">
                    This is your personalized space after logging in.
                </p>
            </main>
        </div>
    );
};

export default Dashboard;
