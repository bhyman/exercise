import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  // createRow,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Source: https://www.material-react-table.com/docs/guides/editing
const Example = ({appendToData, data}) => {

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        enableEditing: false,
        Edit: () => null, //disable editing on this column and hide it, https://stackoverflow.com/a/77878877
      },
      {
        accessorKey: 'source',
        header: 'First Name',
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: 'content',
        header: 'Last Name',
        muiEditTextFieldProps: {
          required: true,
        },
      },
      {
        accessorKey: 'topic',
        header: 'Email',
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
        },
      },
      {
        accessorKey: 'state',
        header: 'State',
        editVariant: 'select',
        editSelectOptions: ['foo', 'bar'],
        muiEditTextFieldProps: {
          select: true,
        },
      },
    ],
    [],
  );

  const deleteUser = (user) => {console.log(`deleted $(user)`, user)};
  const createUser = (values) => {console.log(`created $(values)`, values)};
  const updateUser = (values) => {console.log(`updated $(values)`)};

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { columnVisibility: { id: false } },
    createDisplayMode: 'modal', // ('modal', and 'custom' are also available)
    editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowSave: handleCreateUser,
    onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
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
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New Data Point
      </Button>
    ),
    state: {
      isLoading: false,
      isSaving: false,
      showAlertBanner: false,
      showProgressBars: false,
    },
  });

  return <MaterialReactTable table={table} />;
};


export default Example;

