import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import { Link, Paper, Typography, CardActionArea } from '@mui/material';
// components
import Image from '../../components/image';

import { varHover, varTranHover } from '../../components/animate';

// ----------------------------------------------------------------------

type Props = {
  item: {
    name: string;
    icon: string;
    href: string;
  };
};

export default function ComponentCard({ item }: Props) {
  const { name, icon, href } = item;

  return (
    <Link href={href} underline="none" target="_blank" rel="noopener">
      <Paper
        variant="outlined"
        sx={{ borderColor: (theme) => alpha(theme.palette.grey[500], 0.12) }}
      >
        <CardActionArea
          component={m.div}
          whileHover="hover"
          sx={{
            p: 2.5,
            color: 'text.secondary',
            bgcolor: 'background.neutral',
          }}
        >
          <m.div variants={varHover(1.1)} transition={varTranHover()}>
            <Image src={icon} alt={name} />
          </m.div>
        </CardActionArea>

        <Typography variant="subtitle2" sx={{ p: 2, textAlign: 'center' }}>
          {name}
        </Typography>
      </Paper>
    </Link>
  );
}
