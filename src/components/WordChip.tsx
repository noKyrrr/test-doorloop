import { Box, Chip } from "@mui/material"

type Props = {
    word?: string, 
    color: "info" | "success" | "warning", 
    children?: React.ReactNode
  };

const WordChip:  React.FC<Props> = ({word, color, children})=>{
    if(children){
        return <Box
        color={color}
        sx={{
          fontSize: "20px",
          borderRadius: "15px",
          backgroundColor: "lightskyblue",
          padding: "0 15px 0 15px",
        }}
      >
        {children}
      </Box>
    }

    return <Chip label={word} variant={"outlined"} color={color} />

}

export default WordChip;