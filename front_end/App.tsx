import React from "react";
import Header from "./components/Header";
import Timetable from "./components/Timetable";
import "./App.css";

const App: React.FC = () => {
    return (
        <div className="app">
            <Header />
            <Timetable />
        </div>
    );
};

export default App;
