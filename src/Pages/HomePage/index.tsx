import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { SnackbarProvider, useSnackbar } from 'notistack';
import AddUserForm from '../../Components/AddUserForm';
import { useEffect, useState } from 'react';
import { UserFormValues } from '../../Constants/app.constants';
import styles from './HomePage.module.scss';
import { generateUniqueId } from '../../Utils/utils';

const HomePage = () => {
    const [openUserForm, setOpenUserForm] = useState<boolean>(false);
    const [rowData, setRowData] = useState<UserFormValues[]>([]);
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        const loadUsers = async () => {
            const response = await fetch('/users.json');
            const data = await response.json();

            //assigning unique ids to users to map the data in table
            const dataWithIds = data?.userData.map((user: UserFormValues) => ({
                ...user,
                id: generateUniqueId(), // Assigns a unique id
            }));
            setRowData(dataWithIds);
        };
        loadUsers();
    }, [])

    const columnData = [
        { field: 'userName', headerName: 'Username', flex: 3 },
        { field: 'firstName', headerName: 'First Name', flex: 2 },
        { field: 'lastName', headerName: 'Last Name', flex: 2 },
        { field: 'email', headerName: 'Email', flex: 3 }
    ]

    const submitForm = (formData: UserFormValues) => {
        const user = {
            id: generateUniqueId(),
            userName: formData?.userName,
            firstName: formData?.firstName,
            lastName: formData?.lastName,
            email: formData?.email
        }
        setRowData((prevData) => [...prevData, user]);
        // enqueueSnackbar('User is successfully added!');
        enqueueSnackbar(<span>User is successfully added!</span>, {
            variant: 'success',
            hideIconVariant: false,
            autoHideDuration: 5000
        });
    }

    return (
        <Box className={styles.homePage}>
            <Box className={styles.navbarDiv} >
                <h1 className={styles.pageHeader}>User Application</h1>
                <Button variant="contained" className={styles.addBtn} onClick={() => setOpenUserForm(true)}>Add a User</Button>
            </Box>
            <DataGrid
                sx={{
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: '#1976d2 !important',
                        color: 'white !important',
                        fontSize: '17px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif !important'
                    }
                }}
                rows={rowData}
                columns={columnData}
                getRowId={(row: any) => row?.id}
            />
            <AddUserForm
                openForm={openUserForm}
                setOpenForm={(val: boolean) => setOpenUserForm(val)}
                submitForm={submitForm}
            />
        </Box>
    )
}

export default HomePage
