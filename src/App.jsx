import React, { useState } from "react";
import "./App.css";

import { fixtureData } from "./fixture";
import { Graph } from "./Graph";
import { Table } from "./Table";

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
    <>
      <Table
        data={data}
        editDataById={editDataById}
        prependToData={prependToData}
        removeFromDataById={removeFromDataById}
      />
      <div className="graph-container">
        <Graph data={data} />
      </div>
    </>
  );
};

export default App;
