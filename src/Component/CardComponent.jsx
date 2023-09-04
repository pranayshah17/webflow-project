import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

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

const CardComponent = ({ title, content, buttonText }) => {
  return (
    <StyledPaper elevation={3} sx={{ paddingTop: "20px" }}>
      <Title variant="h6">{title}</Title>
      <Content variant="body1">{content}</Content>
      
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <StyledButton variant="contained" color="primary">
        {buttonText}
      </StyledButton>
      <ProfileInfo>
        <ProfileIcon />
        <ProfileText>John Doe</ProfileText>
      </ProfileInfo>
      </div>
    </StyledPaper>
  );
};

const CardContainer = () => {
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

  return (
    <Container maxWidth="xl" sx={{ paddingTop: "50px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "50px" }}>
        <AddSiteButton variant="contained" color="primary" startIcon={<AddIcon />}>
          Add Site
        </AddSiteButton>
      </div>
      <Grid container spacing={2}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <CardComponent
              title={card.title}
              content={card.content}
              buttonText={card.buttonText}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CardContainer;
