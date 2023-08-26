import logo from './logo.svg';
import './App.css';
import Rover from './components/Rover';
import InputDirection from './components/InputDirection';
import Obstacles from './components/Obstacles';
import RoverGrid from './components/RoverGrid';

function App() {
  return (
    <>
      <h1>Mars Rover</h1>
      <RoverGrid />

          <div className = "container">

            <InputDirection />
          
            <Obstacles />
          </div>
        <Rover />
    </>
  );
}

export default App;
