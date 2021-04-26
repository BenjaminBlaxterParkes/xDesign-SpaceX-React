import React, {useMemo} from 'react'
import {useTable} from 'react-table'
//import {getLaunchData} from './SpacexLaunchData'
import {COLUMNS} from './columns'
//import MOCK_DATA from './MOCK_DATA.json'
import './table.css'

export const SpacexTable = () => {

    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', "https://api.spacexdata.com/v4/launches", false)
    xmlHttp.send()
    const DATA = JSON.parse(xmlHttp.responseText)

    const columns = useMemo(() => COLUMNS, [])
    const launchData = useMemo(() => DATA, [])

    const tableInstance = useTable({
        columns: columns,
        data: launchData,
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                { headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
        </div>
    )
}