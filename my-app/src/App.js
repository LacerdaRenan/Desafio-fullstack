import './App.css';
import Home from './components/Home';
import AdminProdutos from './components/admin/AdminProdutos';
import AdminEstoques from './components/admin/AdminEstoques';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='/admin/produtos' element={<AdminProdutos/>}></Route>
          <Route path='/admin/estoques' element={<AdminEstoques/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
