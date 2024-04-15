import React from 'react';
import './explore.css';

const ExploreView = ()=>{
return (
    <><head>
        <title>Arcade Archive Explore</title>
        <link rel="stylesheet" href="explorestyles.css"/>
        </head><header>
            <nav id="navbar">
                <form>
                    <p>
                        <img href />"#home" src="" alt="Logo"/{'>'}
                        <input type="submit" value="Search"/>
                        <input type="text" id="search" placeholder="Search"/>
                    </p>
                </form>
            </nav>
            </header>
                <body>
                    <div id="grid-container">
                        <section id="top-game">
                            <h1 id="grid-headers">Most Played</h1>
                            <div><img src="white-square.jpg" alt="white square" width="150px" /><p>Top Game 1</p></div>
                            <div><img src="white-square.jpg" alt="white square" width="150px" /><p>Top Game 2</p></div>
                            <div><img src="white-square.jpg" alt="white square" width="150px" /><p>Top Game 3</p></div>
                            <div><img src="white-square.jpg" alt="white square" width="150px" /><p>Top Game 4</p></div>
                            <div><img src="white-square.jpg" alt="white square" width="150px" /><p>Top Game 5</p></div>
                            <div><img src="white-square.jpg" alt="white square" width="150px" /><p>Top Game 6</p></div>
                        </section>

                        <section id="recent-game">
                            <h1 id="grid-headers">Recently Played</h1>
                            <div><img src="white-square.jpg" alt="white square" width="150px" /><p>Recent Game 1</p></div>
                            <div><img src="white-square.jpg" alt="white square" width="150px" /><p>Recent Game 2</p></div>
                            <div><img src="white-square.jpg" alt="white square" width="150px" /><p>Recent Game 3</p></div>
                            <div><img src="white-square.jpg" alt="white square" width="150px" /><p>Recent Game 4</p></div>
                            <div><img src="white-square.jpg" alt="white square" width="150px" /><p>Recent Game 5</p></div>
                            <div><img src="white-square.jpg" alt="white square" width="150px" /><p>Recent Game 6</p></div>
                        </section>
                    </div>
                </body></>
);
}

export default ExploreView;