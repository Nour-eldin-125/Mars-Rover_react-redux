import logo from './logo.svg';
import './App.css';
import Rover from './components/Rover';
import InputDirection from './components/InputDirection';


function App() {
  return (
    <>
      <h1>Mars Rover</h1>
      <InputDirection />
      <Rover />
    </>
  );
}

export default App;
