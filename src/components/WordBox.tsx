import { Box, Chip, Stack } from "@mui/material";
import { wordPerLine } from "../config/constants";
import { ActiveWord } from "../types/game-types";
import WordChip from "./WordChip";

type Props = {
  wordChunk: string[][];
  line: number;
  activeWordArray: ActiveWord[];
  wordCount: number;
  result: Map<number, any>;
};

const WordBox: React.FC<Props> = ({
  wordChunk,
  line,
  activeWordArray,
  wordCount,
  result,
}) => {
  return (
    <Box overflow={"hidden"} height={102}>
      <Box marginTop={`${-34 * line}px`} sx={{ transition: "margin 700ms" }}>
        {wordChunk.map((words, chunkIndex) => (
          <Stack
            margin={"2px"}
            direction="row"
            spacing={2}
            justifyContent="space-between"
          >
            {words.map((word, index) => {
              const wordId = chunkIndex * wordPerLine + index;
              const activeWord = wordId === wordCount;
              let color: "info" | "success" | "warning" = "info";
              if (result.has(wordId)) {
                color = result.get(wordId).success ? "success" : "warning";
              }

              return activeWord ? (
                <WordChip color={color}>
                  {activeWordArray.map((word) => {
                    return (
                      <span style={{ color: word.color }}>{word.word}</span>
                    );
                  })}
                </WordChip>
              ) : (
                <WordChip word={word} color={color} />
              );
            })}
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

export default WordBox;
