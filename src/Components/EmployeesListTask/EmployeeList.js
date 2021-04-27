import React, { useState } from 'react'
import EmployeesTable from './EmployeesTable'
import './EmployeeList.css'
import DialogueForm from './DialogueForm'

const EmployeeList = () => {

    const [openForm,setOpenForm] = useState(false); //Form Popup open/close and API reCall Flag
    const handleClose = () => setOpenForm(false); //Close PopUP Function

    return (
        <div className="empListDiv">
                <EmployeesTable openForm={openForm} setOpenForm={setOpenForm}/>
                <DialogueForm openForm={openForm} handleClose={handleClose}/>
        </div>
    )
}

export default EmployeeList
