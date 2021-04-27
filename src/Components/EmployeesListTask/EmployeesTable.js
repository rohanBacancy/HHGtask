import { Table, TableContainer, TableHead, TableCell,TableBody,TableRow,Paper, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useTable,usePagination } from 'react-table';
import Spinner from '../Loading Spinner/Spinner';
const baseURL = process.env.REACT_APP_MOCKAPI_URI; //Getting BaseUrl Fron .env

const COLUMNS = [ //React table headers 
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

const EmployeesTable = ({ openForm,setOpenForm }) => { //Used React Table liberary

    const [employees, setEmployees] = useState([]); //API fetched data storage state
    const [loading,setLoading] = useState(false); //Form Submit Loading State

    useEffect(() => {
        if(!openForm){ //When form is submitted Employees should be reFetched via API
        setLoading(true); //Start Loading Spinner
        axios.get(baseURL + "/users")
        .then(res => {
            setEmployees(res.data);
            setLoading(false); //Stop Loading Spinner
            setPageSize(5) //Initial Page size 5
        })
        .catch(err => {
            alert(err);
            setLoading(false);
        })
    }}, [openForm])
    
    const columns = useMemo(() => COLUMNS,[]); //Static columns does't need to declared again on each render
    
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
        setPageSize,
        state,
        previousPage,
        canNextPage,
        canPreviousPage,
    } = tableInstace;
    
    const { pageIndex } = state;

    return (
        <div>
            <div className={"empListTitle"}><Typography variant={"h4"}>Employees List</Typography></div>

            { loading ? <Spinner/> : 
            <TableContainer variant={"outlined"} component={Paper} style={{maxWidth:'60vw'}}>
            <Table {...getTableProps()}>
                <TableHead>
                    { headerGroups.map((headerGroup) => 
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => 
                        <TableCell {...column.getHeaderProps()}>
                            <Typography color="primary" variant={"h6"}>{column.render('Header')}</Typography>
                        </TableCell>
                        )}
                    </TableRow>
                    )}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    
                        {page.map((row) => 
                            {prepareRow(row)
                            return(
                                <TableRow {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell) => 
                                        {
                                            return <TableCell {...cell.getCellProps()}><Typography variant={"subtitle1"}>{cell.render('Cell')}</Typography></TableCell>
                                        })
                                    }
                                </TableRow>
                            )}
                        )}                   
                </TableBody>
            </Table>
            </TableContainer>}

                <div className="contentBelowTable">
                    <span>
                        <Button variant={"contained"} color={"primary"} onClick={() => setOpenForm(true)}>+ New</Button> {/* Open Popup Form Toggle */}
                        &nbsp;&nbsp;Results Per Page 
                        <Button onClick={() => setPageSize(5)} color={"secondary"}>5</Button> |  {/* To set size of employee data per page */}
                        <Button onClick={() => setPageSize(15)} color={"secondary"}>15</Button> | 
                        <Button onClick={() => setPageSize(20)} color={'secondary'}>20</Button> 
                    </span>
                    <Button disabled={!canPreviousPage} onClick={() => previousPage()} variant={"outlined"} color={"primary"}>Prev</Button> &nbsp; {pageIndex+1} &nbsp; <Button disabled={!canNextPage} onClick={() => nextPage()} variant={"outlined"} color={"primary"}>Next</Button>
                </div>
        </div>
    )
}

export default EmployeesTable
