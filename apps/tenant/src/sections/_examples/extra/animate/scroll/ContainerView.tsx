import { m } from 'framer-motion';
import { useRef } from 'react';
// @mui
import { Box, Paper, Typography } from '@mui/material';
// components
import Scrollbar from '../../../../../components/scrollbar';
import { MotionViewport, varContainer } from '../../../../../components/animate';
//
import getVariant from '../getVariant';

// ----------------------------------------------------------------------

type ContainerViewProps = {
  selectVariant: string;
};

export default function ContainerView({ selectVariant, ...other }: ContainerViewProps) {
  const scrollRef = useRef(null);

  return (
    <Paper
      ref={scrollRef}
      component={m.div}
      variants={varContainer()}
      sx={{
        height: 480,
        bgcolor: 'background.neutral',
      }}
      {...other}
    >
      <Scrollbar>
        {[...Array(40)].map((_, index) => (
          <Box
            key={index}
            component={MotionViewport}
            variants={getVariant(selectVariant)}
            viewport={{ root: scrollRef, once: true, amount: 0.1 }}
            sx={{
              my: 2,
              mx: 'auto',
              height: 72,
              maxWidth: 480,
              display: 'flex',
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.paper',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Typography variant="body2">Item {index + 1}</Typography>
          </Box>
        ))}
      </Scrollbar>
    </Paper>
  );
}
