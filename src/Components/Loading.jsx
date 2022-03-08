import { Box, CircularProgress } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const Loading = forwardRef((props, ref) => {
  const [toggle, setToggle] = useState(false);

  useImperativeHandle(ref, () => ({
    openLoading() {
      setToggle(true);
    },
  }));

  return toggle ? (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <> </>
  );
});

export default Loading;
