import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
  Toolbar,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { searchByQuery } from '../api';
import Breadcrumb from './Breadcrumb';
import { Truyen } from './types';

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchOption, setSearchOption] = useState<
    Array<Pick<Truyen, 'title' | 'slug' | 'cover'>>
  >([]);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    if (searchInput && open) {
      id = setTimeout(() => {
        setLoading(true);
        searchByQuery({ title: searchInput }).then((options) => {
          setLoading(false);
          if (options) {
            setSearchOption(options);
          }
        });
      }, 500);
    }
    return () => {
      clearTimeout(id);
    };
  }, [searchInput, open]);

  useEffect(() => {
    if (!open) {
      setSearchOption([]);
    }
  }, [open]);

  return (
    <React.Fragment>
      <Container sx={{ width: '1000px' }}>
        <Stack spacing={2}>
          <AppBar
            position="static"
            sx={{ backgroundColor: '#a5d2ff', borderRadius: '5px' }}
          >
            <Toolbar>
              <Grid
                container
                spacing={2}
                sx={{ height: '100%', padding: '16px 0' }}
              >
                <Grid
                  item
                  xs={3}
                  container
                  alignItems="center"
                  justifyContent="center"
                >
                  <Link to="/">
                    {/* <img style={{height: '100%'}} src={logo} alt="logo"/> */}
                    <Button>Logo</Button>
                  </Link>
                </Grid>
                <Grid item xs>
                  <Autocomplete
                    disablePortal
                    size="small"
                    open={open}
                    onOpen={() => {
                      setOpen(true);
                    }}
                    onClose={() => {
                      setOpen(false);
                    }}
                    getOptionLabel={(option) => option.title}
                    isOptionEqualToValue={() => true}
                    options={searchOption}
                    loading={loading}
                    renderOption={(props, option) => (
                      <li {...props} key={option.slug}>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/truyen-tranh/${option.slug}`}
                        >
                          {option.title}
                        </Link>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loading ? (
                                <CircularProgress
                                  color="inherit"
                                  sx={{ marginRight: '32px' }}
                                  size={10}
                                />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                        label="Tìm kiếm truyện"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={2} container justifyContent="center">
                  <Button variant="contained" color="primary">
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Box>
            <Breadcrumb />
          </Box>
          <Outlet />
          <Grid container>
            <Grid item xs={4}>
              {/* <img src={logo} alt="logo" /> */}
              <Button>Logo</Button>
            </Grid>
            <Grid item xs={8}></Grid>
          </Grid>
        </Stack>
      </Container>
    </React.Fragment>
  );
}

export default Dashboard;
