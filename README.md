# Sistema-Help-Desk
Projeto Full Stack construído com Node.js, MySQL, Express, JavaScript, HTML e CSS

O sistema está divido nas branchs de front-end e back-end

## Usuários
Há três tipos de usuários: Administradores, Suportes e Clientes

O cliente, ao entrar na aplicação por meio do login, poderá criar novos chamados e consultar os que ele abriu. Em cada ticket há um espaço de chat para que ele possa conversar com o funcionário responsável pela solicitação. Este usuário pode editar seus dados cadastrados. 

O suporte, ao logar, poderá ver a lista dos chamados e os detalhes de cada um. Caso em algum ticket não houver um profissional associado, ele poderá pegar o ticket para resolver o problema. Este usuário pode gerenciar os clientes, as categorias dos chamados e alterar os dados de sua própria conta.

O Administrador, ao se autenticar no sistema, além de ter acesso a todos os recursos do suporte, também pode gerenciar usuários do tipo adminstradores, suportes e remover um funcionário que esteja responsável por um determinado ticket.  

## Execução o sistema

Para executar a aplição back-end é necessário ter instalado no computador o Node.js e o MySQL. A versão do Node.js utilizada é o 20.15.1

### Instalação das dependências do projeto no Back-end

```bash
npm install
```
### Execução

```bash
npm run dev
```

Também é necessário criar um arquivo .env para configurar as variáveis de ambiente, de acordo com a estrutura do exemplo

No front-end, a aplicação foi executada com a extensão do vscode Live Server, na porta 5500.
