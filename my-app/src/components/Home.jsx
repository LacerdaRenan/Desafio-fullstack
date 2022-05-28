import axios from "axios";
import NavBar from "./NavBar";
import React, {useState, useEffect} from "react";

//        <img height ='150' className="center" src={estoque.produto.avatar} alt="Img" />

function Home(){

    function comprar(e){
        e.preventDefault()
        let produtoPreco = e.target.valorProduto.value
        let produtoId = e.target.quantidadeProduto.id;
        let quantidadeProduto = e.target.quantidadeProduto.value;
        let quantidadeEstoque = e.target.valorEstoque.value
        
        if(quantidadeEstoque==='0'){
            return alert("Estoque indisponível");
        }
        
        if(!window.confirm(`Deseja finalizar a compra? valor: R$ ${(produtoPreco*quantidadeProduto).toFixed(2)}`)) return;

        let novoEstoque = quantidadeEstoque-quantidadeProduto;
        
        axios.put(`http://localhost:5000/estoque/${produtoId}`,{valor: novoEstoque})
            .then(()=>{e.target.submit()})
            .catch(err=>{console.log(err)})
        //
    }

    let[posts, setPosts] = useState([]);
 
    useEffect(()=>{
        axios.get('http://localhost:5000/estoque-produto')
        .then(data=>{setPosts(data.data)})
        .catch(err=>{console.log('Deu ruim')})
    }, [])
        
    return(
        <>
            <NavBar/>
            <div className="container">
                <hr />
                {posts.map((estoque)=>(
                    <div key={estoque.produto.id} className="card" >
                        <div className="card-header">
                            <h3 className="center">{estoque.produto.nome}</h3>
                        </div>
                        <div className="card-body">
                            <p>Nome: {estoque.produto.nome}</p>
                            <p>Valor: {estoque.produto.valor}</p>
                            <p>Em Estoque: {estoque.valor}</p>
                            <form action="/" onSubmit={comprar} id="Form-compra">
                                <p>Comprar:</p>
                                <input type="hidden" name="valorEstoque" value={estoque.valor} />
                                <input type="hidden" name="valorProduto" value={estoque.produto.valor} />
                                <input className="myform" type="number" name="quantidadeProduto" id={estoque.produto.id}/>
                                <button className="myform">Comprar</button>
                            </form>

                        </div>
                    </div>
                ))}
            </div>
        </>
    )        

}

export default Home;