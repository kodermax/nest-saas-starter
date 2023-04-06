import { m } from 'framer-motion';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function ContactForm() {
  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3">
          Feel free to contact us. <br />
          We'll be glad to hear from you, buddy.
        </Typography>
      </m.div>

      <Stack spacing={3}>
        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Name" />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Email" />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Subject" />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Enter your message here." multiline rows={4} />
        </m.div>
      </Stack>

      <m.div variants={varFade().inUp}>
        <Button size="large" variant="contained">
          Submit Now
        </Button>
      </m.div>
    </Stack>
  );
}
