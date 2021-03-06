##### A NextJS project consuming the Marvel API
<img src="./assets/appbanner.png"></img>

[Projeto Live](https://marvel-api-next-js.vercel.app/)


## Observações
Olá. Minha experiência com NextJS é mínima. Fiz alguns projetos e esse workshop de umas 4 horas. Logo, meu código deve estar bem duvidoso, principalmente
a parte de data fetching.
Acredito que seja necessário dizer que, com mais tempo, seria capaz de implementar uma aplicação mais visualmente agradável.

Tive uma experiência horrível com a [API em questão](https://developer.marvel.com/).
Motivos: 
- O site que hospeda a documentação está sofrendo com oscilações ou algo do tipo.
- Muita autenticação para uma API tão simples como essa.
- O retorno das chamadas tendem a não trazer informações que deveriam ser essenciais. Exemplo:
    'http://gateway.marvel.com/v1/public/comics/${id}' . Esse é o endereço para buscar informações de alguma comic. Por algum motivo desconhecido,
    os responsáveis pela API decidiram que é legal não trazer fotos dos personagens listados como aparições na comic, e ao invés, retornam apenas o nome e
    o endereço para buscar pelo personagem.

- A documentação não cita qual endereço usar para fazer requisições localmente. Tive que procurar na internet algo de deveria estar escrito ali mesmo.
- Esse ponto eu posso ter perdido algo, ou pode ser uma limitação da API, ou, mal escrita mesmo. Usando o exemplo acima, ao fazer uma requisição à uma comic,
    consigo os personagens presentes. 
    ````
        available: 39
        ​​
        collectionURI: "http://gateway.marvel.com/v1/public/comics/2539/characters"
        ​​
        items: Array(20) [ {…}, {…}, {…}, … ]
        ​​
        returned: 20
    ````
    Como você pode notar, o número de personagens presentes, e o número de personagens retornados pela API são diferentes.
    Procurei uma resposta na API, porém , não achei nada. Posso estar comentendo algum erro.


## Sobre o projeto
Projeto com NextJS consumingo a API da Marvel Comics.

------------------------------

Acredito que a única parte da aplicação que necessite de explicações seja justamente a página inicial, com os personagens. Então vamos lá.

A API em si não foi implementada com paginação, mas dá a opção de pular resultados, e de limitar os mesmos.
Dada a limitação, implementei essa paginação em página única.

```` setNumberOfPages((data?.data?.data?.total / 20).toFixed()) ```` 

Dentro da função para buscar os dados, eu chamo essa função para atualizar o estado da quantidade de páginas. O total de personagens trazidos
é de 1493 ou próximo disso. Decidi que cada página deveria ter 20 personagens, então bastei dividir os 1493 por 20, e como o resultado era
float, arredondei para cima.


O componente de paginação vem da lib [Material UI](https://material-ui.com/).
```` 
<PaginationComponent 
    pages={{page: currentPage, countOfPages: Number(pages)}} 
    handlePageChange={changePage}
/>

-----------

const changePage = (event: ChangeEvent<HTMLInputElement>, value: number) => {
    fetcher("https://gateway.marvel.com/v1/public/characters", 20, value === 1 ? 0 : value * 10)
    setCurrentPage(value)
}

````
Ao trocar de página, com onChange, chamo essa função que atualiza o estado dos personagens, e altero o estado da página atual.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


