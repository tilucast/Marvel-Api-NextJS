import { ChangeEvent, useState } from 'react'
import { MarvelCharacters, MarvelInterface } from '../common/MarvelInterface'
import PaginationComponent from '../components/Pagination'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import axios from 'axios'
import styled from 'styled-components'

export default function Home() {

  const [currentPage, setCurrentPage] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState<string | number>(0)
  const [charactersDataState, setCharactersDataState] = useState<MarvelInterface>()
  
  const changePage = (event: ChangeEvent<HTMLInputElement>, value: number) => {
      fetcher("https://gateway.marvel.com/v1/public/characters", 20, value === 1 ? 0 : value * 10)
      setCurrentPage(value)
  }

  const fetcher = (route: string, limitQuery: number | string, offSetQuery: number | string) => {

    return axios.get(route, {params: 
      {apikey: process.env.NEXT_PUBLIC_PUBLIC_KEY, limit: limitQuery, offset: offSetQuery}
    }).then(data => {

      setCharactersDataState(data?.data?.data)
      setNumberOfPages((data?.data?.data?.total / 20).toFixed())

      return data
    }).catch(error => error)

  }

  const charactersData = (limitQuery: number | string, offSetQuery: number | string) => {
    const {data, error} =  useSWR("https://gateway.marvel.com/v1/public/characters", fetcher)

    return {
      characters: charactersDataState,
      pages: numberOfPages,
      isLoading: !error && !data,
      isError: error
    }
  }

  const {characters, pages, isLoading, isError} = charactersData(20, 0)

  if(isLoading) return <p>Loading ...</p>
  if(isError) return <p>An error: {isError} has occurred.</p>

  return (
    
    <Main>
      <section className="image-container">
      </section>

      <PaginationComponent 
          pages={{page: currentPage, countOfPages: Number(pages)}} 
          handlePageChange={changePage}
      />

      <section className="content">
        {characters && characters.results.map((character: MarvelCharacters,index) => (
          <article key={character.id + index + Math.random()*10}>
            <Link href="/characters/[id]" as={`/characters/${character.id}`}  >
              <div className="dull-container">
                <Image 
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  
                  width={300}
                  height={300}
                />
              
                <span>{character.name}</span>
              </div>
            </Link>
          </article>
        ))}

      </section>
    </Main>
  )
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--dark);
  padding: 0 0 4rem 0;

  .MuiPagination-root{
    margin-bottom: 2rem;

    ul li button{
      color: var(--white);
      font-size: 1.4rem;

      &:hover{
        background-color: var(--red);
      }
    }
  }

  .image-container{
    width: 100%;
    height: 30vh;
    background-image: url(marvelbanner.jpg);
    margin-bottom: 4rem;
    background-position: center;
    background-size: cover;

    img{
      width: 100%;
      height: 100%;
      
    }
  }

  h1{
    color: var(--green);
  }

  section.content{
    display: flex;
    align-items: center;
    gap: 2rem;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 0 3rem;

    article{
      
      border-radius: 8px;
      overflow: hidden;

      color: var(--light-gray);

      > div{
        cursor: pointer;
        &:hover{
          filter: brightness(120%);
        }
      }

      .dull-container{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      span{
        display: block;
        width: 100%;
        padding: 1rem 0 1rem 1rem;
        cursor: pointer;
        color: var(--white);
        transition: all .2s;
        font-size: 1.8rem;
        font-family: var(--ranchers);

        &:hover{
          color: var(--white);
          background-color: var(--red);
        }
      }
      
    }

  }
  
`
