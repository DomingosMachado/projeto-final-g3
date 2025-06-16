import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import do navigate
import { Navbar } from "../../components/Navbar/navbar.jsx";
import { Footer } from "../../components/Footer/footer.jsx";
import styles from "./perfil.module.css";
import CardPerfil from "../../components/CardPerfil/cardPerfil.jsx"; 
import { ModalAlteracao } from "./modalAlteracao/modalAlteracao.jsx";
import ApiService from "../../services/api";

export function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate(); // hook para navegação

  useEffect(() => {
    async function buscarUsuarioLogado() {
      try {
        const dados = await ApiService.getUsuarioLogado();
        setUsuario({
          nome: dados.nome,
          email: dados.email,
          telefone: dados.telefone,
          endereco: dados.endereco,
        });

        setPedidos([
          { id: 1, produto: "Produto A", data: "2023-10-01", status: "Entregue" },
          { id: 2, produto: "Produto B", data: "2023-10-05", status: "Pendente" },
        ]);
        setHistorico([
          { id: 1, produto: "Produto C", data: "2023-09-15", status: "Entregue" },
          { id: 2, produto: "Produto D", data: "2023-09-20", status: "Cancelado" },
        ]);
      } catch (erro) {
        console.error("Erro ao buscar usuário logado:", erro);
      }
    }

    buscarUsuarioLogado();
  }, []);

  // Função para deletar usuário logado
  async function handleExcluirConta() {
    if (!window.confirm("Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.")) {
      return;
    }

    try {
      await ApiService.deletarUsuarioLogado();
      localStorage.clear();       // limpa localStorage
      navigate("/");              // redireciona para a home
    } catch (error) {
      alert("Erro ao excluir conta: " + error.message);
    }
  }

  return (
    <>
      <Navbar />

      {usuario && <CardPerfil usuario={usuario} />}

      <div className={styles.pedidos}>
        <h2>Meus Pedidos</h2>
        <ul>
          {pedidos.map((pedido) => (
            <li key={pedido.id}>
              {pedido.produto} - {pedido.data} - {pedido.status}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.historico}>
        <h2>Histórico de Compras</h2>
        <ul>
          {historico.map((item) => (
            <li key={item.id}>
              {item.produto} - {item.data} - {item.status}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => setMostrarModal(true)} style={{ margin: "20px" }}>
        Alterar
      </button>

      <button
        onClick={handleExcluirConta}
        style={{ margin: "20px", backgroundColor: "red", color: "white" }}
      >
        Excluir Conta
      </button>

      {mostrarModal && (
        <ModalAlteracao
          usuarioLogado={usuario}
          fecharModal={() => setMostrarModal(false)}
          atualizarUsuario={(novosDados) => setUsuario(novosDados)}
        />
      )}

      <Footer />
    </>
  );
}