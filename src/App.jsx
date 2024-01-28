import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./App.css";

import { fixtureData } from "./fixture";
import Example from "./JS";

const App = () => {
  const [data, setData] = useState(fixtureData);

  const prependToData = (newData) =>
    setData((prevData) => [newData, ...prevData]);
  const removeFromDataById = (id) =>
    setData((prevData) => prevData.filter((datum) => datum.id !== id));
  const editDataById = (id, values) => {
    setData(
      (prevData) =>
        prevData.map((datum) =>
          datum.id === id ? { ...datum, ...values } : datum,
        ),
      // https://stackoverflow.com/a/61304412
    );
  };

  return (
    <Example
      data={data}
      editDataById={editDataById}
      prependToData={prependToData}
      removeFromDataById={removeFromDataById}
    />
  );
};

export default App;
