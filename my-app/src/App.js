import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import NewUser from './components/NewUser';
import AdminProdutos from './components/admin/AdminProdutos';
import AdminEstoques from './components/admin/AdminEstoques';
import AdminProdutoNovo from './components/admin/AdminProdutoNovo';
import AdminEstoqueNovo from './components/admin/AdminEstoqueNovo';
import AdminProdutoEditar from './components/admin/AdminProdutoEditar';
import AdminEstoqueEditar from './components/admin/AdminEstoqueEditar';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='/admin/login' element={<Login/>}></Route>
          <Route path='/admin/create-user' element={<NewUser/>}></Route>
          <Route path='/admin/produtos' element={<AdminProdutos/>}></Route>
          <Route path='/admin/estoques' element={<AdminEstoques/>}></Route>
          <Route path='/admin/produtos/novo' element={<AdminProdutoNovo/>}></Route>
          <Route path='/admin/estoques/novo' element={<AdminEstoqueNovo/>}></Route>
          <Route path='/admin/produto/editar/:produtoId' element={<AdminProdutoEditar/>}></Route>
          <Route path='/admin/estoque/editar/:produtoId' element={<AdminEstoqueEditar/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
