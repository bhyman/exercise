import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  createRow,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Source: https://www.material-react-table.com/docs/guides/editing
export const Table = ({
  data,
  editDataById,
  prependToData,
  removeFromDataById,
}) => {
  const columns = useMemo(
    () => [
      {
        header: "id",
        accessorKey: "id",
        enableEditing: false,
        visibleInShowHideMenu: false,
        Edit: () => null, //Source: https://stackoverflow.com/a/77878877
      },
      {
        accessorKey: "datetime",
        header: "Event datetime",
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "source",
        header: "Source",
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "content",
        header: "Content",
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: "topic",
        header: "Topic",
        size: 100,
        editVariant: "select",
        // https://en.wikipedia.org/wiki/Topi%C4%87
        editSelectOptions: [
          "Ante Topić Mimara, Croatian art collector and philanthropist",
          "Angelina Topić, Serbian high jumper",
          "Biljana Topić, Serbian triple jumper",
          "Borislav Topić, Bosnian football defender",
          "Dado Topić, Croatian rock musician",
          "Dragutin Topić, Serbian high jumper",
          "Eldar Topić, Bosnian football player",
          "Goran Topić, Serbian basketball coach and scout",
          "Jadranko Topić, Yugoslav football striker",
          "Jan Topić, Ecuadorian businessman and politician",
          "Josip Topić, Bosnian-Herzegovinian football player",
          "Joško Topić, Croatian tennis player",
          "Milenko Topić, Serbian basketball coach and former player",
          "Marko Topić, Bosnian football forward",
          "Mira Topić, Croatian volleyball player",
          "Mirko Topić, Serbian football player",
          "Nikola Topić, Serbian basketball player",
          "Ognjen Topic, Serbian-born American Muay Thai kickboxer",
          "Velibor Topić, Bosnian and British actor",
          "Željko Topić, Croatian civil servant",
          "Topic, German DJ, producer and musician",
        ],
        muiEditTextFieldProps: {
          select: true,
        },
      },
      {
        accessorKey: "num_followers",
        header: "Number of followers",
        muiEditTextFieldProps: {
          required: true,
        },
        size: 100,
      },
      {
        accessorKey: "num_following",
        header: "Number of following",
        muiEditTextFieldProps: {
          required: true,
        },
        size: 50,
      },
    ],
    [],
  );

  const handleCreateRow = ({ values }) => {
    prependToData({ ...values, id: Math.floor(Math.random() * 10000) + 5 });
    table.setCreatingRow(null); //exit creating mode
  };

  const handleSaveRow = ({ values, row }) => {
    editDataById(row.id, values);
    table.setEditingRow(null); //exit editing mode
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this data point?")) {
      removeFromDataById(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { columnVisibility: { id: false }, density: "compact" },
    createDisplayMode: "modal", // ('modal', and 'custom' are also available)
    editDisplayMode: "row", // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "300px",
      },
    },
    onCreatingRowSave: handleCreateRow,
    onEditingRowSave: handleSaveRow,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          // table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          table.setCreatingRow(
            createRow(table, {
              datetime: new Date().toISOString(),
            }),
          );
        }}
      >
        Prepend New Data Point
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};
