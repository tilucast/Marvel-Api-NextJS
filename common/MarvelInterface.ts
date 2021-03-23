interface MarvelInterface {
   
    count: number | string
    limit: number | string
    results: MarvelCharacters[]
    total: number | string

}

interface MarvelCharacters {
    id: number
    name: string
    thumbnail: { path: string, extension: string }
    description: string | "" | null | undefined
    comics: {
        available: number | string
        collectionURI: string
        items: {
            name: string
            resourceURI: string
        }[]
    }
}

interface MarvelComics {
    
    title: string
    pageCount: number | string
    thumbnail: {
        path: string
        extension: string
    }
    characters: {
        items: {
            resourceURI: string
            name: string
        }[]
    }
}

export type {MarvelInterface, MarvelCharacters, MarvelComics}