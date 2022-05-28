import './App.css';
import Home from './components/Home';
import AdminProdutos from './components/admin/AdminProdutos';
import AdminEstoques from './components/admin/AdminEstoques';
import AdminProdutoNovo from './components/admin/AdminProdutoNovo';
import AdminEstoqueNovo from './components/admin/AdminEstoqueNovo';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='/admin/produtos' element={<AdminProdutos/>}></Route>
          <Route path='/admin/estoques' element={<AdminEstoques/>}></Route>
          <Route path='/admin/produtos/novo' element={<AdminProdutoNovo/>}></Route>
          <Route path='/admin/estoques/novo' element={<AdminEstoqueNovo/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
