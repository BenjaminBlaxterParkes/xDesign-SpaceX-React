import React, {useMemo} from 'react'
import {useTable, useGlobalFilter, useFilters, useSortBy} from 'react-table'
import {COLUMNS} from './columns'
import {format} from 'date-fns'
import sort from '../assets/icon/sort.png'
import refresh from '../assets/icon/refresh.png'
import './table.css'

export const SpacexLaunches = () => {

    var DATA

    function loadData() {
        const xmlHttp = new XMLHttpRequest()
        xmlHttp.open('GET', "https://api.spacexdata.com/v4/launches", false)
        xmlHttp.send()
        DATA = JSON.parse(xmlHttp.responseText)
    }

    loadData()

    const columns = useMemo(() => COLUMNS, [])
    const launchData = useMemo(() => DATA, [])

    const defaultColumn = useMemo(() => {
        return {
            Filter: SelectColumnFilter
        }
    }, [])

    const tableInstance = useTable({
        columns: columns,
        data: launchData,
        defaultColumn
    },
    useFilters,
    useGlobalFilter,
    useSortBy
    )
    

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    function SelectColumnFilter({
        column: { filterValue, setFilter, preFilteredRows, id },
        }) {
            // Calculate the options for filtering
            // using the preFilteredRows
            const options = React.useMemo(() => {
            const options = new Set()
            preFilteredRows.forEach(row => {
                options.add(row.values[id])
            })
            return [...options.values()]
            }, [id, preFilteredRows])
        
            // Render a multi-select box
            return (
            <select
                className="dropdown"
                value={filterValue}
                onChange={e => {
                setFilter(e.target.value || undefined)
                }}
            >
                <option value="">Filter By Year</option>
                {options.map((option, i) => (
                <option key={i} value={option}>
                    {format(new Date(option), 'yyyy')}
                </option>
                ))}
            </select>
            )
        }

    return (
        <>
            <div className="reload_container">
                <div className="launches_refresh" onClick={loadData}>
                    Reload Data 
                    <img className="refresh_image" src={refresh} alt={'refresh'}/>
                </div>
            </div>
            <div className="launches_container">
                <div className="launches_head" {...getTableProps()}>
                    {
                        headerGroups.map((headerGroup) => (
                            <div className="table_headers" {...headerGroup.getHeaderGroupProps()}>
                                { headerGroup.headers.map((column) => (
                                    <div className="launches_filter" 
                                        {...column.getHeaderProps()}>
                                        <span>{column.canFilter ? column.render('Filter') : null }</span>
                                    </div>
                                ))}
                                { headerGroup.headers.map((column) => (
                                    <div className="launches_sort" 
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps())}>
                                        <span>
                                            {column.render('Header')}
                                            {column.isSorted ? (column.isSortedDesc ? 'Ascending' : 'Descending') : 'Descending'}
                                            <img className="sort_image" src={sort} alt={'sort'}/>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))
                    }
                </div>
                <div className="launches_list">
                    <div {...getTableBodyProps()}>
                        {
                            rows.map(row => {
                                prepareRow(row)
                                return (
                                    <div className="card shadow-sm rounded" {...row.getRowProps()}>
                                        {
                                            row.cells.map(cell => {
                                                return <div className="card-body" 
                                                    {...cell.getCellProps([{
                                                        className: cell.column.className,
                                                    }])}>{cell.render('Cell')}</div>
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
