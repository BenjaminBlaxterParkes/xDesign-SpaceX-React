import React, {useMemo} from 'react'
import {useTable, useGlobalFilter, useFilters, usePagination, useSortBy} from 'react-table'
import {GlobalFilter} from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
import {COLUMNS} from './columns'
import './table.css'

export const SpacexSortingTable = () => {

    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', "https://api.spacexdata.com/v4/launches", false)
    xmlHttp.send()
    const DATA = JSON.parse(xmlHttp.responseText)

    const columns = useMemo(() => COLUMNS, [])
    const launchData = useMemo(() => DATA, [])

    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, [])

    const tableInstance = useTable({
        columns: columns,
        data: launchData,
        defaultColumn
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination)
    

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        canNextPage,
        previousPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
        state,
        setGlobalFilter,
    } = tableInstance

    const {globalFilter} = state
    const {pageIndex, pageSize} = state

    return (
        <>
            <div className="global_filter">
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>

            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                { headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}
                                        </span>
                                        <div>{column.canFilter ? column.render('Filter') : null }</div>
                                    </th>
                                ))}
                            </tr>
                        ))
                    }
                    
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}
                    className="pagination_button">Previous</button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong> {' '}
                </span>
                <select value={pageSize} 
                    onchange={(e) => setPageSize(Number(e.target.value))}>
                    {
                        [10, 25, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))
                    }
                </select>
                <button onClick={() => nextPage()} disabled={!canNextPage}
                    className="pagination_button">Next</button>
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
            </div>
        </>
    )
}

/*
<span>
    | Got to page: {' '}
    <input type='number' defaultValue={pageIndex +1} 
    onChange={e => {
        const pageNumber = e.target.value ? Number(e.target.value) -1 : 0
        gotoPage(pageNumber)
    }}/>
</span>
*/
