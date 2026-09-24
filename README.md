# 🎮 PartyUp

```{=html}
<p align="center">
```
`<strong>`{=html}Never Play Alone.`</strong>`{=html}
```{=html}
</p>
```
```{=html}
<p align="center">
```
Uma rede social desenvolvida para conectar jogadores, formar parties e
tornar mais fácil encontrar pessoas compatíveis para jogar.
```{=html}
</p>
```

------------------------------------------------------------------------

## 📖 Sobre o projeto

O **PartyUp** é um aplicativo mobile desenvolvido em **React Native**
que tem como objetivo conectar jogadores que procuram outras pessoas
para jogar.

A proposta surgiu a partir de uma situação comum em jogos multiplayer:
muitas vezes o jogador quer iniciar uma partida, porém seus amigos estão
offline, já estão em outro grupo ou não jogam o mesmo título naquele
momento.

O PartyUp busca facilitar esse processo através de uma experiência
social focada na criação e descoberta de **parties**, permitindo que
jogadores encontrem pessoas de acordo com critérios como jogo, modo de
jogo, nível, disponibilidade e estilo de gameplay.

O projeto está sendo desenvolvido durante os **Checkpoints 4, 5 e 6** da
disciplina de **Mobile Development & IoT --- Engenharia de Software**,
evoluindo desde sua concepção até uma aplicação mobile instalável.

------------------------------------------------------------------------

# ❗ Problema

Jogos multiplayer dependem da interação entre jogadores, mas nem sempre
é fácil encontrar pessoas disponíveis e compatíveis para formar uma
equipe.

Alguns dos principais problemas identificados são:

-   Amigos nem sempre estão disponíveis no mesmo horário;
-   Dificuldade para encontrar jogadores do mesmo nível;
-   Diferenças entre jogadores casuais e competitivos;
-   Falta de comunicação entre os integrantes de equipes aleatórias;
-   Comunidades tradicionais podem exigir que o jogador procure
    manualmente por grupos;
-   Falta de informações sobre o comportamento e reputação de jogadores
    desconhecidos.

O PartyUp pretende reduzir essas dificuldades centralizando a busca por
jogadores em uma plataforma criada especificamente para esse propósito.

------------------------------------------------------------------------

# 💡 Solução

O **PartyUp** funciona como uma rede social voltada para formação de
grupos em jogos multiplayer.

O usuário poderá encontrar parties abertas ou criar sua própria party
informando características como:

-   🎮 Jogo;
-   🕹️ Modo de jogo;
-   🏆 Rank ou nível;
-   👥 Quantidade de jogadores necessários;
-   🎙️ Necessidade de microfone;
-   🎯 Estilo casual ou competitivo;
-   🌎 Região;
-   🟢 Disponibilidade.

A proposta é transformar o processo de:

> **"Quero jogar, mas não tenho com quem."**

em:

> **"Abra o PartyUp, encontre sua party e jogue."**

------------------------------------------------------------------------

# 🎯 Público-alvo

O PartyUp é direcionado principalmente para **jogadores de jogos
multiplayer online**, tanto de PC quanto de consoles.

O público inclui jogadores:

-   Casuais;
-   Competitivos;
-   Que procuram equipes para partidas ranqueadas;
-   Que querem conhecer novos jogadores;
-   Que participam de jogos cooperativos;
-   Que desejam encontrar pessoas com estilo de gameplay semelhante.

A plataforma busca atender principalmente usuários acostumados com
comunidades digitais, jogos online e redes sociais.

------------------------------------------------------------------------

# 💎 Proposta de valor

> **Conectar jogadores compatíveis de maneira rápida, social e
> direcionada ao contexto de cada jogo.**

Diferentemente de plataformas generalistas de comunicação, o PartyUp é
pensado desde o início para responder uma pergunta específica:

**"Com quem eu posso jogar agora?"**

A plataforma combina descoberta de jogadores, criação de grupos, perfil
gamer, comunicação e reputação em uma única experiência.

------------------------------------------------------------------------

# ✨ Funcionalidades do protótipo --- CP5

Na etapa de **Checkpoint 5**, o PartyUp evoluiu da proposta conceitual
para um **protótipo funcional**, com navegação entre telas,
autenticação, persistência de dados e fluxos principais implementados.

### 🔐 Cadastro e Login

O aplicativo possui autenticação integrada ao **Supabase Auth**,
permitindo criação de conta, login, manutenção da sessão e logout.

### 🏠 Home

A tela inicial apresenta uma visão geral da plataforma, atalhos de
navegação e parties disponíveis, utilizando os dados carregados pela
aplicação.

### 🔎 Explorar

Permite pesquisar e filtrar parties por informações como jogo, título,
modo, rank, região e estilo de gameplay.

### ➕ Criar Party

Usuários autenticados podem criar uma party informando:

-   Jogo;
-   Título;
-   Modo;
-   Rank;
-   Região;
-   Quantidade máxima de jogadores;
-   Uso de microfone;
-   Estilo casual ou competitivo.

As parties criadas são persistidas através do **Supabase** e passam a
aparecer nas áreas correspondentes da aplicação.

### 👥 Detalhes da Party

Cada party possui uma tela própria para visualização das principais
informações do grupo e do jogador responsável pela criação.

### 💬 Chats

O protótipo possui uma listagem de conversas e uma tela de chat
funcional para simulação da comunicação entre jogadores. Nesta etapa, as
mensagens utilizam dados locais/mockados.

### 👤 Perfil Gamer

O perfil apresenta dados do usuário autenticado, informações da conta,
jogos favoritos e parties criadas pelo próprio usuário.

Também existe suporte para edição de informações do perfil e
encerramento da sessão.

### 🎨 Design System

As telas compartilham uma identidade visual consistente, utilizando tema
escuro, tons de roxo, indicadores em verde, componentes reutilizáveis e
navegação inferior padronizada.

> Recursos mais avançados, como reputação completa, avaliações entre
> jogadores, amigos e comunicação em tempo real, permanecem planejados
> para evoluções futuras do projeto.

------------------------------------------------------------------------

# 🎨 Identidade visual

A identidade do PartyUp busca combinar características de **redes
sociais modernas** com elementos presentes no universo gamer.

O objetivo é criar uma interface escura, moderna e tecnológica sem
depender exclusivamente dos padrões visuais tradicionais de plataformas
gamers.

## Nome

**PartyUp**

O nome representa diretamente a principal ação da plataforma: **formar
uma party e jogar em grupo**.

## Slogan

> **Never Play Alone.**

*"Nunca jogue sozinho."*

------------------------------------------------------------------------

# 🖼️ Logo

A identidade visual utiliza um símbolo inspirado na união das letras
**P** e **U**, representando **PartyUp**, combinado com elementos
visuais relacionados a comunicação e conexão.

```{=html}
<p align="center">
```
`<img src="./assets/images/logo.png" width="300" alt="Logo PartyUp">`{=html}
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<strong>`{=html}PARTYUP`</strong>`{=html}`<br>`{=html}
`<em>`{=html}Never Play Alone.`</em>`{=html}
```{=html}
</p>
```

------------------------------------------------------------------------

# 🎨 Paleta de cores

A identidade visual utiliza tons escuros combinados com roxo e verde.

  Cor              HEX         Utilização
  ---------------- ----------- ---------------------------------
  Background       `#0B0916`   Fundo principal
  Surface          `#151126`   Cards e superfícies
  Surface Light    `#211A38`   Elementos secundários
  Primary Purple   `#8B5CF6`   Cor principal
  Light Purple     `#A78BFA`   Destaques
  Online Green     `#22C55E`   Status online e ações positivas
  Text             `#F8FAFC`   Texto principal
  Secondary Text   `#A1A1AA`   Texto secundário
  Border           `#29233D`   Bordas e separadores

O **roxo** representa a identidade tecnológica e social do PartyUp,
enquanto o **verde** é utilizado principalmente para representar
disponibilidade, usuários online e ações positivas.

------------------------------------------------------------------------

# 🔤 Tipografia

A identidade visual utiliza duas famílias tipográficas principais:

### Poppins

Utilizada principalmente em:

-   Títulos;
-   Headlines;
-   Nome do aplicativo;
-   Elementos de destaque.

### Inter

Utilizada principalmente em:

-   Textos;
-   Botões;
-   Informações;
-   Cards;
-   Elementos da interface.

Essa combinação cria uma hierarquia visual clara mantendo boa
legibilidade em dispositivos móveis.

------------------------------------------------------------------------

# 📱 Protótipo visual --- CP4

O protótipo visual do PartyUp foi desenvolvido no **Figma** durante a
etapa de idealização.

As principais telas conceituais incluem:

-   Splash;
-   Login;
-   Home;
-   Explorar;
-   Criar Party;
-   Party;
-   Chat;
-   Perfil.

## 🎨 Telas conceituais do Figma

```{=html}
<p align="center">
```
`<img src="./assets/images/splash.png" width="180">`{=html}
`<img src="./assets/images/login.png" width="180">`{=html}
`<img src="./assets/images/home.png" width="180">`{=html}
`<img src="./assets/images/explorar.png" width="180">`{=html}
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<img src="./assets/images/party.png" width="180">`{=html}
`<img src="./assets/images/chat.png" width="180">`{=html}
`<img src="./assets/images/perfil.png" width="180">`{=html}
```{=html}
</p>
```
> **Link do Figma:**
> https://www.figma.com/design/KCv2P0sTfgrNFS0LaAiX7V/CP1-Mobile?node-id=0-1&p=f&t=KD9aipQgc41XHI2k-0

------------------------------------------------------------------------

# 💰 Modelo de negócio

O PartyUp utilizará inicialmente um modelo **Freemium**.

A funcionalidade principal continuará disponível gratuitamente,
permitindo que qualquer jogador utilize a plataforma para encontrar
pessoas e formar parties.

## 🎮 PartyUp Free

O plano gratuito poderá oferecer:

-   Criação de perfil;
-   Busca de jogadores;
-   Criação de parties;
-   Entrada em parties;
-   Chat;
-   Sistema básico de reputação;
-   Descoberta de jogos.

## 💎 PartyUp+

O **PartyUp+** será a modalidade premium da plataforma.

Poderá oferecer recursos adicionais como:

-   Personalização avançada do perfil;
-   Badges exclusivos;
-   Estatísticas detalhadas;
-   Filtros avançados para encontrar jogadores;
-   Histórico avançado;
-   Recursos adicionais para comunidades;
-   Maior personalização da experiência.

A estratégia busca evitar limitar a principal funcionalidade do
aplicativo através de pagamento, permitindo que a comunidade continue
crescendo enquanto recursos adicionais sustentam financeiramente a
plataforma.

------------------------------------------------------------------------

# ⚔️ Diferencial competitivo

Plataformas de comunicação já permitem a criação de comunidades gamers.
Entretanto, normalmente o jogador precisa primeiro encontrar um
servidor, comunidade ou grupo adequado para depois procurar pessoas
disponíveis.

O PartyUp busca inverter esse processo.

### Plataformas tradicionais

``` text
Entrar em uma comunidade
        ↓
Procurar o jogo
        ↓
Procurar um canal
        ↓
Perguntar quem está disponível
        ↓
Montar o grupo
```

### PartyUp

``` text
Escolher o jogo
        ↓
Encontrar jogadores disponíveis
        ↓
Aplicar preferências
        ↓
Entrar na Party
        ↓
Jogar
```

O diferencial está na especialização da plataforma na **descoberta e
formação de equipes**, utilizando informações relevantes ao contexto
gamer.

Entre elas:

-   Jogo;
-   Rank;
-   Modo;
-   Região;
-   Microfone;
-   Disponibilidade;
-   Estilo de gameplay;
-   Reputação.

------------------------------------------------------------------------

# 🛠️ Tecnologias

O protótipo funcional utiliza:

-   **React Native** --- desenvolvimento da aplicação mobile;
-   **Expo** --- ambiente de desenvolvimento e execução;
-   **TypeScript** --- tipagem e desenvolvimento da aplicação;
-   **Expo Router** --- rotas e navegação baseada em arquivos;
-   **Supabase Auth** --- cadastro, login e gerenciamento de sessão;
-   **Supabase Database** --- persistência das parties e perfis;
-   **Ionicons** --- biblioteca de ícones utilizada na interface;
-   **Figma** --- prototipação e identidade visual;
-   **Git** --- controle de versão;
-   **GitHub** --- hospedagem e colaboração do código-fonte.

## 🧠 Decisões técnicas

-   A aplicação foi estruturada com **Expo Router** para manter a
    navegação organizada por arquivos.
-   A autenticação foi centralizada em um **AuthContext**, evitando
    duplicação da lógica de sessão entre as telas.
-   O gerenciamento das parties foi centralizado em um **PartyContext**,
    permitindo que Home, Explorar, Criar Party e Perfil compartilhem o
    mesmo estado.
-   O **Supabase** foi escolhido para fornecer autenticação e
    persistência sem a necessidade de desenvolver um backend próprio
    nesta etapa.
-   O chat permanece com dados mockados na CP5, permitindo validar
    interface, navegação e interação antes de uma implementação em tempo
    real.
-   Cores, espaçamentos e padrões visuais são centralizados no arquivo
    de tema para manter consistência entre as telas.

------------------------------------------------------------------------

# 🏗️ Estrutura atual

A estrutura do projeto separa telas, componentes, contextos, dados,
serviços e tipos.

``` text
partyup/
│
├── assets/
│   ├── images/
│   └── icons/
│
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── cadastro.tsx
│   │   │
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── home.tsx
│   │   │   ├── explorar.tsx
│   │   │   ├── criar.tsx
│   │   │   ├── chats.tsx
│   │   │   └── perfil.tsx
│   │   │
│   │   ├── party/
│   │   │   └── [id].tsx
│   │   │
│   │   └── chat/
│   │       └── [id].tsx
│   │
│   ├── components/
│   │   └── PartyCard.tsx
│   │
│   ├── constants/
│   │   └── theme.ts
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── PartyContext.tsx
│   │
│   ├── data/
│   │   └── messages.ts
│   │
│   ├── services/
│   │   └── supabase.ts
│   │
│   └── types/
│       └── party.ts
│
├── .env
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

### `src/app`

Contém as telas e rotas da aplicação utilizando Expo Router.

### `src/components`

Contém componentes reutilizáveis, como os cards de Party.

### `src/contexts`

Centraliza estados compartilhados e regras de autenticação e parties.

### `src/services`

Contém a configuração de serviços externos, incluindo a conexão com o
Supabase.

### `src/data`

Armazena dados locais utilizados no protótipo, como as mensagens
simuladas do chat.

### `src/constants`

Centraliza cores, espaçamentos, bordas e demais elementos do Design
System.

------------------------------------------------------------------------

# 🧭 Fluxo principal da aplicação

``` text
Splash
  │
  ▼
Login ◄──────── Cadastro
  │
  ▼
Home
  │
  ├──────────► Explorar ──────► Detalhes da Party
  │
  ├──────────► Criar Party ───► Detalhes da Party
  │
  ├──────────► Chats ─────────► Conversa
  │
  └──────────► Perfil
                    │
                    ├── Editar perfil
                    └── Sair da conta
```

A navegação principal é realizada por uma barra inferior com acesso às
telas **Home, Explorar, Criar, Chats e Perfil**.

------------------------------------------------------------------------

# 🚀 Como executar o projeto

## Pré-requisitos

Antes de iniciar, é necessário possuir:

-   Node.js;
-   npm;
-   Git;
-   Ambiente compatível com Expo;
-   Android Studio, caso a execução seja feita pelo emulador Android.

## 1. Clone o repositório

``` bash
git clone https://github.com/AndreLQueiroz/PartyUp.git
```

## 2. Entre na pasta

``` bash
cd PartyUp
```

## 3. Instale as dependências

``` bash
npm install
```

## 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as credenciais do projeto
Supabase.

``` env
EXPO_PUBLIC_SUPABASE_URL=SUA_URL_DO_SUPABASE
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=SUA_CHAVE_PUBLICA
```

> As credenciais reais do ambiente não devem ser publicadas diretamente
> no README.

## 5. Execute o projeto

``` bash
npx expo start
```

A partir do Expo, o protótipo pode ser executado em navegador,
dispositivo físico ou emulador Android.

## 🤖 Execução no Android Studio

Para demonstrar a aplicação em ambiente mobile:

1.  Abra o Android Studio;
2.  Inicie um dispositivo virtual pelo Device Manager;
3.  Execute `npx expo start`;
4.  Pressione `a` no terminal para abrir o projeto no Android;
5.  Aguarde a aplicação carregar no emulador.

------------------------------------------------------------------------

# 🧪 Testes --- CP5

Para a validação do protótipo, foi definido um roteiro de testes manuais
cobrindo os fluxos principais.

  -----------------------------------------------------------------------
  ID                Cenário           Ação esperada     Resultado
                                                        esperado
  ----------------- ----------------- ----------------- -----------------
  T01               Cadastro          Preencher os      Conta criada e
                                      dados e criar uma usuário
                                      conta             direcionado ao
                                                        login

  T02               Login             Informar e-mail e Sessão iniciada e
                                      senha válidos     Home exibida

  T03               Navegação         Alternar entre as Todas as telas
                                      abas inferiores   principais abrem
                                                        corretamente

  T04               Explorar          Pesquisar ou      Lista atualizada
                                      filtrar parties   conforme os
                                                        critérios

  T05               Criar Party       Preencher o       Party persistida
                                      formulário e      e exibida na
                                      confirmar         aplicação

  T06               Detalhes          Abrir uma Party   Informações
                                                        correspondentes
                                                        são apresentadas

  T07               Chat              Abrir conversa e  Nova mensagem
                                      enviar mensagem   aparece na
                                                        conversa simulada

  T08               Perfil            Abrir o perfil    Dados do usuário
                                      autenticado       e suas parties
                                                        são exibidos

  T09               Editar perfil     Alterar dados e   Informações
                                      salvar            atualizadas na
                                                        interface

  T10               Logout            Encerrar a sessão Sessão encerrada
                                                        e usuário retorna
                                                        ao login
  -----------------------------------------------------------------------

> Antes da entrega, os testes devem ser executados no ambiente utilizado
> na demonstração e qualquer falha encontrada deve ser corrigida ou
> registrada.

------------------------------------------------------------------------

# 📸 Evidências da aplicação --- CP5

As capturas de tela da versão funcional serão adicionadas após a
validação final no emulador/dispositivo.

Sugestão de arquivos para manter a documentação organizada:

``` text
assets/images/cp5/
├── login.png
├── cadastro.png
├── home.png
├── explorar.png
├── criar-party.png
├── party.png
├── chats.png
├── chat.png
└── perfil.png
```

Quando as imagens estiverem prontas, esta seção pode utilizar:

``` html
<p align="center">
  <img src="./assets/images/cp5/home.png" width="180">
  <img src="./assets/images/cp5/explorar.png" width="180">
  <img src="./assets/images/cp5/criar-party.png" width="180">
  <img src="./assets/images/cp5/perfil.png" width="180">
</p>
```

------------------------------------------------------------------------

# 🗺️ Roadmap acadêmico

O desenvolvimento do PartyUp está dividido em três etapas.

### CP4 --- Idealização

-   [x] Definição do conceito;
-   [x] Definição do problema;
-   [x] Público-alvo;
-   [x] Proposta de valor;
-   [x] Identidade visual;
-   [x] Protótipo no Figma;
-   [x] Setup React Native/Expo;
-   [x] Estrutura inicial;
-   [x] Repositório GitHub;
-   [x] Modelo de negócio.

### CP5 --- Protótipo funcional

-   [x] Implementação das principais telas;
-   [x] Navegação completa com Expo Router;
-   [x] Cadastro e login;
-   [x] Integração com Supabase;
-   [x] Persistência de parties;
-   [x] Criação de parties;
-   [x] Exploração e busca de parties;
-   [x] Tela de detalhes da Party;
-   [x] Chat simulado com dados mockados;
-   [x] Perfil do usuário;
-   [x] Design System aplicado às telas;
-   [x] Documentação dos principais fluxos;
-   [x] Plano de testes manuais;
-   [x] Evidências finais com screenshots/vídeo da aplicação;

### CP6 --- Entrega final

-   [ ] Implementação das funcionalidades finais;
-   [ ] Persistência de dados;
-   [ ] Integrações necessárias;
-   [ ] Correção de bugs;
-   [ ] Documentação final;
-   [ ] Manual de utilização;
-   [ ] Build final;
-   [ ] APK instalável.

------------------------------------------------------------------------

# 👥 Equipe

Projeto desenvolvido pelos alunos de **Engenharia de Software**.

  ---------------------------------------------------------------------------
  Integrante                              RM Responsabilidade principal
  --------------------------------- -------- --------------------------------
  **Andre Luiz Fernandes de           554503 Product Owner / Arquitetura
  Queiroz**                                  Mobile

  **Paulo Poças**                     556080 Desenvolvimento Mobile

  **Rafael Bocchi**                   557603 UI/UX Design / Identidade Visual

  **Rafael Federici**                 554736 Desenvolvimento Mobile /
                                             Navegação

  **Marcus Viniccius**                555490 QA / Documentação
  ---------------------------------------------------------------------------

## Responsabilidades

### 👨‍💻 Andre Luiz Fernandes de Queiroz

**Product Owner / Arquitetura Mobile**

Responsável principalmente pela definição do escopo do produto,
organização das funcionalidades, estrutura inicial do projeto e decisões
relacionadas à arquitetura da aplicação.

### 📱 Paulo Poças

**Desenvolvimento Mobile**

Responsável pelo desenvolvimento e organização dos componentes da
interface mobile e apoio na implementação das telas do aplicativo.

### 🎨 Rafael Bocchi

**UI/UX Design / Identidade Visual**

Responsável pela prototipação das interfaces, consistência visual,
experiência do usuário e apoio na definição da identidade visual do
PartyUp.

### 🧭 Rafael Federici

**Desenvolvimento Mobile / Navegação**

Responsável pela estrutura de navegação, organização das rotas e apoio
na implementação das telas utilizando React Native e Expo Router.

### 🧪 Marcus Viniccius

**QA / Documentação**

Responsável pela organização da documentação, acompanhamento dos
requisitos dos checkpoints, evidências de funcionamento e planejamento
dos testes da aplicação.

> Apesar da divisão de responsabilidades principais, o desenvolvimento
> do PartyUp é realizado de maneira colaborativa entre todos os
> integrantes.

------------------------------------------------------------------------

# 📚 Disciplina

**Mobile Development & IoT** **Engenharia de Software --- 3º Ano**

Projeto desenvolvido como parte dos **Checkpoints 4, 5 e 6**,
acompanhando as etapas de idealização, prototipação e entrega final de
uma aplicação React Native.

------------------------------------------------------------------------

```{=html}
<p align="center">
```
`<strong>`{=html}🎮 PARTYUP`</strong>`{=html}
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<em>`{=html}Never Play Alone.`</em>`{=html}
```{=html}
</p>
```
