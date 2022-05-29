import NavBarAdmin from "./NavBarAdmin";
import axios from "axios";
import React, {useState, useEffect} from "react";

function AdminEstoqueNovo(){

    function criarEstoque(e){
        e.preventDefault();

        let estoque = {
            produtoId: e.target.produto.value,
            valor: e.target.quantidade.value
        }

        axios.post('http://localhost:5000/estoque',estoque,{
            headers:{
                authorization: localStorage.getItem('token')
            }
        })
            .then(()=>{e.target.submit()})
            .catch(err=>{alert('Não foi possível concluir o cadastro, já existe estoque cadastrado para esse produto!')})
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
    }, [])

    return(
        <>
            <NavBarAdmin/>
            <div className="container">
                <hr />
                <br />
                <div className="card">
                    <div className="card-header">
                        <h2>Cadastro de Estoque</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={criarEstoque} action="/admin/estoques">
                            <label>Escolha o Produto</label>
                            <br />
                            <select name="produto" className="form-control">
                                {posts.map(produto=>(
                                    <option key={produto.id} value={produto.id}>{produto.nome}</option>
                                ))}
                            </select>
                            <br />
                            <label htmlFor="Valor">Valor</label>
                            <input placeholder="Quantidade em Estoque" className="form-control" type="number" name="quantidade" id="valor"/>
                            <br />
                            <button className="btn btn-success">Cadastrar Estoque</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminEstoqueNovo;