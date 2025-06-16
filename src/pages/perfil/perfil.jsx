import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/navbar.jsx";
import { Footer } from "../../components/Footer/footer.jsx";
import styles from "./perfil.module.css";
import CardPerfil from "../../components/CardPerfil/cardPerfil.jsx"; 
import { ModalAlteracao } from "./modalAlteracao/modalAlteracao.jsx";
import ApiService from "../../services/api";
import { ConfirmDeleteUser } from "../../components/ConfirmDeleteUser/confirmDeleteUser.jsx";

export function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarConfirmDelete, setMostrarConfirmDelete] = useState(false);
  const navigate = useNavigate();

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
      } catch (erro) {
        console.error("Erro ao buscar usuário logado:", erro);
      }
    }
    buscarUsuarioLogado();
  }, []);

  async function handleConfirmarExcluir() {
    try {
      await ApiService.deletarUsuarioLogado();
      localStorage.clear();
      navigate("/");
    } catch (error) {
      alert("Erro ao excluir conta: " + error.message);
    }
  }

  return (
    <>
      <Navbar />

      <div className={styles["perfil-container"]}>
        {usuario && <CardPerfil usuario={usuario} />}

        <div className={styles["botoes-container"]}>
          <button onClick={() => setMostrarModal(true)} className={styles.botaoAlterar}>
            Alterar
          </button>

          <button
            onClick={() => setMostrarConfirmDelete(true)}
            className={styles.botaoExcluir}
          >
            Excluir Conta
          </button>
        </div>
      </div>

      {mostrarModal && (
        <ModalAlteracao
          usuarioLogado={usuario}
          fecharModal={() => setMostrarModal(false)}
          atualizarUsuario={(novosDados) => setUsuario(novosDados)}
        />
      )}

      <ConfirmDeleteUser
        aberto={mostrarConfirmDelete}
        mensagem={"Deseja excluir sua conta?"}
        onConfirm={() => {
          setMostrarConfirmDelete(false);
          handleConfirmarExcluir();
        }}
        onCancel={() => setMostrarConfirmDelete(false)}
      />

      <Footer />
    </>
  );
}
