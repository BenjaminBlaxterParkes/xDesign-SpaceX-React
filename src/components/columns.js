import {format} from 'date-fns'
import {ColumnFilter} from './ColumnFilter'

export const COLUMNS = [
    {
        Header: 'Flight Number',
        accessor: 'flight_number',
        disableFilters: true
    },
    {
        Header: 'Rocket Name',
        accessor: 'name',
        disableFilters: true
    },
    {
        Header: 'Flight Date',
        accessor: 'date_utc',
        Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyyy')},
    }
]