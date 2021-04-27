import {format} from 'date-fns'
import {ColumnFilter} from './ColumnFilter'

export const COLUMNS = [
    {
        Header: 'Flight Number',
        accessor: 'flight_number',
        Filter: ColumnFilter,
        disableFilters: true
    },
    {
        Header: 'Rocket Name',
        accessor: 'name',
        Filter: ColumnFilter,
        disableFilters: true
    },
    {
        Header: 'Flight Date',
        accessor: 'date_utc',
        Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyyy')},
        Filter: ColumnFilter
    }
    /*{
        Header: 'First Name',
        accessor: 'first_name'
    },
    {
        Header: 'Last Name',
        accessor: 'last_name'
    }*/
]