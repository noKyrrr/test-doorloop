import {
  Container,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { wordBank, wordPerLine } from "../../config/constants";
import { splitArrayInChunk, splitIntoActiveWordArray } from "../../utils";

import { ActiveWord } from "../../types/game-types";
import WordBox from "../../components/WordBox";
import GameResultModal from "../../components/GameResultModal";

function Game() {
  const [counter, setCounter] = useState(60);
  const [wordCount, setWordCount] = useState(0);
  const [line, setLine] = useState(0);
  const [lineWord, setLineWord] = useState(0);
  const [playTimes, setPlayTimes] = useState(0);
  const [result, setResult] = useState(new Map());
  const [missType, setMissType] = useState(0);
  const [types, setTypes] = useState(0);
  const [totalChar, setTotalChar] = useState(0);

  const wordChunk: string[][] = useMemo(
    () =>
      splitArrayInChunk(
        wordBank.sort(() => Math.random() - 0.5),
        wordPerLine
      ),
    [playTimes]
  );
  const [activeWordArray, setActiveWordArray] = useState<ActiveWord[]>(
    splitIntoActiveWordArray(wordChunk[0][0])
  );

  const handleCloseModal = () => {
    setPlayTimes(playTimes + 1);
  };

  const handleTextBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.value = "";
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputLastCharIndex = e.target.value.length - 1;
    const inputLastChar = e.target.value
      .charAt(inputLastCharIndex)
      .toLowerCase();
    if (inputLastChar === " " && lineWord < wordChunk[line].length) {
      if (lineWord < wordPerLine - 1) {
        setActiveWordArray(
          splitIntoActiveWordArray(wordChunk[line][lineWord + 1])
        );
      }
      setWordCount(wordCount + 1);
      setLineWord(lineWord + 1);

      result.set(wordCount, {
        success:
          e.target.value.trim().toLowerCase() === wordChunk[line][lineWord],
        line,
        lineWord,
      });
      setResult(result);
      setTotalChar(totalChar + wordChunk[line][lineWord].length);
      e.target.value = "";
    } else {
      const compareWord: string = wordChunk[line][lineWord];
      const compareWordLastChar: string = compareWord
        .charAt(inputLastCharIndex)
        .toLowerCase();
      const isSameChar = compareWordLastChar === inputLastChar;
      if (!isSameChar) {
        setMissType(missType + 1);
      } else {
        setTypes(types + 1);
      }
      activeWordArray[inputLastCharIndex] = {
        word: compareWordLastChar,
        result: isSameChar,
        color: isSameChar ? "green" : "red",
      };
      setActiveWordArray(activeWordArray);
    }
  };

  useEffect(() => {
    if (wordCount > 0 && wordCount % wordPerLine === 0) {
      setActiveWordArray(splitIntoActiveWordArray(wordChunk[line + 1][0]));
      setLine(line + 1);
      setLineWord(0);
    }
  }, [wordCount]);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  useEffect(() => {
    setCounter(60);
    setWordCount(0);
    setLine(0);
    setLineWord(0);
    setResult(new Map());
    setTypes(0);
    setMissType(0);
    setTotalChar(0);
    setActiveWordArray(splitIntoActiveWordArray(wordChunk[0][0]));
  }, [playTimes]);

  const ratingsResult = [
    {
      label: `${missType} misstypes`,
      stars: 5 - (missType / types) * 5,
    },
    {
      label: `${wordCount} words`,
      stars: (wordCount / wordBank.length) * 5,
    },
    {
      label: `${types} typed correctly`,
      stars: (types / totalChar) * 5,
    },
    {
      label: `${Math.round(types + missType)} per minute`,
      stars: ((types + missType) / 400) * 5,
    },
  ];
//TODO extract the business logic
  return (
    <Container maxWidth="md">
      <GameResultModal
        handleCloseModal={handleCloseModal}
        open={counter === 0}
        ratingsResult={ratingsResult}
      />

      <Typography variant={"button"} color={"primary"}>
        Type as fast as you can!
      </Typography>
      <Stack spacing={2}>
        <TextField
          label={`Next word: ${wordChunk[line][lineWord]}`}
          variant="outlined"
          fullWidth
          focused
          onBlur={handleTextBlur}
          onChange={handleTextChange}
        />
        <WordBox
          activeWordArray={activeWordArray}
          line={line}
          result={result}
          wordChunk={wordChunk}
          wordCount={wordCount}
        />
        <LinearProgress
          variant="determinate"
          value={101 - (counter / 60) * 100}
        />
      </Stack>
    </Container>
  );
}

export default Game;
