import React from "react";
import styles from "./sobre.module.css";
import { Navbar } from "../../components/Navbar/navbar.jsx";
import { Footer } from "../../components/Footer/footer.jsx";
import { FaGithub } from "react-icons/fa";

const Grupo3 = [
  {
    nome: "Cauã Pacheco",
    imagem: "/imagens/caua.jpg",
    descricao:
      "Sou Cauã Pacheco um estudante de Análise e Desenvolvimento de Sistemas (ADS) e desenvolvedor full-stack em formação. Me dedico a aprender e aplicar conhecimentos em Java, Spring Boot e React. Fiquei Responsável pela montagem e funcionalidade do Perfil.",
    github: "https://github.com/pachecoCaua",
  },
  {
    nome: "Daniel Lopes",
    imagem: "/imagens/daniel.jpg",
    descricao:
      "Me chamo Daniel Lopes, tenho 26 anos e estou em formação como desenvolvedor Full Stack, com foco em Back e Front-End. Neste projeto fiz a página de Cadastro, 404, ativação de conta e esqueci senha.",
    github: "https://github.com/Danzete",
  },
  {
    nome: "Domingos Machado",
    imagem: "/imagens/domingos.jpg",
    descricao:
      "Olá! Me chamo Domingos Machado, tenho 31 anos e moro em Teresópolis. Estou em formação como Desenvolvedor Fullstack, com maior interesse na área de Frontend, especialmente depois de começar a trabalhar com React. Neste projeto fui responsável pela Homepage e pela página de produto",
    github: "https://github.com/DomingosMachado",
  },
  {
    nome: "Rayca Thais",
    imagem: "/imagens/rayca.jpg",
    descricao:
      "Meu nome é Rayca Thais, tenho 18 anos e sou residente em Teresópolis – RJ. Recém-formada no ensino médio, iniciei minha trajetória na área de tecnologia por da residência do Serratec, onde tive meu primeiro contato com programação.Neste projeto, fui responsável por desenvolver a página do carrinho e implementar toda a lógica de funcionamento dele. Fiquei responsável pela página de Carrinho e mini carrinho",
    github: "https://github.com/raycaThais",
  },
  {
    nome: "Rodrigo Schuab",
    imagem: "/imagens/rodrigo.jpg",
    descricao:
      "Sou o Rodrigo, tenho 25 anos, estou em formação como Desenvolvedor Full Stack e cursando Análise e Desenvolvimento de Sistemas. E nesse trabalho fui responsável pela página Sobre do Grupo 3.",
    github: "https://github.com/rodschuab",
  },
  {
    nome: "Sabrina Siqueira",
    imagem: "/imagens/sabrina.jpg",
    descricao:
      "Meu nome é Sabrina Siqueira, sou estudante de Sistemas de Informação no CEFET/RJ. Sou apaixonada por tecnologia, buscando constantemente aprender e me desenvolver em programação e soluções digitais. Participo de projetos acadêmicos e pessoais voltados à inovação, e tenho interesse especial em desenvolvimento web, aplicações mobile e sistemas voltados para otimização de processos. Nest projeto fui responsável pela página de Login.",
    github: "https://github.com/Sai-czs",
  },
];

export function Sobre() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>🕵️‍♂️ Arquivo Confidencial do Grupo 3</h1>
        <p className={styles.missao}>
          Informações sobre os integrantes do Grupo 3
        </p>

        {Grupo3.map((integrante, index) => (
          <div key={index} className={styles.integrante}>
            <img src={integrante.imagem} alt={integrante.nome} />
            <div className={styles.info}>
              <h2>{integrante.nome}</h2>
              <p>{integrante.descricao}</p>
              {integrante.github && (
                <a
                  href={integrante.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.githubLink}
                >
                  <FaGithub size={20} style={{ marginRight: "6px" }} />
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Sobre;
