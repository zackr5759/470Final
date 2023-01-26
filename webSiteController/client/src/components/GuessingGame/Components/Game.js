import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Input,
  Box,
  Stack,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { color } from "@mui/system";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(3.5)" }}
  >
    |
  </Box>
);

const generateNums = () => {
  let arr = new Set();
  for (let i = arr.size; i < 3; ) {
    arr.add(Math.floor(Math.random() * 51) + 10);
    i++;
  }
  let res = [...arr];
  return res;
};

let nums = generateNums();
console.log(nums);
let solution = [];
const shuffleArray = (array) => {
  solution = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = solution[i];
    solution[i] = solution[j];
    solution[j] = temp;
  }
};
shuffleArray(nums);
console.log(nums);
console.log(solution);

const newArray = () => {
  nums = generateNums();
  console.log(nums);
  shuffleArray(nums);
  console.log(nums);
  console.log(solution);
};

function Game() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [streak, setStreak] = useState(0);
  const [guessesRemaining, setGuessesRemaining] = useState(10);
  const [totalGuesses, setTotalGuesses] = useState(0);

  const clear = () => {
    setInput1("");
    setInput2("");
    setInput3("");
  };

  const clearScores = () => {
    setStreak(0);
    setTotalGuesses(0);
    setGuessesRemaining(10);
  };

  const equal = (guess2) => {
    for (let i = 0; i < solution.length; i++) {
      if (solution[i] !== guess2[i]) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let guess2 = [];
    let guessCount = guessesRemaining - 1;
    setGuessesRemaining(guessCount);
    if (input1 && input2 && input3) {
      guess2 = [Number(input1), Number(input2), Number(input3)];
    }
    if (equal(guess2)) {
      console.log("correct guess!");
      let newStreak = streak + 1;
      let totalCount = totalGuesses + 1;
      setTotalGuesses(totalCount);
      setStreak(newStreak);
    } else {
      setStreak(0);
    }
    clear();
    newArray();
  };

  return (
    <>
      <Stack ml={58} mr={58} alignItems="center" bgcolor="#393e46">
        <Grid my={4}>
          <Card sx={{ minWidth: 115 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {nums[0]} {bull} {nums[1]} {bull} {nums[2]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <form noValidate autoComplete="off">
          <div>Guesses remaining: {guessesRemaining} </div>{" "}
          <div>Total Guesses: {totalGuesses} </div> <div>Streak: {streak} </div>
          <Card sx={{ maxWidth: 300 }}>
            <CardContent>
              <TextField
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                id="outlined-basic"
                label="positon 1"
                variant="outlined"
              />{" "}
              <TextField
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                id="outlined-basic"
                label="positon 2"
                variant="outlined"
              />{" "}
              <TextField
                value={input3}
                onChange={(e) => setInput3(e.target.value)}
                id="outlined-basic"
                label="positon 3"
                variant="outlined"
              />{" "}
            </CardContent>
          </Card>
          {streak === 3 && (
            <Box>
              <Typography>Congrats! You guessed 3 in a row!</Typography>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={clearScores}
              >
                Play Again
              </Button>
            </Box>
          )}
          {guessesRemaining === 0 && (
            <Box>
              <Typography>Guess limit reached!</Typography>
              <Typography>You obtained a score of {totalGuesses}.</Typography>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={clearScores}
              >
                Play Again
              </Button>
            </Box>
          )}
          {streak !== 3 && guessesRemaining !== 0 ? (
            <Box alignContent="center" alignItems="center">
              {" "}
              <Button
                color="secondary"
                variant="contained"
                onClick={handleSubmit}
              >
                Submit Guess
              </Button>
            </Box>
          ) : (
            ""
          )}
        </form>
      </Stack>
    </>
  );
}

export default Game;
