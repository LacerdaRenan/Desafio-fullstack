import NavBarAdmin from "./NavBarAdmin";
import axios from "axios";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

function AdminProdutoEditar(){
    let {produtoId} = useParams();
    
    function atualizaProduto(e){
        e.preventDefault();
        
        let produtoAtualizado = {
            nome: e.target.nome.value,
            valor: e.target.valor.value
        }
        
        axios.put(`http://localhost:5000/produto/${produtoId}`,produtoAtualizado)
        .then(()=>{e.target.submit()})
        .catch(err=>{return alert('Não foi possível concluir a edição')})
        //
    }
    
    let[posts, setPosts] = useState([]);
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/produto/${produtoId}`)
        .then(data=>{setPosts(data.data)})
        .catch(err=>{console.log(err)})
    }, [produtoId]);

    return(
        <>
            <NavBarAdmin/>
            <div className="container">
                <hr />
                <br />
                <div className="card">
                    <div className="card-header">
                        <h2>Edição de Produto</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={atualizaProduto} action="/admin/produtos">
                            <label htmlFor="nome">Nome</label>
                            <input defaultValue={posts.nome} placeholder="Digite aqui o nome do produto" className="form-control" type="text" name="nome" id="nome"/>
                            <br />
                            <label htmlFor="valor">Valor</label>
                            <input defaultValue={posts.valor} placeholder="Digite aqui o valor do produto" className="form-control" type="text" name="valor" id="valor"/>
                            <br />
                            <button className="btn btn-success">Atualizar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProdutoEditar;