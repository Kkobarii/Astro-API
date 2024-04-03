import React from "react";

const Logo = "https://docs.tts-game.fun/img/tts-logo.png";

const FirstComponent: React.FC<{}> = () => {
  return (
    <div>
      <h3>A Simple React Component Example with Typescript</h3>
      <div>
        <img height="250" src={Logo} alt="Logo" /> 
      </div>
      <p>This component shows the TTS logo.</p>
      <p>For more info on TITIES, please visit <a href="https://docs.tts-game.fun/">https://docs.tts-game.fun/</a></p>
    </div>
  );
};

export {FirstComponent};


type UserProps = {
  firstName: string;
  lastName: string;
};
const PropsComponent: React.FC<UserProps> = ({ firstName, lastName }) => {
  return (
    <div>
      <p>{firstName}</p>
      <p>{lastName}</p>
    </div>
  );
};

export {PropsComponent};