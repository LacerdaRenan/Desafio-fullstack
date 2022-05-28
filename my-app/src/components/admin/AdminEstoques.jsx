import NavBarAdmin from "./NavBarAdmin";
import axios from "axios";
import {Link} from 'react-router-dom'
import React, {useState, useEffect} from "react";
function AdminEstoques(){
    
    function deletar(e){
        e.preventDefault();

        let produtoId = e.target.produtoId.value;

        if(!window.confirm('Deseja apagar produto?')) return;

        axios.delete(`http://localhost:5000/estoque/${produtoId}`)
            .then(()=>{e.target.submit()})
            .catch(err=>{console.log(err)});
        //
    }

    let[posts, setPosts] = useState([]);
 
    useEffect(()=>{
        axios.get('http://localhost:5000/estoque-produto')
        .then(data=>{setPosts(data.data)})
        .catch(err=>{console.log(err)})
    }, []);

    return(
        <>
            <NavBarAdmin/>
            <div className="container">
                <br />
                <h2>Estoques Cadastrados</h2>
                <hr />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>idProduto</th>
                            <th>Nome</th>
                            <th>Quantidade em Estoque</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((data)=>(
                            <tr key={data.produto.id}>
                                <td>{data.produto.id}</td>
                                <td>{data.produto.nome}</td>
                                <td>{data.valor}</td>
                                <td>
                                    <Link to={`/admin/estoque/editar/${data.produto.id}`} className="btn btn-warning">Atualizar Estoque</Link>
                                    <form className="inline" id="form-delete" onSubmit={deletar} action="/admin/estoques">
                                        <input type="hidden" name="produtoId" value={data.produto.id} />
                                        <input type="submit" value="Deletar" className="btn btn-danger" />
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr />
                <Link className="btn btn-success" to='/admin/estoques/novo'>Cadastrar novo Estoque</Link>  
            </div>
        </>
    )
}

export default AdminEstoques;