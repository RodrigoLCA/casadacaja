//import './bs.min.css'
//import './App.css'
import './global.scss'
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import { UserContextProvider } from './userContext';
import CreatePost from './pages/CreatePost';
import ConfigPage from './pages/ConfigPage';
import SinglePostPage from './pages/SinglePostPage';
import EditSinglePostPage from './pages/EditSinglePostPage';

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

          <Route path={"/:id/"} element={<SinglePostPage />} />
          <Route path={"/:id/edit"} element={<EditSinglePostPage />} />

          <Route path={"/configuracoes"} element={<ConfigPage />} />

        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
