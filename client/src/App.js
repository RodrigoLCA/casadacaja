//import './bs.min.css'
//import './App.css'
import './global.scss'
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import { UserContextProvider } from './userContext';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        
        <Route path="/" element={ <Layout /> }>

          <Route index element={ <IndexPage />} />

          <Route path={"/ponto-cultural"} element={
            <div>Conheça o ponto cultural!!</div>
          } />

          <Route path={"/publicacoes/nova"} element={<CreatePost />} />

          <Route path={"/login"} element={<LoginPage />} />

        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
