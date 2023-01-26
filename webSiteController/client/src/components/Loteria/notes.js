
function CardComponent() {
    // genereate random 4x4 cards
    // completeed card
    //
    return (
      <table>
        <Grid justify="center" alignItems="center" alignContent="center">
          <tr><Row /></tr>
          <tr><Row /></tr>
          <tr><Row /></tr>
          <tr><Row /></tr>
        </Grid>
      </table>
    );
  }

  // cell 
  function Cell() {
    const [completed, setCompleted] = useState(false);
  
    let randIndx = Math.floor(Math.random() * 2);
  
    return (
      <>
        <Button>
          <Card sx={{ width: 115 }}>
            <CardMedia
              component="img"
              alt="cell"
              height="70"
              image={imageArray[randIndx]}
            />
          </Card>
        </Button>
      </>
    );
  }

  // cell prop
  // <Cell image = arr[1]/>
  //  image = {props.image}

  const handleClick = () => {
    return (
      <>
        <Card sx={{ mx: "auto", justifyContent: "center", maxWidth: 115 }}>
          <CardMedia
            component="img"
            alt="cell"
            height="70"
            image={imageArray[1]}
          />
        </Card>
      </>
    );
  };

  //image={nextCard? imageArray[1]: imageArray[0]}

  // images[54]
  // card1Arr = randomSort(12)
  // card2Arr = randomSort(12)
  // row1 = 


  function CardComponent() {
    // genereate random 4x4 cards
    // completeed card
    let row = [];
    let rowSet = new Set(row);
    while(rowSet.size !== 4){
      rowSet.add(Math.floor(Math.random() * 12));
    }
    row = [...rowSet]

<Stack sx={{mx: "auto"}}>
    <Box sx={{ mx: "auto", bgcolor: "#b29c7c" }}>
    <Card  />
  </Box>
  <Button  sx={{ bgcolor: "white" }}>Loteria</Button>
  </Stack>