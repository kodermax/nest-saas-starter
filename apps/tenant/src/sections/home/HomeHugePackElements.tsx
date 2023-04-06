import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Fab,
  Tab,
  Box,
  Grid,
  Tabs,
  Chip,
  Alert,
  Stack,
  Radio,
  Paper,
  Button,
  Rating,
  Slider,
  Switch,
  MenuItem,
  Checkbox,
  Container,
  TextField,
  Typography,
  AlertTitle,
  Pagination,
  CardHeader,
  IconButton,
  ToggleButton,
  CircularProgress,
  FormControlLabel,
  ToggleButtonGroup,
} from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgGradient } from '../../utils/cssStyles';
// routes
import { PATH_PAGE } from '../../routes/paths';
// _mock
import _mock from '../../_mock';
// components
import Label from '../../components/label';
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import MenuPopover from '../../components/menu-popover';
import BadgeStatus from '../../components/badge-status';
import { CustomAvatar, CustomAvatarGroup } from '../../components/custom-avatar';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(20),
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.98),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  padding: theme.spacing(1.5, 0),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 0),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2.5),
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    paddingLeft: theme.spacing(5),
    paddingTop: theme.spacing(15),
  },
}));

const StyledRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': {
    margin: theme.spacing(1.5),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(2.5),
    },
  },
}));

// ----------------------------------------------------------------------

export default function HomeHugePackElements() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Grid direction={{ xs: 'column', md: 'row-reverse' }} container spacing={5}>
          <Grid item xs={12} md={5}>
            <Description />
          </Grid>

          <Grid item xs={12} md={7}>
            <Content />
          </Grid>

          {!isDesktop && (
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              {ViewAllButton}
            </Grid>
          )}
        </Grid>
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <StyledDescription>
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          Interface Starter Kit
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ my: 3 }}>
          Huge pack <br />
          of elements
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mb: 5,
            color: 'text.secondary',
          }}
        >
          We collected most popular elements. Menu, sliders, buttons, inputs etc. are all here. Just
          dive in!
        </Typography>
      </m.div>

      {isDesktop && ViewAllButton}
    </StyledDescription>
  );
}

// ----------------------------------------------------------------------

function Content() {
  const isMd = useResponsive('up', 'md');

  const isLg = useResponsive('up', 'lg');

  const [mounted, setMounted] = useState(false);

  const [slider, setSlider] = useState<number>(24);

  const [select, setSelect] = useState('Option 1');

  const [alignment, setAlignment] = useState('left');

  const [rating, setRating] = useState<number | null>(2);

  const [currentTab, setCurrentTab] = useState('Angular');

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <StyledContent>
      {/* Row 1 */}
      <StyledRow>
        <m.div variants={varFade().in}>
          <Button variant="contained" startIcon={<Iconify icon="ic:round-add-shopping-cart" />}>
            Add To Cart
          </Button>
        </m.div>

        <m.div variants={varFade().in}>
          <Button variant="soft" startIcon={<Iconify icon="eva:cloud-upload-fill" />}>
            Upload
          </Button>
        </m.div>

        <m.div variants={varFade().in}>
          <Fab color="info" size="medium">
            <Iconify icon="eva:search-fill" />
          </Fab>
        </m.div>

        <m.div variants={varFade().in}>
          <CircularProgress color="error" />
        </m.div>
      </StyledRow>

      {/* Row 2 */}
      <StyledRow>
        <m.div variants={varFade().in}>
          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            sx={{ borderBottom: (theme) => `solid 1px ${theme.palette.divider}` }}
          >
            {['Angular', 'React', 'Vue'].map((tab) => (
              <Tab
                key={tab}
                value={tab}
                label={tab}
                sx={{
                  '&:not(:last-of-type)': { mr: 3 },
                }}
              />
            ))}
          </Tabs>
        </m.div>

        <m.div variants={varFade().in}>
          <ToggleButtonGroup
            size="small"
            color="primary"
            value={alignment}
            exclusive
            onChange={(event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
              if (newAlignment !== null) {
                setAlignment(newAlignment);
              }
            }}
            aria-label="text alignment"
          >
            {['left', 'center', 'right'].map((alignment) => (
              <ToggleButton key={alignment} value={alignment} aria-label={`${alignment} aligned`}>
                <Iconify icon={`carbon:align-horizontal-${alignment}`} />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </m.div>

        <m.div variants={varFade().in}>
          <Chip
            color="warning"
            onDelete={() => {}}
            avatar={<CustomAvatar src={_mock.image.avatar(2)} />}
            label="Chip"
          />
        </m.div>
      </StyledRow>

      {/* Row 3 */}
      <StyledRow>
        <m.div variants={varFade().in}>
          <CustomAvatar
            src={_mock.image.avatar(19)}
            BadgeProps={{
              badgeContent: <BadgeStatus status="online" />,
            }}
          />
        </m.div>

        <m.div variants={varFade().in}>
          <CustomAvatarGroup>
            {[...Array(8)].map((_, index) => (
              <CustomAvatar key={index} src={_mock.image.avatar(index)} />
            ))}
          </CustomAvatarGroup>
        </m.div>

        {mounted && (
          <m.div variants={varFade().in}>
            <Rating
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </m.div>
        )}

        <m.div variants={varFade().in}>
          <Label variant="filled" color="error" startIcon={<Iconify icon="eva:email-fill" />}>
            Label
          </Label>
        </m.div>
      </StyledRow>

      {/* Row 4 */}
      <StyledRow
        sx={{
          flexWrap: { lg: 'nowrap' },
        }}
      >
        <m.div variants={varFade().in}>
          <Slider
            valueLabelDisplay="on"
            value={slider}
            onChange={(event: Event, newValue: number | number[]) => {
              setSlider(newValue as number);
            }}
            sx={{ maxWidth: 220 }}
          />
        </m.div>

        {mounted && (
          <m.div variants={varFade().in}>
            <Alert severity="success" onClose={() => {}}>
              <AlertTitle>Success</AlertTitle>
              This is a success alert — <strong>check it out!</strong>
            </Alert>
          </m.div>
        )}
      </StyledRow>

      {/* Row 5 */}
      {isMd && (
        <StyledRow>
          <m.div variants={varFade().in}>
            <Pagination count={10} />
          </m.div>

          <m.div variants={varFade().in}>
            <Button
              color="info"
              variant="contained"
              onClick={handleOpenPopover}
              startIcon={<Iconify icon="eva:menu-fill" />}
            >
              Menu
            </Button>
          </m.div>

          <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 160 }}>
            <Scrollbar sx={{ maxHeight: 160 }}>
              {[...Array(8)].map((_, index) => (
                <MenuItem key={index} onClick={handleClosePopover}>
                  Item {index + 1}
                </MenuItem>
              ))}
            </Scrollbar>
          </MenuPopover>
        </StyledRow>
      )}

      {/* Row 6 */}
      {isMd && (
        <StyledRow>
          <m.div variants={varFade().in}>
            <FormControlLabel control={<Switch defaultChecked />} label="Label" />
          </m.div>

          <m.div variants={varFade().in}>
            <FormControlLabel
              control={<Radio color="error" defaultChecked />}
              label="Radio Button"
            />
          </m.div>

          <m.div variants={varFade().in}>
            <FormControlLabel control={<Checkbox color="info" defaultChecked />} label="Checkbox" />
          </m.div>

          <m.div variants={varFade().in}>
            <FormControlLabel
              control={<Checkbox color="warning" indeterminate />}
              label="Checkbox"
            />
          </m.div>
        </StyledRow>
      )}

      {/* Row 7 */}
      {isLg && (
        <StyledRow sx={{ flexWrap: 'nowrap' }}>
          <m.div variants={varFade().in}>{cardPost}</m.div>

          <Stack spacing={3} sx={{ width: 1 }}>
            <m.div variants={varFade().in}>
              <TextField fullWidth label="Text Field" value="Value" />
            </m.div>

            <m.div variants={varFade().in}>
              <TextField
                select
                fullWidth
                label="Select"
                value={select}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSelect(event.target.value);
                }}
              >
                {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                      '&:first-of-type': { mt: 0 },
                      '&:last-of-type': { mb: 0 },
                    }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </m.div>

            <m.div variants={varFade().in}>
              <TextField fullWidth multiline rows={3} label="Textarea" />
            </m.div>
          </Stack>
        </StyledRow>
      )}
    </StyledContent>
  );
}

// ----------------------------------------------------------------------

const ViewAllButton = (
  <m.div variants={varFade().inUp}>
    <Button
      size="large"
      color="inherit"
      variant="outlined"
      target="_blank"
      rel="noopener"
      href={PATH_PAGE.components}
      endIcon={<Iconify icon="ic:round-arrow-right-alt" />}
    >
      View All Components
    </Button>
  </m.div>
);

// ----------------------------------------------------------------------

const cardPost = (
  <Paper
    sx={{
      width: 320,
      borderRadius: 2,
      boxShadow: (theme) => theme.customShadows.z24,
    }}
  >
    <CardHeader
      title="Jayvion Simon"
      subheader="California, United States"
      avatar={
        <CustomAvatar
          src={_mock.image.avatar(0)}
          BadgeProps={{
            badgeContent: <BadgeStatus status="online" />,
          }}
          sx={{ width: 48, height: 48 }}
        />
      }
      titleTypographyProps={{ typography: 'subtitle2', sx: { mb: 0.25 } }}
      subheaderTypographyProps={{ typography: 'caption' }}
      sx={{ p: 2 }}
    />
    <Image alt="cover" src={_mock.image.cover(12)} ratio="16/9" />

    <Typography variant="body2" sx={{ color: 'text.secondary', pt: 2, px: 2 }}>
      Phasellus dolor. Fusce egestas elit eget lorem. Quisque id odio.
    </Typography>

    <Stack direction="row" sx={{ px: 2, py: 1 }}>
      <Checkbox
        defaultChecked
        color="error"
        size="small"
        icon={<Iconify icon="eva:heart-fill" />}
        checkedIcon={<Iconify icon="eva:heart-fill" />}
      />

      <Box sx={{ flexGrow: 1 }} />

      <IconButton>
        <Iconify icon="eva:share-outline" />
      </IconButton>

      <IconButton>
        <Iconify icon="eva:message-circle-fill" />
      </IconButton>
    </Stack>
  </Paper>
);
