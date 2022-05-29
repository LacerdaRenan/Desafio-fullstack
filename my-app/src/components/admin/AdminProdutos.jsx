import NavBarAdmin from "./NavBarAdmin";
import axios from "axios";
import {Link} from 'react-router-dom'
import React, {useState, useEffect} from "react";

function AdminProdutos(){

    function deletar(e){
        e.preventDefault();

        let produtoId = e.target.produtoId.value;

        if(!window.confirm('Deseja apagar produto?')) return;

        axios.delete(`http://localhost:5000/estoque/${produtoId}`,{
            headers:{
                authorization: localStorage.getItem('token')
            }
        })
            .then(()=>{
                axios.delete(`http://localhost:5000/produto/${produtoId}`,{
                    headers:{
                        authorization: localStorage.getItem('token')
                    }
                })
                    .then(()=>{e.target.submit()})
                    .catch(err=>{console.log(err)});
            })
            .catch(err=>{console.log(err)});
        //
    }

    let[posts, setPosts] = useState([]);
 
    useEffect(()=>{
        axios.get('http://localhost:5000/produto',{
            headers:{
                authorization: localStorage.getItem('token')
            }
        })
        .then(data=>{setPosts(data.data)})
        .catch(err=>{console.log(err)})
    }, []);

    return(
        <>
            <NavBarAdmin/>
            <div className="container">
                <br />
                <h2>Produtos Cadastrados</h2>
                <hr />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nome</th>
                            <th>valor</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((data)=>(
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.nome}</td>
                                <td>{data.valor}</td>
                                <td>
                                    <Link to={`/admin/produto/editar/${data.id}`} className="btn btn-warning">Editar</Link>
                                    <form className="inline" id="form-delete" onSubmit={deletar} action="/admin/produtos">
                                        <input type="hidden" name="produtoId" value={data.id} />
                                        <input  type="submit" value="Deletar" className="btn btn-danger" />
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr />
                <Link className="btn btn-success" to='/admin/produtos/novo'>Cadastrar novo produto</Link>  
            </div>
        </>
    )
}

export default AdminProdutos;