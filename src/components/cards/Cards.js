import React, { Component } from "react";
import "./Cards.css"


class SmurfCart extends Component {
    captureClick = () => {
        this.props.rememberClick(this.props.cardID)
    };

    render() {
        return (
            <div className="col-md-3 my-2">
                <div className="SmurfCard" onClick = {this.captureClick}>
                    <img src= {`./images/${this.props.image}.jpg`} alt="smurf"/>
                </div>
            </div>
        )
    }
}


export default SmurfCart;