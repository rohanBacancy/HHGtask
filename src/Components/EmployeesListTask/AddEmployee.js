import axios from 'axios';
import React, { useState } from 'react'

const AddEmployee = ({setFlag}) => {

    const [employee, setEmployee] = useState(
        {
            name:'',
            email:'',
            position:'',
        }
    );

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        axios.post("https://6086b37fa3b9c200173b698f.mockapi.io/users",employee)
        .then(res => {
            console.log(res.data);
            setFlag(prevFlag => !prevFlag);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleChange = (e) =>
    {
        switch (e.target.name) {
            case 'name':
                setEmployee({...employee,name:e.target.value})
                break;
            case 'email':
                setEmployee({...employee,email:e.target.value})
                break;
            case 'position':
                setEmployee({...employee,position:e.target.value})
                break;
            default:
                throw new Error("Form Input Unhandled");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="name" type="text" value={employee.name} onChange={handleChange}/>
                <hr/>
                <input name="email" type="text" value={employee.email} onChange={handleChange}/>
                <hr/>
                <input name="position" type="text" value={employee.position} onChange={handleChange}/>
                <hr/>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    )
}

export default AddEmployee
