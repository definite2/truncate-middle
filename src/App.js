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
          height={button.height}
          originalLongText={button.text}
          font={button.font}
        />
      ))}
    </div>
  );
}

export default App;
