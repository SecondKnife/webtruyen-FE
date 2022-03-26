import { Breadcrumbs, Link, Typography, Chip } from '@mui/material';
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';

interface LocationStateType {
  fromPage: string;
}

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname
    .split('/')
    .filter((x) => x)
    .slice(1);
  const state = location.state as LocationStateType | null;
  return (
    <Breadcrumbs separator={<NavigateNextSharpIcon />}>
      <Link
        underline="hover"
        component={RouterLink}
        color="inherit"
        to={`/${state ? `?page=${state.fromPage}` : ''}`}
      >
        <Chip component={'div'} label="Home" />
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/truyen-tranh/${value}`;

        return last ? (
          <Typography component={'div'} color="text.primary" key={to}>
            <Chip label={value} color="primary" />
          </Typography>
        ) : (
          <Link component={RouterLink} underline="hover" to={to} key={to}>
            <Chip label={value} />
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
