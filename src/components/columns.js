import {format} from 'date-fns'
import {ColumnFilter} from './ColumnFilter'

export const COLUMNS = [
    {
        Header: 'Flight Number',
        accessor: 'flight_number',
        disableFilters: true,
        className: 'flight_number'
    },
    {
        Header: 'Rocket Name',
        accessor: 'name',
        disableFilters: true,
        className: 'card-body rocket_name'
    },
    {
        Header: 'Sort ',
        accessor: 'date_utc',
        Cell: ({value}) => {return format(new Date(value), 'do LLL yyyy')},
        className:'card-body flight_date'
    }
]