import React, { useEffect, useState } from "react";
import { Button, Container, Grid, List, ListItem, Typography, Box, Stack, ListItemText, ListItemButton } from "@mui/material";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import {TermDTO} from '@team8/types/dtos/term/term.dto'
import {DegreeDTO} from '@team8/types/dtos/degree/degree.dto'

const LookUpScreen = () => {
  const [degree, setDegree] = useState<DegreeDTO[]>([]);
  const [term, setTerm] = useState<TermDTO[]>([]);
  const [selectDegree, setSelectDegree] = useState<DegreeDTO>();
  const [selectTerm, setSelectTerm] = useState<TermDTO>();
  const navigate = useNavigate();

  const handleSubmit = () =>{
    if(selectDegree !== undefined && selectTerm !== undefined){
      fetch(`/rest-api/term/search?tid=${selectTerm.tid}&department=${selectDegree.name}`)
            .then((res) => res.json())
            .then(res => {
              navigate('/courses', {state: {res}});
            })
    }
    else{
      console.log("Please select something");
    }
  }
  const handleSeclectDegree = (value: DegreeDTO) =>{
    setSelectDegree(value);
  }

  const handleSeclectTerm = (value: TermDTO) =>{
    setSelectTerm(value);
  } 

  useEffect(() => {
    fetch('/rest-api/term')
    .then((res) => res.json())
    .then((res) => {setTerm(res)})

    fetch('/rest-api/degree')
    .then((res) => res.json())
    .then(res => {setDegree(res)})
  }, [])

  return (
    <>
    <Navbar/>
    <Container maxWidth="lg" sx={{mt: 2}}>
      <Grid container sx={{border: '1px solid black'}}>
        <Grid item xs={6}>
        <Container maxWidth="xl" sx={{mt:1, mb:1}}>
          <Stack>
            <Typography variant="h4">Degree: </Typography>
            <List sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}>
              {degree.map((degrees) => (
                <ListItem
                key={degrees.did}>
                  <ListItemButton onClick={() => handleSeclectDegree(degrees)} sx={{background: selectDegree === degrees ? 'red' : 'inherit', '&:hover': {backgroundColor: "red",},}}>
                    <ListItemText primary={`${degrees.name}`}/>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>
          </Container>
        </Grid>
        <Grid item xs={6}>
        <Container maxWidth="xl" sx={{mt:1, mb:1}}>
          <Stack>
            <Typography variant="h4">Term: </Typography>
            <List sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}>
              {term.map((terms) => (
                <ListItem
                key={terms.tid}>
                  <ListItemButton onClick={()=> handleSeclectTerm(terms)} sx={{background: selectTerm === terms ? 'red' : 'inherit', '&:hover': {backgroundColor: "red",},}}>
                    <ListItemText primary={`${terms.season} ${terms.year}`}/>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>
          </Container>
        </Grid>
      </Grid>
      <Container maxWidth="xl" sx={{mt:4, mb:1}}>
        <Box sx={{display:'flex', justifyContent:"center"}}>
          <Button onClick={() => handleSubmit()} sx={{background:"grey"}}>Submit</Button>
        </Box>
      </Container>
    </Container>
    </>
  );
};

export default LookUpScreen;
