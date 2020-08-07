//After Davey Strus's Solution Video
class Team extends React.Component {
  //Set up constructor
  constructor(props) {
    super(props);
    //set States
    this.state = {
      shots: 0,
      score: 0,
    };
    this.backboard = new Audio("./assets/sound/BackBoard.wav");
    this.swish = new Audio("./assets/sound/Swish.wav");
  }
  //create a method for shooting
  shotHandler = () => {
    let score = this.state.score;
    //set up audio play
    //50% chance of making or missing
    this.backboard.play();
    if (Math.random() > 0.5) {
      //the let score will increment by 1 if Math.random() is greater than 0.5
      score += 1;
      setTimeout(() => {
        this.swish.play();
      }, 100);
    }
    //otherwise we will set state as it is
    this.setState((state, props) => ({
      //shots will always increment by 1 regardless if the shot made it or not
      shots: state.shots + 1,
      //score will set it's state to the let score state it is at, if the if statement prior is not activated then nothing changes
      score,
    }));
  };
  render() {
    //set if statement in render that won't activate until shots does not = 0 which is equivalent to false and creates a div in the function
    let shotPercentageDiv;
    if (this.state.shots) {
      const shotPercentage = Math.round(
        (this.state.score / this.state.shots) * 100
      );
      shotPercentageDiv = <div>Shooting %: {shotPercentage}</div>;
    }
    return (
      // organizing placements for the ui to take place, the team name, logo, state statistics and the shoot button
      <div className="Team">
        <h2>{this.props.name}</h2>

        <div className="logoImg">
          <img src={this.props.logo} alt={this.props.name} />
        </div>

        <div>Shots: {this.state.shots}</div>

        <div>Score: {this.state.score}</div>

        {shotPercentageDiv}

        <button onClick={this.shotHandler}>Shoot</button>
      </div>
    );
  }
}
function Game(props) {
  return (
    <div className="Game">
      <h2 className="venue">Welcome to {props.venue}!</h2>
      <div className="stats">
        <Team name={props.homeTeam.name} logo={props.homeTeam.logo} />
        <div className="versus">
          <h1>VS</h1>
        </div>
        <Team name={props.visitingTeam.name} logo={props.visitingTeam.logo} />
      </div>
    </div>
  );
}

function App(props) {
  const OwlTeam = {
    name: "Owl Gazers",
    logo: "./assets/images/Owl.png",
  };
  const DuckTeam = {
    name: "Quacken Ducks",
    logo: "./assets/images/Duck.png",
  };

  return (
    <div className="App">
      <Game venue="Tall Trees" homeTeam={OwlTeam} visitingTeam={DuckTeam} />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
