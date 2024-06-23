import './App.css'
import './bs.min.css'
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      
      <Route path="/" element={ <Layout /> }>

        <Route index element={ <IndexPage />} />

        <Route path={"/ponto-cultural"} element={
          <div>Conheça o ponto cultural!!</div>
        } />

        <Route path={"/login"} element={<LoginPage />} />

      </Route>
    </Routes>
  );
}

export default App;
