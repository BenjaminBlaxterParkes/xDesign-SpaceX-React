import React, {useMemo} from 'react'
import {useTable, useGlobalFilter, useFilters, useSortBy} from 'react-table'
import {COLUMNS} from './columns'
import {GlobalFilter} from './GlobalFilter'
import './table.css'

export const SpacexSortingTable = () => {

    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', "https://api.spacexdata.com/v4/launches", false)
    xmlHttp.send()
    const DATA = JSON.parse(xmlHttp.responseText)

    const columns = useMemo(() => COLUMNS, [])
    const launchData = useMemo(() => DATA, [])

    const tableInstance = useTable({
        columns: columns,
        data: launchData,
    },
    useFilters,
    useGlobalFilter,
    useSortBy)
    

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = tableInstance

    const {globalFilter} = state

    return (
        <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

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
                        rows.map(row => {
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
        </>
    )
}

//<div>{column.canFilter ? column.render('Filter') : null }</div>
