// @mui
import { Avatar, Chip, Stack, Paper } from '@mui/material';
// _mock
import _mock from '../../../_mock';
// components
import Iconify from '../../../components/iconify';
//
import { Label } from '../Block';

// ----------------------------------------------------------------------

const style = {
  p: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' },
} as const;

// ----------------------------------------------------------------------

type Props = {
  variant?: 'filled' | 'outlined' | 'soft';
};

export default function Chips({ variant = 'filled' }: Props) {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Stack spacing={3}>
      <Paper variant="outlined" sx={style}>
        <Chip
          variant={variant}
          label="Default deletable"
          avatar={<Avatar>M</Avatar>}
          onDelete={handleDelete}
        />

        <Chip variant={variant} clickable label="Default clickable" avatar={<Avatar>M</Avatar>} />

        <Chip
          variant={variant}
          label="Primary deletable"
          avatar={<Avatar alt="Natacha" src={_mock.image.avatar(1)} />}
          color="primary"
          onDelete={handleDelete}
        />

        <Chip
          variant={variant}
          clickable
          label="Primary clickable"
          avatar={<Avatar alt="Natacha" src={_mock.image.avatar(1)} />}
          color="primary"
        />

        <Chip
          variant={variant}
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Secondary deletable"
          onDelete={handleDelete}
          color="secondary"
        />

        <Chip
          variant={variant}
          clickable
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Secondary clickable"
          color="secondary"
        />

        <Chip
          variant={variant}
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Info deletable"
          onDelete={handleDelete}
          color="info"
        />

        <Chip
          variant={variant}
          clickable
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Info clickable"
          color="info"
        />

        <Chip
          variant={variant}
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Success deletable"
          onDelete={handleDelete}
          color="success"
        />

        <Chip
          variant={variant}
          clickable
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Success clickable"
          color="success"
        />

        <Chip
          variant={variant}
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Warning deletable"
          onDelete={handleDelete}
          color="warning"
        />

        <Chip
          variant={variant}
          clickable
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Warning clickable"
          color="warning"
        />

        <Chip
          variant={variant}
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Error deletable"
          onDelete={handleDelete}
          color="error"
        />

        <Chip
          clickable
          variant={variant}
          icon={<Iconify width={24} icon="eva:smiling-face-fill" />}
          label="Error clickable"
          color="error"
        />
      </Paper>

      <div>
        <Label title="Custom icon" />

        <Paper variant="outlined" sx={style}>
          <Chip
            variant={variant}
            avatar={<Avatar>M</Avatar>}
            label="Custom icon"
            onDelete={handleDelete}
            deleteIcon={<Iconify width={24} icon="eva:checkmark-fill" />}
          />

          <Chip
            variant={variant}
            avatar={<Avatar>M</Avatar>}
            label="Custom icon"
            onDelete={handleDelete}
            deleteIcon={<Iconify width={24} icon="eva:checkmark-fill" />}
            color="info"
          />
        </Paper>
      </div>

      <div>
        <Label title="Disabled" />

        <Paper variant="outlined" sx={style}>
          <Chip
            disabled
            variant={variant}
            avatar={<Avatar>M</Avatar>}
            label="Disabled"
            onDelete={handleDelete}
          />

          <Chip
            disabled
            variant={variant}
            avatar={<Avatar>M</Avatar>}
            label="Disabled"
            onDelete={handleDelete}
            color="info"
          />
        </Paper>
      </div>

      <div>
        <Label title="Size" />

        <Paper variant="outlined" sx={style}>
          <Chip
            variant={variant}
            avatar={<Avatar>M</Avatar>}
            label="Normal"
            onDelete={handleDelete}
            color="info"
          />

          <Chip
            variant={variant}
            size="small"
            avatar={<Avatar>M</Avatar>}
            label="Small"
            onDelete={handleDelete}
            color="info"
          />
        </Paper>
      </div>
    </Stack>
  );
}
