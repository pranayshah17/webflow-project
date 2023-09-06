import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { addSiteDetail } from './AddSiteSlice';
import { userDetail } from './UserDetailSlice';
// import { addSiteDetail } from './AddSiteSlice';

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  padding: 20px;
  background-color: #f5f5f5; /* Light gray background */
  border-radius: 12px;
  overflow: hidden;
  .content-wrapper {
    flex-grow: 1;
    overflow: auto; /* Content area expands to fill available space */
  }
`;

const Title = styled(Typography)`
  margin-bottom: 12px;
  font-weight: bold;
`;

const Content = styled(Typography)`
  margin-bottom: 12px;
  color: #666;
`;
const AddSiteButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
`;
const StyledButton = styled(Button)`
  margin-top: auto;
  background-color: #f44336; /* You can change this color */
  color: #fff; /* Text color for the button */
 padding: 8px 5px; /* Adjust padding to reduce button size */
  font-size: 14px; /* Adjust font size */
  &:hover {
    background-color: #d32f2f; /* Change color on hover */
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const ProfileIcon = styled(AccountCircleIcon)`
  margin-right: 10px;
`;

const ProfileText = styled(Typography)`
  font-size: 14px;
`;

// const CardComponent = ({ title, content, buttonText ,history}) => {
//   const selectResponseData = (state) => state.auth.responseData;

//   const token = useSelector((state) => state.auth.token);


//   const responseData = useSelector(selectResponseData);
 
 
//   return (
//     <StyledPaper elevation={3} sx={{ paddingTop: "20px" }}>
//       <Title variant="h6">{title}</Title>
//       <Content variant="body1">{content}</Content>
      
//       <div style={{display:"flex",justifyContent:"space-between"}}>
//       <StyledButton variant="contained" color="primary">
//         {buttonText}
//       </StyledButton>
//       <ProfileInfo>
//         <ProfileIcon />
//         <ProfileText>{userDetails.firstname}</ProfileText>
//       </ProfileInfo>
//       </div>
//     </StyledPaper>
//   );
// };

const CardContainer = () => {
  // const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  console.log(token, "this is the token");

  const[userData, setUserData]=useState([])
 
  const cardData = [
    {
      title: "Card 1",
      content: "Content for Card 1 ",
      buttonText: "View",
    },
    {
      title: "Card 2",
      content: "Content for Card 2",
      buttonText: "View",
    },
    {
      title: "Card 3",
      content: "Content for Card 3",
      buttonText: "View",
    },
    {
      title: "Card 4",
      content: "Content for Card 4",
      buttonText: "View",
    },
  ];
  const dispatch = useDispatch()

  // const userDetails = dispatch(userDetail(token))
  // console.log(userDetails, "userdetails......");

  useEffect(()=>{
    async function fetchData(){
      const userDetails =await dispatch(userDetail(token))
      setUserData(userDetails?.payload.data)
    }
    fetchData()
  },[dispatch])

  
  const handleAddSiteClick = async () => {
    // Dispatch the addSite action
   const gettingData =  await dispatch(addSiteDetail(token));
   console.log(gettingData , "====> Hello I Am, Getting The Data");
   console.log(process.env.CLIENT_ID, "client iddddddd");
   const authURL = `https://webflow.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}`;
   window.location.href = authURL;
  };

  const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");
  console.log(token, "sdkljfhnksdjfnksdjfnklsdjfnklsjdnkfj");
  
  useEffect(() => {
    console.log("Inside useEffect - Token:", token);
    if (authorizationCode) {
      console.log("Inside useEffect - Token2:", token);
      const headers = {
        Authorization: token,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
      };
      axios
        .get(`https://b4f5-122-179-159-67.ngrok-free.app/api/v1/wfUser/create`, {
          params: { code: authorizationCode },
          headers:headers,
        })
        .then((response) => {
          console.log("GET request response:", response.data);
        })
        .catch((error) => {
          console.error("GET request error:", error);
        });
    }
  }, [authorizationCode, token]);

  console.log(userData,"userData")
  const fetchdata = userData.map((user)=>{
    return user.userDetails.firstname
  })
console.log(fetchdata, "-----------");
  
const allUserSites = userData.reduce((sites, data) => {
  // Concatenate all userSites arrays
  return sites.concat(data.userDetails.userSites);
}, []);

 

const totalSites = allUserSites.length;
  return (
    <Container maxWidth="xl" sx={{ paddingTop: "50px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "50px" }}>
        <AddSiteButton variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddSiteClick}>
          Add Site
        </AddSiteButton>
      </div>
    
    {userData?.map((data, index) => (
  <Grid container spacing={2} key={index}>
    {data.userSites?.map((userSite, siteIndex) => (
      <Grid item xs={12} sm={6} md={4} key={siteIndex}>
        <StyledPaper elevation={3}>
          <Title variant="h6">{userSite.name}</Title>
          <Content variant="body1">{userSite.shortName}</Content>
          
          {/* Display other userSite details here */}
          
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <StyledButton variant="contained" color="primary">
              View
            </StyledButton>
            <ProfileInfo>
              <ProfileIcon />
              <ProfileText>{`${data.userDetails.firstname} ${data.userDetails.lastname}`}</ProfileText>
            </ProfileInfo>
          </div>
        </StyledPaper>
      </Grid>
    ))}
  </Grid>
))}

    </Container>
  );
};

export default CardContainer;
