import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addSiteDetail } from "./AddSiteSlice";
import { setCollections, setDefaultCollections } from "./GetCollectionSlice";
import { userDetail } from "./UserDetailSlice";
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

const CardContainer = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const responseDatas = useSelector((state) => state.responseData);
  console.log(responseDatas, "available data");
  const [userData, setUserData] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const userDetails = await dispatch(userDetail(token));
      const userSites = userDetails?.payload.data.userSites;
      console.log(userDetails?.payload.data, "userDetails?.payload.data");
      setUserData(userDetails?.payload.data);
    }
    fetchData();
  }, [dispatch]);

  const handleAddSiteClick = async () => {
    const gettingData = await dispatch(addSiteDetail(token));
    const authURL = `https://webflow.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}`;
    window.location.href = authURL;
  };

  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");
  console.log(token, "sdkljfhnksdjfnksdjfnklsdjfnklsjdnkfj");

  useEffect(() => {
    if (authorizationCode) {
      const headers = {
        Authorization: token,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
      };
      axios
        .get(
          `https://b4f5-122-179-159-67.ngrok-free.app/api/v1/wfUser/create`,
          {
            params: { code: authorizationCode },
            headers: headers,
          }
        )
        .then((response) => {
          console.log("GET request response:", response.data);
        })
        .catch((error) => {
          console.error("GET request error:", error);
        });
    }
  }, [authorizationCode, token]);

  console.log(userData, "userData");

  const handleClick = async (userDetails, siteData) => {
    console.log({ userDetails, siteData },"+++++++");
    try {
      console.log(userDetails?.wf_access_token, "old token");
      const headers = {
        Authorization: token,
        wfauthorization: userDetails?.wf_access_token,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
      };
      const response = await axios.get(
        `https://b4f5-122-179-159-67.ngrok-free.app/api/v1/collection/getCollections?siteId=${siteData?.wf_id}`,
        {
          headers: headers,
        }
      );
      console.log(response.data.data.collections, "name");
      const collectionData = response.data.data.collections;
      const defaultCollections = response.data.data.defaultCollections;

      dispatch(setCollections(collectionData));
      dispatch(setDefaultCollections(defaultCollections));
      navigate("/listitems");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: "50px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "50px",
        }}
      >
        <AddSiteButton
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddSiteClick}
        >
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

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={() => handleClick(data?.userDetails, userSite)}
                  >
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
