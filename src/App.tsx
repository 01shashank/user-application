import { SnackbarProvider } from 'notistack';
import './App.css';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <HomePage />
      </SnackbarProvider>

    </div>
  );
}

export default App;
