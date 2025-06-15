import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/navbar.jsx";
import { Footer } from "../../components/Footer/footer.jsx";
import styles from "./perfil.module.css";
import CardPerfil from "../../components/CardPerfil/cardPerfil.jsx"; 
import { ModalAlteracao } from "./modalAlteracao/modalAlteracao.jsx";

export function Perfil() {
    const [usuario, setUsuario] = useState({
    nome: "João Silva",
    email: "joao.silva@example.com",
    telefone: "(21) 1234-5678",
    endereco: "Rua Exemplo, 123, Cidade, Estado",
  });
  
  const [pedidos, setPedidos] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    // Simulando dados de pedidos e histórico
    setPedidos([
      { id: 1, produto: "Produto A", data: "2023-10-01", status: "Entregue" },
      { id: 2, produto: "Produto B", data: "2023-10-05", status: "Pendente" },
    ]);
    setHistorico([
      { id: 1, produto: "Produto C", data: "2023-09-15", status: "Entregue" },
      { id: 2, produto: "Produto D", data: "2023-09-20", status: "Cancelado" },
    ]);
    }, []);
    return (
    <>
      <Navbar />
      <CardPerfil usuario={usuario} />
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
      {mostrarModal && (
        <ModalAlteracao
          usuario={usuario}
          setUsuario={setUsuario}
          fechar={() => setMostrarModal(false)}
        />
      )}

      <Footer />
    </>
  );
}