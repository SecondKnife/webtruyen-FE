import {
  SpeedDialAction,
  SpeedDialIcon,
  SpeedDial as MuiSpeedDial,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { TruyenContext } from './TruyenPage';

const defaultActions = [
  {
    icon: <ArrowUpwardIcon />,
    title: 'Lên đầu trang',
    onClick: () => {
      window.scrollTo(0, 0);
    },
  },
];

export default function SpeedDial() {
  const [actions, setActions] = useState(defaultActions);
  const params = useParams();
  const navigate = useNavigate();
  const { truyen } = useContext(TruyenContext);

  useEffect(() => {
    if (params.chapNumber && truyen?.chapters) {
      const chapter = truyen.chapters.find(
        (chap) => chap.chapNumber === Number(params.chapNumber)
      )!;
      const indexOfChapter = truyen.chapters.indexOf(chapter);
      const isLast = indexOfChapter === truyen.chapters.length - 1;
      const isFirst = isLast ? false : indexOfChapter === 0;
      const chapterBefore = {
        icon: <ArrowBackIcon />,
        title: 'Chapter trước',
        onClick: () => {
          navigate(
            `/truyen-tranh/${params.slug}/${Number(params.chapNumber) - 1}`
          );
          window.scrollTo(0, 0);
        },
      };
      const chapterAfter = {
        icon: <ArrowForwardIcon />,
        title: 'Chapter sau',
        onClick: () => {
          navigate(
            `/truyen-tranh/${params.slug}/${Number(params.chapNumber) + 1}`
          );
          window.scrollTo(0, 0);
        },
      };
      const additionActions =
        !isLast && !isFirst
          ? [chapterBefore, chapterAfter]
          : isLast
          ? [chapterBefore]
          : [chapterAfter];
      setActions([...defaultActions, ...additionActions]);
    } else {
      setActions(defaultActions);
    }
  }, [params, navigate, truyen]);

  return (
    <MuiSpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map(({ icon, title, ...items }) => (
        <SpeedDialAction
          key={title}
          icon={icon}
          tooltipTitle={title}
          {...items}
        />
      ))}
    </MuiSpeedDial>
  );
}
