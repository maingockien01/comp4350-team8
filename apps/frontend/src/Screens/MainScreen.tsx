import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import {BarChart} from '@mui/x-charts/BarChart';
import ScrollMenu from 'react-horizontal-scroll-menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {getTokenFromCookie} from '../Utils/CookieFunctions';

// Assuming these values are placeholders and will be replaced with actual data
const uData = [4];
const xLabels = ['Overall GPA'];

// MenuItem component representing each item in the ScrollMenu
const MenuItem = ({text, selected}: {text: any; selected: any}) => {
  return (
    <Stack
      sx={{
        backgroundColor: 'green',
        borderRadius: 2,
        width: 250,
        height: 100,
        justifyContent: 'center',
      }}
      className={`menu-item ${selected ? 'active' : ''}`}
    >
      <Typography sx={{color: 'white'}} variant="h5">
        {text.courseName}
      </Typography>
      <Typography sx={{color: 'white', fontSize: 10}}>{text.time}</Typography>
      <Typography sx={{color: 'white'}} variant="h6">
        {text.location}
      </Typography>
    </Stack>
  );
};

// Function to render all items in the ScrollMenu
const Menu = (list: any[], selected: any) =>
  list.map((el) => {
    const {name} = el;
    return <MenuItem text={el} key={name} selected={selected} />;
  });

const MainScreen = () => {
  const [progress, setProgress] = React.useState(0);
  const [elective, setElective] = React.useState(0);
  // State to keep track of selected item in ScrollMenu
  const [selected, setSelected] = useState<any>();
  // State to hold items for ScrollMenu
  const [menuItems, setMenuItems] = useState<any[]>([]);
  // State to hold active courses list
  const [activeList, setActiveList] = useState<any[]>([]);
  // State to hold user information
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    // Generate items for the ScrollMenu
    const items = Menu(activeList, selected);
    setMenuItems(items);
  }, [activeList]); // Run effect when activeList changes

  const onSelect = (item: any) => {
    setSelected(item);
  };

  useEffect(() => {
    // Fetch user data
    const fetchData = async () => {
      const token = getTokenFromCookie();

      try {
        // Fetch current term
        const res1 = await fetch('/rest-api/term/searchCurrent');
        const res1Json = await res1.json();

        const res2 = await fetch(
            `/rest-api/user/searchActive?tid=${res1Json}`,
            {
              headers: {Authorization: `Bearer ${token}`},
            },
        );
        const res2Json = await res2.json();
        setActiveList(res2Json);

        const res3 = await fetch(`/rest-api/user/search`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        const res3Json = await res3.json();
        setUserInfo(res3Json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Simulate progress update for degree core
    const timer = setInterval(() => {
      setProgress(70);
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    // Simulate progress update for elective
    const timer = setInterval(() => {
      setElective(30);
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{mt: 2}}>
        <Grid container>
          {/* Left side with user information */}
          <Grid
            item
            xs={8}
            sx={{
              boxShadow: 'none',
              backgroundColor: '#FAD37D',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <Container maxWidth="xl" sx={{mt: 1, mb: 1}}>
              <Stack spacing={-0.5} sx={{mb: 2}}>
                <Typography
                  color="#502C1E"
                  fontSize={20}
                  fontWeight={'bold'}
                  className="userName"
                >
                  {userInfo ? userInfo.fullName : ''}
                </Typography>
                <Typography color="#502C1E" fontSize={18} className="Major">
                  B.Sc. Computer Science
                </Typography>
              </Stack>
              {/* Degree core and elective progress */}
              <Stack>
                <Typography color="#502C1E" fontSize={20} fontWeight={'bold'}>
                  Process
                </Typography>
                <Divider sx={{bgcolor: 'black', marginBottom: 2}} />
                <Grid container>
                  <Grid item xs={1.6}>
                    <Stack
                      sx={{
                        alignItems: 'flex-end',
                        mt: 1,
                        mb: 1,
                      }}
                      spacing={1}
                    >
                      <Typography color="#502C1E">Degree Core</Typography>
                      <Typography color="#502C1E">Elective</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={0.2} />
                  <Grid item xs={8} sx={{border: '2px solid #000'}}>
                    <Stack spacing={1.5} sx={{mt: 1, mb: 1}}>
                      {/* Progress bars for degree core and elective */}
                      <LinearProgress
                        color="secondary"
                        sx={{height: '20px'}}
                        variant="determinate"
                        value={progress}
                      />
                      <LinearProgress
                        color="secondary"
                        sx={{height: '20px'}}
                        variant="determinate"
                        value={elective}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Container>
          </Grid>
          {/* Right side with GPA chart */}
          <Grid
            item
            xs={1}
            sx={{boxShadow: 'none', backgroundColor: '#FAD37D'}}
          />
          <Grid
            item
            xs={3}
            sx={{
              boxShadow: 'none',
              backgroundColor: '#FAD37D',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <Container maxWidth="xl" sx={{mt: 1, mb: 1}}>
              <Stack>
                <Typography color="#502C1E" fontSize={20} fontWeight={'bold'}>
                  GPA
                </Typography>
                {/* GPA bar chart */}
                <BarChart
                  sx={{mt: -5}}
                  width={150}
                  height={250}
                  series={[{data: uData, id: 'GPA'}]}
                  xAxis={[{data: xLabels, scaleType: 'band'}]}
                  yAxis={[
                    {
                      data: [0, 1, 2, 2.5, 3, 3.5, 4, 4.5],
                      scaleType: 'linear',
                      min: 0,
                      max: 5,
                    },
                  ]}
                />
              </Stack>
            </Container>
          </Grid>
        </Grid>

        {/* Active courses section */}
        <Stack>
          <Typography sx={{mt: 6}} color="#502C1E" fontSize={25}>
            Active Courses
          </Typography>
          <Divider sx={{bgcolor: 'brown', marginBottom: 2}} />
        </Stack>
        <Box>
          {activeList.length === 0 ? (
            'You have not registered for the current Term'
          ) : (
            // ScrollMenu to display active courses
            <ScrollMenu
              data={menuItems}
              arrowLeft={<ChevronLeftIcon />}
              arrowRight={<ChevronRightIcon />}
              selected={selected}
              onSelect={onSelect}
            />
          )}
        </Box>
      </Container>
    </>
  );
};

export default MainScreen;
