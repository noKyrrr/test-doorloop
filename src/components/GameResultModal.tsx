import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import AutorenewIcon from "@mui/icons-material/Autorenew";
import { GameResult } from "../types/game-types";
import Modal from "./Modal";
import StarRating from "./StarRating";

type Props = {
  open: boolean;
  handleCloseModal: () => void;
  ratingsResult: GameResult[];
};

const GameResultModal: React.FC<Props> = ({
  open,
  handleCloseModal,
  ratingsResult,
}) => {
  return (
    <Modal open={open}>
      <Box height={"400px"} width={"600px"}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseModal}
              aria-label="close"
            >
              <AutorenewIcon />
              <Typography> Try again </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Stack spacing={2} margin={5}>
          <Typography variant={"h6"} color={"primary"} align="center">
            Game result
          </Typography>
          {ratingsResult.map((result) => (
            <StarRating stars={result.stars} label={result.label} />
          ))}
        </Stack>
      </Box>
    </Modal>
  );
};

export default GameResultModal;
