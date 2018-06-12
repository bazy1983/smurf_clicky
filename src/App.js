import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Wrapper from "./components/wrapper"
import SmurfCard from "./components/cards"
import Navbar from "./components/navbar"
import smurfObj from "./cards.json"


let clickedImgs = []; //used as clicked image memory
let winCount = 0,
  lossCount = 0,
  highScoreCount = 0,
  score = 0;


class App extends Component {
  state = {
    smurfs: smurfObj,
    score: score,
    highScore: highScoreCount,
    win: winCount,
    loss: lossCount
  };

  //game logic
  //counts and saves all clicked images 
  rememberClick = (imgNumber) => {
    let gameBox = document.querySelector(".row");
    gameBox.classList.remove("tada", "shake")
    //checks if image already been clicked
    if (clickedImgs.includes(imgNumber)) {
      //losing the game
      let fail = new Audio("./sound/fail.wav");
      fail.play()
      gameBox.classList.add("shake");
      clickedImgs = []
      lossCount++
      score = 0
      highScoreCount = 0;
      this.setState({ loss: lossCount, score: 0 })
    } else {
      //if not clicked before, save it in array
      clickedImgs.push(imgNumber);
      highScoreCount++
      score++
      if (this.state.highScore < highScoreCount) { this.setState({ highScore: highScoreCount }) }
      this.setState({ score: score })
      if (clickedImgs.length === 12) {
        //winning the game
        let tada = new Audio("./sound/tada.wav")
        tada.play();
        gameBox.classList.add("tada")
        clickedImgs = [];
        winCount++;
        score = 0
          this.setState({ win: winCount, score: score })
      }
    }
    //shuffling the images and setting the state
    smurfObj.sort(() => {
      return (0.5 - Math.random())
    })
    this.setState({ smurfs: smurfObj })
  }

  //render component
  render() {
    return (
      <Wrapper>
        <Navbar
          win={this.state.win}
          loss={this.state.loss}
          score={this.state.score}
          highScore={this.state.highScore}
        />
        {/* end of navbar */}
        <div className="container">
          <div className="row">
            {this.state.smurfs.map((smurf) =>
              (<SmurfCard
                key={smurf.id}
                cardID={smurf.id}
                rememberClick={this.rememberClick}
                image={smurf.img}
                className="col-md-3"
              />)
            )}
            {/* end of cards */}
          </div>
        </div>
      </Wrapper>
    )
  };
}

export default App;
