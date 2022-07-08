import { Box, Rating, Slide, Stack } from "@mui/material";

import StarIcon from "@mui/icons-material/Star";

type Props = {
  stars: number;
  label?: string;
};

const StarRating: React.FC<Props> = ({ stars, label }) => {
  return (
    <Stack direction={"row"} alignContent={"center"}>
      <Rating
        value={stars}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}>{label}</Box>
    </Stack>
  );
};

export default StarRating;
