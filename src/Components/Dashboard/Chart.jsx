import { Typography } from "@mui/material";
import {
  ResponsiveContainer,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
} from "recharts";
import React from "react";

function Chart({ statistics }) {
  return (
    <>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        sx={{ fontWeight: "bold" }}
        gutterBottom
      >
        Stocks Monitoring
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={statistics}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {" "}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="donated" stackId="a" fill="#2196f3" />
          <Bar dataKey="balance" stackId="a" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default Chart;
