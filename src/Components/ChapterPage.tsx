import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getChapter } from '../api';
import Loading from './Loading';
import { TruyenContext } from './TruyenPage';
import { Chapter } from './types';

export const ChapterPage = () => {
  const [chapter, setChapter] = useState<Chapter>();
  const { chapNumber } = useParams();
  const { truyen } = useContext(TruyenContext);
  const [selectChapterValue, setSelectChapterValue] = useState(chapNumber);
  const navigate = useNavigate();

  useEffect(() => {
    if (truyen) {
      const { slug } = truyen;
      if (slug && chapNumber) {
        getChapter(slug, chapNumber).then((chapterData) => {
          if (chapterData) {
            setChapter(chapterData);
          }
        });
      }
    }
  }, [chapNumber, truyen]);

  useEffect(() => {
    setSelectChapterValue(chapNumber);
  }, [chapNumber]);

  function handleChange(event: SelectChangeEvent<string>) {
    setChapter(undefined);
    navigate(`/truyen-tranh/${truyen?.slug}/${event.target.value}`);
  }

  return (
    <Stack spacing={2}>
      <Box sx={{ textAlign: 'center' }}>
        <FormControl>
          <InputLabel id="select-chapter">Chapter</InputLabel>
          <Select
            labelId="select-chapter"
            value={selectChapterValue}
            label="Chapter"
            onChange={handleChange}
          >
            {truyen?.chapters?.map((chapter) => (
              <MenuItem key={chapter.chapNumber} value={chapter.chapNumber}>
                Chapter {chapter.chapNumber}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {chapter ? (
        <List>
          {chapter.images &&
            chapter.images.map((image, index) => (
              <ListItem key={index} sx={{ padding: '0 16px' }}>
                <img
                  style={{ width: '100%' }}
                  src={image}
                  alt={String(chapter.chapNumber)}
                />
              </ListItem>
            ))}
        </List>
      ) : (
        <Loading />
      )}
    </Stack>
  );
};
