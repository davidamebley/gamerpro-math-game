import { useEffect } from 'react';

import AppRouter from './AppRouter';
import './App.css';
import './styles/patterns.css'

function App() {
  useEffect(() => {
    // Add pattern class to the body
    document.body.classList.add('weave');
  }, []);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
