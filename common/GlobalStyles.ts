import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`

    :root{
        --dark: rgb(41, 41, 41);
        --red: rgb(168, 24, 24);
        --white: rgb(255, 255, 255);
        --dark-gray: rgb(56, 56, 56);
        --light-gray: rgb(201, 201, 201);

        --ranchers: 'Ranchers', cursive;
    }

    html{
        font-size: 62.5%;
    }

    *, *::after, *::before{
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }

    body{
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        font-size: 1.6rem;
        font-family: 'Roboto', sans-serif;
    }
`

export default GlobalStyle