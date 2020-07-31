class Team extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            teamName: props.name,
            teamLogo: props.logo,
            teamScore: 0,
            teamShotTaken: 0,
            teamShotPercentage: teamScore / teamShotTaken,
        }
    }

    shoot = (event) => {
        const shotChance = (Math.floor(Math.random() * 100) + 1)
        //If shotChance is between 15 and 85 team will score a point and increment Score and shotTaken by 1. 
        if (shotChance < 15 && shotChance < 85) {
            this.setState((state, props) => ({
                teamScore: state.teamScore += 1,
                teamShotTaken: state.teamShotTaken += 1,
            }))
        }
        //We have a 30% chance of missing from both sides due to 15 and below with 85 and above being missing zones, if Shot misses: only shotTaken increments by 1        
        else {
            this.setState((state, props) => ({
                teamShotTaken: state.teamShotTaken += 1
            }))
        }
    }
    revealShotPercent = (event) => {
        if (this.state.teamShotTaken === 0) {
            return
        }
        else {
            return this.state.teamShotPercentage
        }
    }
    render() {
        return (
            <div>
                <h2>{this.state.teamName}</h2>
                <img src={this.state.teamLogo} alt="Team Logo" />
                {this.state.teamScore}
                {this.state.teamShotTaken}
                {this.revealShotPercent}
            </div>
        )
    }
}
class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            venueName: this.props.venue,
        }
    }
    render() {
        return (
            <div>
                <Team />
            </div>
        )
    }
}
// function App(props) {
//     return (
//         <div>
//             <h1 id="venue">Welcome to the Basic Sports Game!</h1>
//             <Game />
//         </div>
//     )
// }
function App(props) {
    return (
        <div>
            <h1 id="venue">Welcome to the Basic Sports Game!</h1>
            <Team />
        </div>
    )
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)