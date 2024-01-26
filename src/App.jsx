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

import  {fixtureData}  from "./fixture";
import Example from './JS';

const App = () => {

  const [data, setData] = useState(fixtureData);

  const handleAddData = (newData) => {
    setData((prevData) => [...prevData, newData]);
  };

  return (
    <Example appendToData={handleAddData} data={data} />
  );
};

export default App;
