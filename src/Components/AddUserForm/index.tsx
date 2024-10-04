import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography
} from '@mui/material';
import styles from './AddUserForm.module.scss';
import { useForm } from 'react-hook-form';
import { getFieldErrorMessage } from '../../Utils/utils';
import { getRandomUser } from '../../Utils/api';
import { useSnackbar } from 'notistack';
import { UserFormValues } from '../../Constants/app.constants';
import LoaderComponent from '../Loader';

const initialValues: UserFormValues = {
  userName: '',
  firstName: '',
  lastName: '',
  email: ''
};

type addUserFormProps = {
  openForm: boolean
  setOpenForm: (val: boolean) => void;
  submitForm: (data: UserFormValues) => void;
}

const AddUserForm: React.FC<addUserFormProps> = ({ openForm, setOpenForm, submitForm }) => {

  const [open, setOpen] = useState<boolean>(openForm)
  const [loading, setLoading] = useState<boolean>(false);
  const [inputs, setInputs] = useState({ ...initialValues });
  const { enqueueSnackbar } = useSnackbar()
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserFormValues>({
    mode: 'onChange',
    defaultValues: { ...initialValues }
  });

  useEffect(() => {
    setOpen(openForm)
  }, [openForm])

  // To generate a random user from the API
  const generateRandomUser = async () => {
    reset(initialValues);
    setLoading(true)
    try {
      const apiResponse = await getRandomUser();
      if (apiResponse !== undefined) {
        const user = {
          userName: apiResponse?.data?.username,
          firstName: apiResponse?.data?.first_name,
          lastName: apiResponse?.data?.last_name,
          email: apiResponse?.data?.email
        }
        setInputs(user);
        setLoading(false);
      } else {
        enqueueSnackbar(<span>API Error while generating a User! Please try again!</span>, {
          variant: 'error',
          hideIconVariant: false,
          autoHideDuration: 5000
        });
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      throw new Error(`API Error: "${err}"`);
    }
  };

  const handleChange = (event: any) => {
    console.log('handlechange called')
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleClose = () => {
    setOpen(false);
    setOpenForm(false);
    handleFormReset();
  };

  const handleFormReset = () => {
    setInputs(initialValues);
    reset(initialValues);
  };

  const onSubmit = (data: UserFormValues) => {
    submitForm(inputs);
    handleClose();
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        closeAfterTransition
        PaperProps={{
          sx: {
            minWidth: 400,
            maxWidth: 864
          }
        }}
      >
        <DialogTitle>
          <Typography className={styles.formTitle}>
            USER FORM
          </Typography>
        </DialogTitle>

        {!loading ? (
          <Box>
            <Divider className={styles.divider} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogContent>
                <Box className={styles.inputFields}>
                  <TextField
                    name='userName'
                    label='Username'
                    className={styles.textInput}
                    value={inputs?.userName}
                    onChange={handleChange}
                    required={true}
                    inputProps={{
                      ...register('userName', {
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/,
                          message: 'Special Characters and Spaces are not allowed!'
                        },
                      })
                    }}
                    error={!!errors.userName}
                    helperText={getFieldErrorMessage(errors.userName)}
                    fullWidth
                  />

                  <TextField
                    name='firstName'
                    label='First Name'
                    onChange={handleChange}
                    value={inputs?.firstName}
                    required={true}
                    inputProps={{
                      ...register('firstName', {
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/,
                          message: 'Special Characters and Spaces are not allowed!'
                        },
                      })
                    }}
                    error={!!errors.firstName}
                    helperText={getFieldErrorMessage(errors.firstName)}
                    fullWidth
                  />

                  <TextField
                    name='lastName'
                    label='Last Name'
                    value={inputs?.lastName}
                    onChange={handleChange}
                    required={true}
                    inputProps={{
                      ...register('lastName', {
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/,
                          message: 'Special Characters and Spaces are not allowed!'
                        },
                      })
                    }}
                    error={!!errors.lastName}
                    helperText={getFieldErrorMessage(errors.lastName)}
                    fullWidth
                  />

                  <TextField
                    name='email'
                    label='Email'
                    value={inputs?.email}
                    required={true}
                    onChange={handleChange}
                    inputProps={{
                      ...register('email', {
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Please Enter a Valid Email!'
                        },
                      })
                    }}
                    error={!!errors.email}
                    helperText={getFieldErrorMessage(errors.email)}
                    fullWidth
                  />
                </Box>
              </DialogContent>
              <DialogActions className={styles.btnPanel}>
                <Button
                  variant="contained"
                  className={styles.buttons}
                  onClick={generateRandomUser}
                >
                  Generate
                </Button>

                <Button
                  variant="contained"
                  type='reset'
                  className={styles.buttons}
                  onClick={handleClose}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  type='submit'
                  className={styles.buttons}
                  color='primary'
                >
                  Submit
                </Button>
              </DialogActions>
            </form>
          </Box>
        ) :
          (
            <LoaderComponent />
          )}
      </Dialog>
    </Box>
  );
};

export default AddUserForm;
