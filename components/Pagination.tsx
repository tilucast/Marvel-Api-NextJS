import React, { ChangeEvent } from 'react'
import Pagination from '@material-ui/lab/Pagination'

const PaginationComponent: React.FC<{pages: {page: number, countOfPages: number}, handlePageChange: (event: ChangeEvent<unknown>, value: number) => void}> 
    = ({pages, handlePageChange}) => {
        return (
            <>
                {pages.countOfPages && 
                    <Pagination
                        page={pages.page}
                        count={pages.countOfPages}
                        onChange={handlePageChange}
                        color="secondary"
                    /> 
                }
            </>
        )
    }

export default PaginationComponent