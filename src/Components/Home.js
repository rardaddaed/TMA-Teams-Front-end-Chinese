import React from "react";

function Home(){
    
    // Return bg img with text on top
    return(
        <div className="img-container">
            <img className="bg" src="bg.jpg" alt="TMA Teams"></img>
            <div className="center-text">
                <h3>TMA Teams</h3>
                </div>
        </div>
    )
}

export default Home