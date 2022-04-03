import { Box, Typography } from "@mui/material";
import React from "react";

function Item({ title, count, icon }) {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {icon}
        <Box sx={{ marginLeft: 3 }}>
          <Typography
            component="h2"
            variant="h6"
            color="primary"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            {title}
          </Typography>
          <Typography component="p" variant="h4">
            {count}
          </Typography>
        </Box>
      </Box>

      {/* <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography> */}
    </React.Fragment>
  );
}

export default Item;
