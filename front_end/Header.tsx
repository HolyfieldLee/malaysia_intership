import React from "react";
import "./Header.css";

const Header: React.FC = () => {
    return (
        <div className="header">
            <img
                src="https://www.ucsiuniversity.edu.my/sites/default/files/ucsi_uni_logo.png"
                alt="UCSI University"
                className="uni-logo"
            />
            <img
                src="https://www.ucsiuniversity.edu.my/sites/default/files/qs_world_ranking_2025.png"
                alt="QS Ranking"
                className="qs-logo"
            />
        </div>
    );
};

export default Header;
