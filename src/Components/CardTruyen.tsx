import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Truyen } from './types';

export const CardTruyen = ({
  truyen,
}: {
  truyen: Pick<Truyen, 'url' | 'slug' | 'title' | 'cover'>;
}) => {
  return (
    <Card sx={{ maxWidth: '100%', height: 300 }}>
      <CardMedia
        component="img"
        sx={{
          height: '214px',
          width: '100%',
          objectFit: 'cover',
        }}
        image={truyen.cover}
        alt={truyen.title}
      />
      <CardContent sx={{ padding: '8px' }}>
        <Typography gutterBottom variant="body2" component="div">
          {truyen.title.length > 50
            ? `${truyen.title.slice(0, 50)}...`
            : truyen.title}
        </Typography>
      </CardContent>
    </Card>
  );
};
