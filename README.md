# Projeto React Native Expo

Este é um aplicativo mobile desenvolvido com React Native e Expo para atender as necessidades da Diretoria de Pesquisa e Pós-Graduação da UTFPR (Curitiba). O aplicativo foi projetado para ser utilizado pelos coordenadores de curso, oferecendo uma interface intuitiva e eficiente para acessar informações sobre os editais dos programas de pós-graduação.

O aplicativo funciona em conjunto com um código em Python, responsável por buscar os editais diretamente do site da UTFPR Curitiba. Este repositório contém exclusivamente o código referente ao frontend do projeto, incluindo as telas e interações do aplicativo.

O backend com a integração está disponível no repositório Back_App.

## Funcionalidades

- Interface amigável para navegação entre as telas.

- Visualização das informações dos editais organizados por programas de pós-graduação.

- Integração com o backend para acesso aos dados atualizados.

## Telas

<div style="justify-content: space-between">
  <img src ="https://github.com/user-attachments/assets/cbed8e1f-ad0f-404c-b8b6-0a959e3be82e" width = "300px"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src ="https://github.com/user-attachments/assets/f6bc4cd0-868e-4234-97d4-8a7f9b80384f" width = "300px"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src ="https://github.com/user-attachments/assets/c9e76d28-e2ab-48b0-b3fd-5604b03c3370" width = "300px"/>
</div>

## Tecnologias Utilizadas

- React Native: Framework para desenvolvimento mobile.

- Expo: Ferramenta para simplificar o desenvolvimento e o gerenciamento do projeto.

- TypeScript: Linguagem para maior segurança e escalabilidade do código.

- Expo Router: Gerenciamento de navegação no aplicativo.

## Estrutura do Projeto
.
├── .expo               # Configurações geradas pelo Expo.
├── .vscode             # Configurações do editor VS Code.
├── assets              # Arquivos estáticos como imagens e fontes.
├── node_modules        # Dependências do projeto.
├── src                 # Código-fonte do aplicativo.
│   ├── app             # Navegação e páginas principais do app.
│   │   ├── (drawer)    # Configurações de navegação via Drawer.
│   │   ├── _layout.tsx # Layout principal do app.
│   │   ├── +not-found.tsx # Tela para rotas não encontradas.
│   │   ├── cadastro.tsx   # Tela de cadastro.
│   │   ├── index.tsx      # Tela inicial.
│   │   ├── recuperarSenha.tsx # Tela de recuperação de senha.
│   │   └── styles.ts       # Estilos gerais das telas.
│   ├── assets          # Imagens e outros arquivos estáticos específicos do src.
│   ├── components      # Componentes reutilizáveis da aplicação.
│   ├── context         # Contextos para gerenciamento de estado global.
│   ├── styles          # Estilos globais e temas.
│   └── utils           # Funções auxiliares e constantes.
└── package.json        # Dependências e scripts do projeto.

## Pré-requisitos

- Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node.js (versão LTS recomendada)

- Expo CLI

- Editor de código, como VS Code

## Como Executar o Projeto

1. Clone este repositório:
  	```bash
      git clone <url-do-repositorio>

3. Acesse o diretório do projeto:
    ```bash
      cd nome-do-projeto

3. Instale as dependências:
    ```bash
      npm install

4. Inicie o projeto:
    ```bash
      expo start

Escaneie o QR Code com o aplicativo Expo Go (disponível na App Store e Google Play) ou execute em um emulador.

