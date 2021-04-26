import React, { useState } from 'react'
import AddEmployee from './AddEmployee'
import EmployeesTable from './EmployeesTable'

const EmployeeList = () => {

    const [flag, setFlag] = useState(false);

    return (
        <>
            <div>
                <EmployeesTable flag={flag}/>
            </div>
            <hr/>
            <div>
                <AddEmployee setFlag={setFlag}/>
            </div>
            <button>+ New</button>
        </>
    )
}

export default EmployeeList
