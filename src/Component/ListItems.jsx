import { Button, Card, CardContent, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react';

const ListItems = () => {
  // Define state to track the index of the hovered item and the selected collection
  const [hoveredItem, setHoveredItem] = useState(-1);
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Function to handle collection item click
  const handleCollectionClick = (index) => {
    setSelectedCollection(index);
  };

  // Generate dummy text for the selected collection
  const generateDummyText = () => {
    if (selectedCollection !== null) {
      // Replace this with your actual text generation logic
      return `Dummy text for Collection ${selectedCollection + 1}`;
    }
    const centeredTextStyles = {
        textAlign: 'center',
        color: '#ccc',
        marginTop:"250px" // Light gray color
      };
  
      return (
        <div style={centeredTextStyles}>
          Please select collection to view items
        </div>
      );
  };

  return (
    <Container maxWidth="xl">
        <div style={{display:"flex", justifyContent:"flex-end", paddingTop:"30px"}}>
        <Button
            variant="contained"
            color="primary"
          >
            Generate Site Map
          </Button>
          </div>
      <div style={{ display: 'flex', gap: '50px' }}>
        <div style={{ paddingTop: '50px' }}>
          <Card elevation="3" variant="outlined" style={{ height: '700px', overflowY: 'auto', width: '320px' }}>
            <CardContent style={{ position: 'relative' }}>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1, paddingLeft: "10px" }}
              >
                Collection List
              </Typography>
              <div style={{ marginTop: '40px' }}>
                <List>
                  {/* Example list items, you can replace these with your data */}
                  {Array.from({ length: 20 }).map((_, index) => (
                    <ListItem
                      key={index}
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(-1)}
                      onClick={() => handleCollectionClick(index)} // Handle collection item click
                      style={{
                        backgroundColor: hoveredItem === index ? '#f5f5f5' : '',
                        color: hoveredItem === index ? 'red' : '',
                        cursor: 'pointer',
                      }}
                    >
                      <ListItemText primary={`Collection ${index + 1}`} />
                    </ListItem>
                  ))}
                </List>
              </div>
            </CardContent>
          </Card>
        </div>
        <div style={{ paddingTop: '50px' }}>
          <Card elevation="3" variant="outlined" style={{ height: '700px', overflowY: 'auto', width: '320px' }}>
            <CardContent style={{ position: 'relative' }}>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1, paddingLeft:"80px" }}
              >
                Items List
              </Typography>
              <div style={{ marginTop: '40px' }}>
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
        <div style={{ paddingTop: '50px' }}>
          <Card elevation="3" variant="outlined" style={{ height: '700px', overflowY: 'auto', width: '750px' }}>
            <CardContent style={{ position: 'relative' }}>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1, paddingLeft:"80px" }}
              >
        
              </Typography>
              <div style={{ marginTop: '40px' }}>
               
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default ListItems;
