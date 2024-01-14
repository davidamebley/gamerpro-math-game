import { useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import AppRouter from './AppRouter';
import './App.css';
import './styles/patterns.css'

function App() {
  useEffect(() => {
    // Add pattern class to the body
    document.body.classList.add('starry-night');
  }, []);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default withAuthenticator(App);
