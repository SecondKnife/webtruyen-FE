import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  Link,
  Typography,
  Badge,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Loading from './Loading';
import { SideBar } from './SideBar';
import { TruyenContext } from './TruyenPage';
import { Chapter } from './types';

export default function TruyenDetail() {
  const { truyen } = useContext(TruyenContext);

  if (!truyen) {
    return <Loading />;
  }

  return (
    <Grid container spacing={2}>
      <Grid container item xs>
        <Stack spacing={4}>
          <Box>
            <Typography
              sx={{ textAlign: 'center' }}
              gutterBottom
              variant="h4"
              component="div"
            >
              {truyen.title}
            </Typography>
            <Card sx={{ width: '100%', flexDirection: 'column' }}>
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: '200px' }}
                  image={truyen.cover}
                  alt="cover"
                />
                <CardContent sx={{ flex: '1' }}>
                  <List>
                    <Divider />
                    <ListItem>
                      <Grid container>
                        <Grid item xs={3}>
                          Tên khác
                        </Grid>
                        <Grid item xs={9}>
                          {truyen.otherName.join(' ; ')}
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <Grid container>
                        <Grid item xs={3}>
                          Tác giả
                        </Grid>
                        <Grid item xs={9}>
                          {truyen.author}
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <Grid container>
                        <Grid item xs={3}>
                          Tình trạng
                        </Grid>
                        <Grid item xs={9}>
                          {truyen.status}
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <Grid container>
                        <Grid item xs={3}>
                          Thể loại
                        </Grid>
                        <Grid item xs={9}>
                          {truyen.kind.map((theloai, index, kind) => (
                            <React.Fragment>
                              <Link
                                component={RouterLink}
                                to={`/?kind=${theloai}`}
                              >
                                {theloai}
                              </Link>
                              {index === kind.length - 1 ? '' : ' - '}
                            </React.Fragment>
                          ))}
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                  </List>
                </CardContent>
              </CardContent>
            </Card>
          </Box>
          <Box>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Nội dung chính
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {truyen.detail}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box>
            <Badge
              sx={{ width: '100%' }}
              badgeContent={truyen?.chapters?.length || 0}
              color="primary"
              max={999}
            >
              <Accordion
                sx={{ width: '100%' }}
                TransitionProps={{ unmountOnExit: true }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  Danh sách chap
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {truyen.chapters &&
                      truyen.chapters.map((chapter) => (
                        <React.Fragment>
                          <ListItem key={chapter.chapNumber}>
                            {Object.keys(chapter)
                              .filter(
                                (key) => !['_id', 'images', 'url'].includes(key)
                              )
                              .map((key) => (
                                <Link
                                  key={key}
                                  component={RouterLink}
                                  to={String(chapter.chapNumber)}
                                  sx={{ textDecoration: 'none' }}
                                >
                                  {`Chapter ${chapter[key as keyof Chapter]}`}
                                </Link>
                              ))}
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Badge>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <SideBar />
      </Grid>
    </Grid>
  );
}
