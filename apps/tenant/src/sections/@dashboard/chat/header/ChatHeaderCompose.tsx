import { useState } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Chip,
  Stack,
  Avatar,
  TextField,
  Typography,
  StackProps,
  Autocomplete,
} from '@mui/material';
// @types
import { IChatParticipant } from '../../../../@types/chat';
// components
import Iconify from '../../../../components/iconify';
import SearchNotFound from '../../../../components/search-not-found';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  contacts: IChatParticipant[];
  recipients: IChatParticipant[];
  onAddRecipients: (data: IChatParticipant[]) => void;
}

export default function ChatHeaderCompose({
  contacts,
  recipients,
  onAddRecipients,
  sx,
  ...other
}: Props) {
  const [searchRecipients, setSearchRecipients] = useState('');

  const handleAddRecipients = (recipients: IChatParticipant[]) => {
    setSearchRecipients('');
    onAddRecipients(recipients);
  };

  return (
    <Stack
      spacing={1}
      direction="row"
      alignItems="center"
      sx={{
        py: 2,
        px: 2.5,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        To:
      </Typography>

      <Autocomplete
        sx={{ minWidth: 240 }}
        multiple
        popupIcon={null}
        noOptionsText={<SearchNotFound query={searchRecipients} />}
        onChange={(event, value) => handleAddRecipients(value)}
        onInputChange={(event, value) => setSearchRecipients(value)}
        options={contacts}
        getOptionLabel={(recipient) => recipient.name}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            placeholder={recipients.length ? '+Recipients' : ''}
          />
        )}
        renderOption={(props, recipient, { inputValue, selected }) => {
          const { name, avatar } = recipient;
          const matches = match(name, inputValue);
          const parts = parse(name, matches);

          return (
            <Box
              component="li"
              sx={{
                p: '12px !important',
              }}
              {...props}
            >
              <Box
                sx={{
                  mr: 1.5,
                  width: 32,
                  height: 32,
                  overflow: 'hidden',
                  borderRadius: '50%',
                  position: 'relative',
                }}
              >
                <Avatar alt={name} src={avatar} />
                <Box
                  sx={{
                    top: 0,
                    opacity: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                    transition: (theme) =>
                      theme.transitions.create('opacity', {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.shorter,
                      }),
                    ...(selected && {
                      opacity: 1,
                      color: 'primary.main',
                    }),
                  }}
                >
                  <Iconify icon="eva:checkmark-fill" />
                </Box>
              </Box>

              {parts.map((part, index) => (
                <Typography
                  key={index}
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </Box>
          );
        }}
        renderTags={(recipients, getTagProps) =>
          recipients.map((recipient, index) => (
            <Chip
              {...getTagProps({ index })}
              key={recipient.id}
              size="small"
              label={recipient.name}
              avatar={<Avatar alt={recipient.name} src={recipient.avatar} />}
            />
          ))
        }
      />
    </Stack>
  );
}
