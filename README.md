# Academia Finder

Painel interativo em React para buscar academias por cidade ou bairro e consultar, de forma rápida, as informações de cada estabelecimento.

## 🎯 Problemática

Encontrar uma academia perto de casa costuma exigir abrir mapas e várias abas, e ainda assim faltam informações básicas como horário de funcionamento e contato. Como reunir esses dados em um só lugar, de forma clara e rápida?

## 💡 Objetivo da aplicação

Desenvolver uma aplicação React que consome APIs públicas para localizar academias em uma região e apresentar os dados de cada uma de forma organizada, permitindo buscar e consultar detalhes.

## 👤 Público-alvo

Pessoas que querem começar ou retomar os treinos e procuram opções em um bairro ou cidade, geralmente pelo celular, e precisam decidir rápido com base em informações objetivas.

## 📋 Requisitos

- Buscar academias por cidade ou bairro
- Listar os resultados em cards
- Exibir os detalhes de cada academia
- Informar o usuário durante o carregamento, em caso de erro e quando não houver resultados
- Funcionar em celular, tablet e desktop

## 🔌 API utilizada

| API | Função no projeto |
| --- | --- |
| [Nominatim](https://nominatim.org/) (OpenStreetMap) | Converte o nome digitado (cidade ou bairro) em coordenadas |
| [Overpass API](https://overpass-api.de/) (OpenStreetMap) | Retorna as academias (`leisure=fitness_centre`) ao redor dessas coordenadas |

Ambas são gratuitas e não exigem chave de acesso. A busca tenta o servidor principal da Overpass e, caso ele não responda, usa automaticamente dois servidores alternativos (mirrors).

## 🗂️ Dados apresentados

| Campo | Observação |
| --- | --- |
| Nome | Quando ausente, exibir "Academia sem nome" |
| Endereço | Montado a partir dos dados disponíveis |
| Horário de funcionamento | Exibir "Não informado" quando ausente |
| Telefone | Exibir "Não informado" quando ausente |
| Site | Exibir "Não informado" quando ausente |

Os dados do OpenStreetMap são mantidos por voluntários, por isso alguns campos podem estar vazios.

## 🧩 Arquitetura e componentes

Fluxo dos dados: