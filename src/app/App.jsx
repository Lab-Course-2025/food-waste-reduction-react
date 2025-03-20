import { useState } from 'react';
import './../App.css';
import './../index.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Food Waste Reduction!</p>
    </div>
  );
}

export default App;