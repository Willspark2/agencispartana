import { useState, useEffect } from 'react';
import Dashboard from './Dashboard'

function App() {
  const [initialTab, setInitialTab] = useState('dashboard');

  useEffect(() => {
    // Lógica de Subdomínio: Se entrar via hunter.agencispartana.com, abre direto no modo guerra
    const hostname = window.location.hostname;
    if (hostname.includes('hunter')) {
      setInitialTab('prospec');
    }
  }, []);

  return <Dashboard key={initialTab} initialTab={initialTab} />
}

export default App
