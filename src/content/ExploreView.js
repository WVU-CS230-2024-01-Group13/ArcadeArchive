import React from 'react';
import './explore.css';
import magnifyingGlassIcon from './magnifying-glass-png-icon-23.jpg'; // Import the magnifying glass icon image

const ExploreView = () => {
    return (
        <>
            <head>
                <title>Arcade Archive Explore</title>
            </head>
            <header>
                <div className="header-content">
                    <h1>Explore Page</h1>
                    <p>This page allows you to explore various games available in the Arcade Archive. You can view the most played games and recently played games.</p>
                </div>
            </header>
            <nav id="navbar">
                <form>
                    <p>
                        {/* Use button element with image of magnifying glass */}
                        <input type="text" id="search" placeholder="Search"/>
                        <button type="submit" id="search-button">
                            <img src={magnifyingGlassIcon} alt="Search" />
                        </button>
                    </p>
                </form>
            </nav>
            <body>
                <div id="grid-container">
                    <section id="top-game">
                        <h1 id="grid-headers">Most Played</h1>
                        {/* Image gallery content */}
                        <div>
                            <img src="game1.jpg" alt="Game 1" width="150px" />
                            <p>Game 1</p>
                        </div>
                        <div>
                            <img src="game2.jpg" alt="Game 2" width="150px" />
                            <p>Game 2</p>
                        </div>
                        {/* Add more game items as needed */}
                    </section>

                    <section id="recent-game">
                        <h1 id="grid-headers">Recently Played</h1>
                        {/* Image gallery content */}
                        <div>
                            <img src="game3.jpg" alt="Game 3" width="150px" />
                            <p>Game 3</p>
                        </div>
                        <div>
                            <img src="game4.jpg" alt="Game 4" width="150px" />
                            <p>Game 4</p>
                        </div>
                        {/* Add more game items as needed */}
                    </section>
                </div>
            </body>
        </>
    );
}

export default ExploreView;
