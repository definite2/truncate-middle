import Button from './components/Button';
import { buttons } from './mock/buttons';
import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Truncating Button Text From Middle</h2>
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
