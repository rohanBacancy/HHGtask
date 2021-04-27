import React, { useState } from 'react'
import EmployeesTable from './EmployeesTable'
import './EmployeeList.css'
import DialogueForm from './DialogueForm'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeList = () => {

    const [openForm,setOpenForm] = useState(false); //Form Popup open/close and API reCall Flag
    const notify = () => toast.success("Employee Added Successfully");
    const handleClose = () => setOpenForm(false); //Close PopUP Function

    return (
        <div className="empListDiv">
                <EmployeesTable openForm={openForm} setOpenForm={setOpenForm}/>
                <DialogueForm openForm={openForm} handleClose={handleClose} notify={notify}/>
                <ToastContainer />
        </div>
    )
}

export default EmployeeList
