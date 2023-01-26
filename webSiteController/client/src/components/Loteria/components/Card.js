import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  Button,
  Table,
  Box,
  Stack,
} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import start from "../_images/start.png";
import marked from "../_images/marked2.png";

import img1 from "../_images/1.jpg";  
import img2 from "../_images/2.jpg";
import img3 from "../_images/3.jpg";
import img4 from "../_images/4.jpg";
import img5 from "../_images/5.jpg";
import img6 from "../_images/6.jpg";
import img7 from "../_images/7.jpg";
import img8 from "../_images/8.jpg";
import img9 from "../_images/9.jpg";
import img10 from "../_images/10.jpg";
import img11 from "../_images/11.jpg";
import img12 from "../_images/12.jpg";
import img13 from "../_images/13.jpg";
import img14 from "../_images/14.jpg";
import img15 from "../_images/15.jpg";
import img16 from "../_images/16.jpg";
import img17 from "../_images/17.jpg";  
import img18 from "../_images/18.jpg";
import img19 from "../_images/19.jpg";
import img20 from "../_images/20.jpg";
import img21 from "../_images/21.jpg";  
import img22 from "../_images/22.jpg";
import img23 from "../_images/23.jpg";
import img24 from "../_images/24.jpg";
import img25 from "../_images/25.jpg";
import img26 from "../_images/26.jpg";
import img27 from "../_images/27.jpg";
import img28 from "../_images/28.jpg";
import img29 from "../_images/29.jpg";
import img30 from "../_images/30.jpg";
import img31 from "../_images/31.jpg";
import img32 from "../_images/32.jpg";
import img33 from "../_images/33.jpg";
import img34 from "../_images/34.jpg";
import img35 from "../_images/35.jpg";
import img36 from "../_images/36.jpg";
import img37 from "../_images/37.jpg";  
import img38 from "../_images/38.jpg";
import img39 from "../_images/39.jpg";
import img40 from "../_images/40.jpg";
import img41 from "../_images/41.jpg";  
import img42 from "../_images/42.jpg";
import img43 from "../_images/43.jpg";
import img44 from "../_images/44.jpg";
import img45 from "../_images/45.jpg";
import img46 from "../_images/46.jpg";
import img47 from "../_images/47.jpg";
import img48 from "../_images/48.jpg";
import img49 from "../_images/49.jpg";
import img50 from "../_images/50.jpg";
import img51 from "../_images/51.jpg";
import img52 from "../_images/52.jpg";
import img53 from "../_images/53.jpg";
import img54 from "../_images/54.jpg";

let imageArray = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, 
                  img11, img12, img13, img14, img15, img16, img17, img18,
                  img19, img20, img21, img22, img23, img24, img25, img26, img27,
                  img28, img29, img30, img31, img32, img33, img34, img35, img36,
                  img37, img38, img39,img40, img41, img42, img43, img44, img45,
                  img46, img47, img48, img49, img50, img51, img52, img53, img54];

function Cell(props) {
  const [completed, setCompleted] = useState(false);                                                  

  return (
    <>
      <Button onClick={() => {
              setCompleted(!completed);
            }}>
        <Card sx={{ width: 'auto' }}>
          <CardMedia
            component="img"
            alt={`${props.imageIdx}`}
            height="70"
            image={completed ? marked : imageArray[props.imageIdx]}
          />
        </Card>
      </Button>
    </>
  );
}

function NextCard() {
  const [nextCard, setNextCard] = useState(false);
  const [init, setInit] = useState(true);
  let randIndx = Math.floor(Math.random() * 54);

  return (
    <>
      {nextCard ? (
        <Stack>
          <Card sx={{ mx: "auto", justifyContent: "center", maxWidth: 115 }}>
            <CardMedia
              component="img"
              alt="cell"
              height="70"
              image={imageArray[randIndx]}
            />
          </Card>
          <Button
            onClick={() => {
              setNextCard(false);
            }}
            sx={{
              bgcolor: "#b29c7c",
              mx: "auto",
              width: 150,
              justifyContent: "center",
              mt: 2,
              mb: 5
            }}
          >
            Play Card
          </Button>
        </Stack>
      ) : (
        <Stack>
          <Card sx={{ mx: "auto", justifyContent: "center", maxWidth: 115 }}>
            <CardMedia
              component="img"
              alt="cell"
              height="70"
              image={init? start: imageArray[randIndx]}
            />
          </Card>
          <Button 
            onClick={() => {
              setNextCard(true);
              setInit(false);
            }}
            sx={{
              bgcolor: "#b29c7c",
              color: 'white',
              mx: "auto",
              width: 150,
              justifyContent: "center",
              mt: 2,
              mb: 5
            }}
          >
            Play Card
          </Button>
        </Stack>
      )}
    </>
  );
}

function Row(props) {
  //let arr1 = [<Cell />, <Cell />, <Cell />, <Cell />];
  let rowNum = props.rowNum;
  const row1 = props.row1;
  const row2 = props.row2;
  const row3 = props.row3;
  const row4 = props.row4;

  
  if(rowNum === 1){
    return (row1.map((idx) => { return (<Cell imageIdx={idx}/>)}));
  }
  if(rowNum === 2){
    return (row2.map((idx) => { return (<Cell imageIdx={idx}/>)}));
  }
  if(rowNum === 3){
    return (row3.map((idx) => { return (<Cell imageIdx={idx}/>)}));
  }
  if(rowNum === 4){
    return (row4.map((idx) => { return (<Cell imageIdx={idx}/>)}));
  }
  
}

function CardComponent(props) {
  // genereate random 4x4 cards
  // completeed card
  const arr = props.arr;

  let row1 = arr.slice(0,4);
  let row2 = arr.slice(4, 8);
  let row3 = arr.slice(8,12);
  let row4 = arr.slice(12,16);

  return (
    
    <Table justify="center" alignItems="center" alignContent="center">
      <TableRow>
        <Row rowNum={1} row1={row1}/>
      </TableRow>
      <TableRow>
        <Row rowNum={2} row2={row2}/>
      </TableRow>
      <TableRow>
        <Row rowNum={3} row3={row3}/>
      </TableRow>
      <TableRow>
        <Row rowNum={4} row4={row4} />
      </TableRow>
    </Table>
   
  );
}

export default CardComponent;
export { NextCard };
