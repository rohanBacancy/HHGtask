import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import axios from 'axios';
import React, { useState } from 'react'
import Spinner from '../Loading Spinner/Spinner';
const baseURL = process.env.REACT_APP_MOCKAPI_URI; //Getting BaseUrl Fron .env

const DialogueForm = ({openForm,handleClose,notify}) => {

    const [employee, setEmployee] = useState(
        {
            name:'',
            email:'',
            position:'',
        }
    );
    const [loading,setLoading]= useState(false);

    const cleanForm = () => setEmployee({name:'',email:'',position:'',}); //Clear Form states after submitting

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setLoading(true);
        axios.post(baseURL + "/users",employee)
        .then(res => {
            console.log(res.data);
            cleanForm(); //Clear form after successful submittion
            setLoading(false);
            handleClose(); //Close PopUp
            notify();
        })
        .catch(err => {
            alert(err);
            setLoading(false);
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
        <Dialog open={openForm} onClose={handleClose}>
            <DialogTitle>Add Employee</DialogTitle>
                {
                loading ? <Spinner/> : //If Loading is true then Show Spinner Else Form
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField //Name Input
                            autoFocus
                            name="name"
                            label="Enter Name"
                            type={"text"}
                            fullWidth
                            value={employee.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField //Email Input
                            margin="dense"
                            name="email"
                            label="Enter Email"
                            type="email"
                            fullWidth
                            value={employee.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField //Position Input
                            margin="dense"
                            name="position"
                            label="Enter Position"
                            type={"text"}
                            fullWidth
                            value={employee.position}
                            onChange={handleChange}
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant={"contained"} color="secondary">
                            Close
                        </Button>
                        <Button type={"submit"} variant={"contained"} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </form>}
      </Dialog>
    )
}

export default DialogueForm
