import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function Student() {

    const paperStyle={padding:'50px 20px', width:600, margin:"20px auto"}
    const[name, setName]=useState('')
    const[address, setAddress]=useState('')
    const[student, setStudents]=useState([])

    const handleClick=(e)=>{
      e.preventDefault()
      const student={name, address}
      console.log(student)
      fetch("http://localhost:8080/student/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(student)}
      ).then(()=>{console.log("New student added")}) 
    }

    useEffect(()=>{
      fetch("http://localhost:8080/student/getAll")
      .then(res=>res.json())
      .then((result)=>{
          setStudents(result);
        }
      )
    },[])

  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"black"}}>To add the student, fill in the form below and click "submit" button</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
      value={name} onChange={(e)=>setName(e.target.value)}/>
      <TextField id="outlined-basic" label="Address" variant="outlined" fullWidth
      value={address} onChange={(e)=>setAddress(e.target.value)}/>
      <Button
        color="primary"
        disabled={false}
        size="large"
        variant="contained"
        onClick={handleClick}>
      Submit</Button>
      <Button
        color="error"
        disabled={false}
        size="large"
        variant="contained">
      Delete</Button>
    </Box>
    </Paper>

    <h1>STUDENTS</h1>
    <Paper elevation={3} style={paperStyle}>

      {student.map(student=>(
        <Paper elevation={6} style={{margin:"10px", padding:"15px",textAlign:"left"}} key={student.id}>
          Id: {student.id}<br/>
          Name: {student.name}<br/>
          Address: {student.address}
        </Paper>
          ))
      }

    </Paper>
    </Container>
  );
}
