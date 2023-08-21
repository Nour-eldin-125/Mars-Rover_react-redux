import logo from './logo.svg';
import './App.css';
import Rover from './components/Rover';
import InputDirection from './components/InputDirection';
import Obstacles from './components/Obstacles';

function App() {
  return (
    <>
      <h1>Mars Rover</h1>
      <InputDirection />
      <br/>
      <Obstacles />
      <Rover />
    </>
  );
}

export default App;
