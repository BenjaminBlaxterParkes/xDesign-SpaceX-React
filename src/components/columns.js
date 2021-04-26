import {format} from 'date-fns'

export const COLUMNS = [
    {
        Header: 'Flight Number',
        accessor: 'flight_number'
    },
    {
        Header: 'Rocket Name',
        accessor: 'name'
    },
    {
        Header: 'Flight Date',
        accessor: 'date_utc',
        Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyyy')}
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