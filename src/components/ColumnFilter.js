import React from 'react'

export const ColumnFilter = ({column, data}) => {

    const {filterValue, setFilter} = column
    console.log(data[0].date_utc)

    return (
        
        <select>
            <option value={data[0].date_utc}></option>
        </select>
        
    )
}

/*<span>
    Filter: {' '}
    <input value={filterValue || ''} 
    onChange={(e) => setFilter(e.target.value)} />
</span>*/