import { useState, useEffect } from 'react';
import Dashboard from './Dashboard'

function App() {
  const [initialTab, setInitialTab] = useState('dashboard');

  useEffect(() => {
    // Roteamento Inteligente por Subdomínio
    const hostname = window.location.hostname;
    
    if (hostname.includes('hunter')) {
      setInitialTab('prospec');
    } else if (hostname.includes('operacoes')) {
      setInitialTab('dashboard');
    } else {
      setInitialTab('dashboard'); // Padrão
    }
  }, []);

  return <Dashboard key={initialTab} initialTab={initialTab} />
}

export default App
