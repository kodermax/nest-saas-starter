// @mui
import {
  Card,
  Stack,
  Divider,
  Checkbox,
  MenuItem,
  CardProps,
  CardHeader,
  IconButton,
  CheckboxProps,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import { useState } from 'react';

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  label: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: ItemProps[];
}

export default function AnalyticsTasks({ title, subheader, list, ...other }: Props) {
  const [selected, setSelected] = useState(['2']);

  const handleClickComplete = (taskId: string) => {
    const tasksCompleted = selected.includes(taskId)
      ? selected.filter((value) => value !== taskId)
      : [...selected, taskId];

    setSelected(tasksCompleted);
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      {list.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          checked={selected.includes(task.id)}
          onChange={() => handleClickComplete(task.id)}
        />
      ))}
    </Card>
  );
}

// ----------------------------------------------------------------------

interface TaskItemProps extends CheckboxProps {
  task: ItemProps;
}

function TaskItem({ task, checked, onChange }: TaskItemProps) {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleMarkComplete = () => {
    handleClosePopover();
    console.log('MARK COMPLETE', task.id);
  };

  const handleShare = () => {
    handleClosePopover();
    console.log('SHARE', task.id);
  };

  const handleEdit = () => {
    handleClosePopover();
    console.log('EDIT', task.id);
  };

  const handleDelete = () => {
    handleClosePopover();
    console.log('DELETE', task.id);
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          px: 2,
          py: 0.75,
          ...(checked && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={onChange} />}
          label={task.label}
          sx={{ flexGrow: 1, m: 0 }}
        />

        <IconButton
          size="large"
          color={openPopover ? 'inherit' : 'default'}
          onClick={handleOpenPopover}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top">
        <MenuItem onClick={handleMarkComplete}>
          <Iconify icon="eva:checkmark-circle-2-fill" />
          Mark Complete
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="eva:share-fill" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}
