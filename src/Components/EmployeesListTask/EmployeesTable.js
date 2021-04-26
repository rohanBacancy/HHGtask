import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useTable,usePagination } from 'react-table';

const COLUMNS = [
        {
            Header:'Name',
            accessor:'name'
        },
        {
            Header:'Email',
            accessor:'email'
        },
        {
            Header:'Position',
            accessor:'position',
        },
    ]

const EmployeesTable = ({flag}) => {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get("https://6086b37fa3b9c200173b698f.mockapi.io/users")
        .then(res => {
            setEmployees(res.data);
        })
        .catch(err => {
            alert(err);
        })
    }, [flag])

    const columns = useMemo(() => COLUMNS,[]);
    const tableInstace = useTable({
        columns:columns,
        data:employees,
    }, usePagination)
    const {
        getTableProps , 
        getTableBodyProps , 
        headerGroups , 
        page , 
        prepareRow,
        nextPage,
        pageOptions,
        setPageSize,
        state,
        previousPage,
        canNextPage,
        canPreviousPage,} = tableInstace;
    const { pageIndex,pageSize } = state;

    return (
        <div>
            <h1>Employees</h1>

            { employees && <table {...getTableProps()}>
                <thead>
                    { headerGroups.map((headerGroup) => 
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => 
                        <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                        </th>
                        )}
                    </tr>
                    )}
                </thead>
                <tbody {...getTableBodyProps()}>
                    
                        {page.map((row) => 
                            {prepareRow(row)
                            return(
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell) => 
                                        {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )}
                        )}
                        
                    
                </tbody>
            </table>}

                <span>Results Per Page <button onClick={() => setPageSize(5)}>5</button> | <button onClick={() => setPageSize(15)}>15</button> | <button onClick={() => setPageSize(20)} color={'link'}>20</button> </span>
                <button disabled={!canPreviousPage} onClick={() => previousPage()}>Prev</button>{pageIndex+1}<button disabled={!canNextPage} onClick={() => nextPage()}>Next</button>
        </div>
    )
}

export default EmployeesTable
