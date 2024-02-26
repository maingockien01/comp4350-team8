import React from "react";
import Navbar from '../Components/Navbar'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button, { ButtonProps } from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import { BarChart } from '@mui/x-charts/BarChart';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '../Components/Cards'

const uData = [4];
const xLabels = [
  'Overall GPA',
];

const MainScreen = () => {
  const [progress, setProgress] = React.useState(0);
  const [elective, setElective] = React.useState(0);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(70);
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setElective(30);
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return(
  <>
  <Container maxWidth="lg" sx={{mt: 2}}>
    <Grid container>
      <Grid item xs={8} sx={{boxShadow:"none", backgroundColor:"#FAD37D", borderTopLeftRadius:10, borderBottomLeftRadius:10}}>
        <Container maxWidth="xl" sx={{mt:1, mb:1}}>
          <Stack spacing={-0.5} sx={{mb:2}}>
            <Typography color="#502C1E" fontSize={20} fontWeight={"bold"} className="userName">Jack, Nguyen</Typography>
            <Typography color="#502C1E" fontSize={18} className="Major">B.Sc. Computer Science</Typography>
          </Stack>
          <Stack>
            <Typography color="#502C1E" fontSize={20} fontWeight={"bold"}>Process</Typography>
            <Divider sx={{bgcolor:"black", marginBottom:2}}></Divider>
            <Grid container>
              <Grid item xs={1.6}>
                <Stack sx={{alignItems:"flex-end", mt:1,mb:1}} spacing={1}>
                  <Typography color="#502C1E">Degree Core</Typography>
                  <Typography color="#502C1E">Elective</Typography>
                </Stack>
              </Grid>
              <Grid item xs={0.2}/>
              <Grid item xs={8} sx={{ border: '2px solid #000'}}>
                <Stack spacing={1.5} sx={{mt:1,mb:1}}> 
                  <LinearProgress color="secondary" sx={{ height: '20px' }} variant="determinate" value={progress} />
                  <LinearProgress color="secondary" sx={{ height: '20px' }} variant="determinate" value={elective} />
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Grid>
      <Grid item xs={1} sx={{boxShadow:"none", backgroundColor:"#FAD37D"}}/>
      <Grid item xs={3} sx={{boxShadow:"none", backgroundColor:"#FAD37D", borderTopRightRadius:10, borderBottomRightRadius:10}}>
        <Container maxWidth="xl" sx={{mt:1, mb:1}}>
          <Stack>
          <Typography color="#502C1E" fontSize={20} fontWeight={"bold"}>GPA</Typography>
          <BarChart
            sx={{mt:-5}}
            width={150}
            height={250}
            series={[
              { data: uData, id: 'GPA' },
            ]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
            yAxis={[{ data:[0, 1, 2, 2.5, 3, 3.5, 4, 4.5], scaleType:'linear',  min: 0, max: 5}]}
          />
          </Stack>
        </Container>
      </Grid>
    </Grid>  
    
    <Stack>
      <Typography sx={{mt:6}} color="#502C1E" fontSize={25}>
        Active Courses
      </Typography>
      <Divider sx={{bgcolor:"brown", marginBottom:2}}></Divider>
    </Stack>
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'red',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{height: '100px',
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}
      >
        <Tab/>
      </Tabs>
    </Box>
  </Container>
  </>
  );
};

export default MainScreen;
