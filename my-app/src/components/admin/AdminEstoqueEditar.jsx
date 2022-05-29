import NavBarAdmin from "./NavBarAdmin";
import axios from "axios";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

function AdminEstoqueEditar(){
    let {produtoId} = useParams();

    function atualizaEstoque(e){
        e.preventDefault();

        let estoque = {
            valor: e.target.quantidade.value
        }

        axios.put(`http://localhost:5000/estoque/${produtoId}`,estoque,{
            headers:{
                authorization: localStorage.getItem('token')
            }
        })
            .then(()=>{e.target.submit()})
            .catch(err=>{alert('Não foi possível atualizar estoque')})
        //
    }

    let[posts, setPosts] = useState({
        valor: undefined,
        produto:{
            nome: undefined,
            valor: undefined
        }
    });
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/estoque-produto/${produtoId}`)
        .then(data=>{setPosts(data.data)})
        .catch(err=>{console.log(err)})
    }, [produtoId])

    return(
        <>
            <NavBarAdmin/>
            <div className="container">
                <hr />
                <br />
                <div className="card">
                    <div className="card-header">
                        <h2>Atualização de Estoque</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={atualizaEstoque} action="/admin/estoques">
                            <label>Produto</label>
                            <br />
                            <input disabled className="form-control" defaultValue={posts.produto.nome} type="text" />
                            <br />
                            <label htmlFor="Valor">Valor</label>
                            <input defaultValue={posts.valor} placeholder="Quantidade em Estoque" className="form-control" type="number" name="quantidade" id="valor"/>
                            <br />
                            <button className="btn btn-success">Atualizar Estoque</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminEstoqueEditar;