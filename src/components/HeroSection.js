import React from "react";
import "../style/App.css";
import { Button } from "./Button";
import "../style/HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <image src="https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
      <h1>Find the Perfect Job</h1>
      <p>Upload your Resume Now</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
