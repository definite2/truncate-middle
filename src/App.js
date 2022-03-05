import Button from './components/Button';
import { buttons } from './mock/buttons';
import './App.css';

function App() {
  return (
    <div className="App">
      {buttons.map((button, index) => (
        <Button
          key={`${button.text}_${index}`}
          width={button.width}
          originalLongText={button.text}
        />
      ))}
    </div>
  );
}

export default App;
