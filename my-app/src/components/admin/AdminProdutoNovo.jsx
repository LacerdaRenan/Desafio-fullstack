import NavBarAdmin from "./NavBarAdmin";
import axios from "axios";

function AdminProdutoNovo(){

    function criarProduto(e){
        e.preventDefault();

        let novoProduto = {
            nome: e.target.nome.value,
            valor: e.target.valor.value
        }
        
        axios.post("http://localhost:5000/produto",novoProduto)
            .then(()=>{e.target.submit()})
            .catch(err=>{return alert('Não foi possível concluir o cadastro')})
        //
    }

    return(
        <>
            <NavBarAdmin/>
            <div className="container">
                <hr />
                <br />
                <div className="card">
                    <div className="card-header">
                        <h2>Cadastro de Produto</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={criarProduto} action="/admin/produtos">
                            <label htmlFor="nome">Nome</label>
                            <input placeholder="Digite aqui o nome do produto" className="form-control" type="text" name="nome" id="nome"/>
                            <br />
                            <label htmlFor="valor">Valor</label>
                            <input placeholder="Digite aqui o valor do produto" className="form-control" type="text" name="valor" id="valor"/>
                            <br />
                            <button className="btn btn-success">Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProdutoNovo;