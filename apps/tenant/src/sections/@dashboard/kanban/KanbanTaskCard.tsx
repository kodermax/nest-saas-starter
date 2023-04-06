import { useState, ChangeEvent } from 'react';
import { Draggable } from 'react-beautiful-dnd';
// @mui
import { Paper, Typography, Box, Checkbox } from '@mui/material';
// @types
import { IKanbanCard } from '../../../@types/kanban';
// components
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
//
import KanbanDetails from './details/KanbanDetails';

// ----------------------------------------------------------------------

type Props = {
  index: number;
  card: IKanbanCard;
  onDeleteTask: (id: string) => void;
};

export default function KanbanTaskCard({ card, onDeleteTask, index }: Props) {
  const { name, attachments } = card;

  const [completed, setCompleted] = useState(card.completed);

  const [openDetails, setOpenDetails] = useState(false);

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleChangeComplete = (event: ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <Paper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            sx={{
              width: 1,
              borderRadius: 1,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: (theme) => theme.customShadows.z1,
              '&:hover': {
                boxShadow: (theme) => theme.customShadows.z20,
              },
            }}
          >
            <Box onClick={handleOpenDetails} sx={{ cursor: 'pointer' }}>
              {!!attachments.length && (
                <Image
                  disabledEffect
                  alt={attachments[0]}
                  src={attachments[0]}
                  ratio="4/3"
                  sx={{
                    transition: (theme) =>
                      theme.transitions.create('opacity', {
                        duration: theme.transitions.duration.shortest,
                      }),
                    ...(completed && {
                      opacity: 0.48,
                    }),
                  }}
                />
              )}

              <Typography
                noWrap
                variant="subtitle2"
                sx={{
                  pr: 1,
                  pl: 6,
                  height: 72,
                  lineHeight: '72px',
                  transition: (theme) =>
                    theme.transitions.create('opacity', {
                      duration: theme.transitions.duration.shortest,
                    }),
                  ...(completed && {
                    opacity: 0.48,
                  }),
                }}
              >
                {name}
              </Typography>
            </Box>

            <Checkbox
              disableRipple
              checked={completed}
              icon={<Iconify icon="eva:radio-button-off-outline" />}
              checkedIcon={<Iconify icon="eva:checkmark-circle-2-outline" />}
              onChange={handleChangeComplete}
              sx={{ position: 'absolute', bottom: 16, left: 8 }}
            />
          </Paper>
        )}
      </Draggable>

      <KanbanDetails
        task={card}
        openDetails={openDetails}
        onCloseDetails={handleCloseDetails}
        onDeleteTask={() => onDeleteTask(card.id)}
      />
    </>
  );
}
