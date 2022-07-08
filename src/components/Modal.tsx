import { Box, Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  open: boolean;
  children?: React.ReactNode
};

const Modal: React.FC<Props> = ({ open, children }) => {
  return (
    <Dialog open={open} TransitionComponent={Transition}>
      <Box height={"400px"} width={"600px"}>
        {children}
      </Box>
    </Dialog>
  );
};

export default Modal;
