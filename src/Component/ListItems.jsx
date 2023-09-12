import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDetail } from "./UserDetailSlice";

const ListItems = () => {
  // Define state to track the index of the hovered item and the selected collection
  const [hoveredItem, setHoveredItem] = useState(-1);
  const [selectedCollection, setSelectedCollection] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);

  const [listItems, setListItems] = useState([]);
  const [userData, setUserData] = useState([]);
  const responseDatas = useSelector((state) => state.responseData);
  const collections = useSelector((state) => state.collection.collections);
  
  const token = useSelector((state) => state.auth.token);
  const userDetails = useSelector((state) => state.userDetail.userDetails); 
  // const defaultCollections = useSelector((state)=>state.defaultCollections)

  // console.log(defaultCollections, "defaultcollectiondata");

  const names = collections.map((data) => data.name);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const userDetails = await dispatch(userDetail(token));
      const userSites = userDetails?.payload.data.userSites;
      console.log(userDetails?.payload.data, "new data");
      setUserData(userDetails?.payload.data);
       handleData(userDetails?.payload.data)
    }
    fetchData();
  }, [dispatch]);


  const handleData = async (userDetails, siteData, collectionId) => {
    console.log({ userDetails, siteData,collectionId },"%%%%%%%%");
    try {
      console.log(userDetails?.wf_access_token, "new token");
      const headers = {
        Authorization: token,
         wfauthorization: userDetails?.wf_access_token,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true, 
      };
       const requestBody = {
      collectionName: collectionId,
    };
    
      const response = await axios.get(
        `https://b4f5-122-179-159-67.ngrok-free.app/api/v1/item/getItems`,
        {
          headers: headers,
          params:requestBody
        }
      );
      console.log(response.data, "hellooooooo");
      
     
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleCollectionClick = async (index) => {
  try {
    const collectionName = names[index]; // Get the collection name
    const collection = collections.find((c) => c.name === collectionName); // Find the collection object with the same name
    const collectionId = collection ? collection._id : null; // Get the ID from the collection object, if found

    if (collectionId) {
      const userDetails = userData;
      const siteData = collections[index];

      await handleData(userDetails, siteData, collectionId); // Pass collectionId as a parameter
    } else {
      console.error(`Collection ID not found for name: ${collectionName}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};


  
  const handleCheckboxToggle = (index) => {
    if (selectedCollections.includes(index)) {
      // Collection is already selected, remove it
      setSelectedCollections(
        selectedCollections.filter((item) => item !== index)
      );
    } else {
      // Collection is not selected, add it
      setSelectedCollections([...selectedCollections, index]);
    }
  };
  const generateDummyText = () => {
    if (selectedCollection !== null) {
      return `Dummy text for Collection ${selectedCollection + 1}`;
    }
    const centeredTextStyles = {
      textAlign: "center",
      color: "#ccc",
      marginTop: "250px", // Light gray color
    };

    return (
      <div style={centeredTextStyles}>
        Please select collection to view items
      </div>
    );
  };

  return (
    <Container maxWidth="xl">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "30px",
        }}
      >
        <Button variant="contained" color="primary">
          Generate Site Map
        </Button>
      </div>
      <div style={{ display: "flex", gap: "50px" }}>
        <div style={{ paddingTop: "50px" }}>
          <Card
            elevation="3"
            variant="outlined"
            style={{ height: "700px", overflowY: "auto", width: "320px" }}
          >
            <CardContent style={{ position: "relative" }}>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "white",
                  zIndex: 1,
                  paddingLeft: "10px",
                }}
              >
                Collection List
              </Typography>
              <div style={{ marginTop: "40px" }}>
                <List>
                  {names.map((collectionName, index) => (
                    <ListItem
                      key={index}
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(-1)}
                      onClick={() => handleCollectionClick(index)} // Handle collection item click
                      style={{
                        backgroundColor: hoveredItem === index ? "#f5f5f5" : "",
                        color: hoveredItem === index ? "red" : "",
                        cursor: "pointer",
                      }}
                    >
                     {selectedCollections.includes(index) ? (
                      <CheckBox
                          onClick={() => handleCheckboxToggle(index)}
                           style={{ marginRight: "8px" }}
                      />
                    ) : (
                      <CheckBoxOutlineBlank
                            onClick={() => handleCheckboxToggle(index)}
                             style={{ marginRight: "8px" }}
                      />
                    )}
                      <ListItemText primary={collectionName} />
                    </ListItem>
                  ))}
                </List>
              </div>
            </CardContent>
          </Card>
        </div>
        <div style={{ paddingTop: "50px" }}>
          <Card
            elevation="3"
            variant="outlined"
            style={{ height: "700px", overflowY: "auto", width: "320px" }}
          >
            <CardContent style={{ position: "relative" }}>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "white",
                  zIndex: 1,
                  paddingLeft: "80px",
                }}
              >
                Items List
              </Typography>
              <div style={{ marginTop: "40px" }}>
                <List>
                  {/* Display the generated dummy text */}
                  <ListItem>
                    <ListItemText primary={generateDummyText()} />
                  </ListItem>
                </List>
              </div>
            </CardContent>
          </Card>
        </div>
        <div style={{ paddingTop: "50px" }}>
          <Card
            elevation="3"
            variant="outlined"
            style={{ height: "700px", overflowY: "auto", width: "750px" }}
          >
            <CardContent style={{ position: "relative" }}>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "white",
                  zIndex: 1,
                  paddingLeft: "80px",
                }}
              ></Typography>
              <div style={{ marginTop: "40px" }}></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default ListItems;
