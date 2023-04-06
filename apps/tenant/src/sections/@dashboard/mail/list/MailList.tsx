// @mui
import { Stack, LinearProgress } from '@mui/material';
// components
import Scrollbar from '../../../../components/scrollbar';
import EmptyContent from '../../../../components/empty-content';
// @types
import { IMailListState, IMailLabel } from '../../../../@types/mail';
//
import MailItem from './MailItem';

// ----------------------------------------------------------------------

type Props = {
  dense: boolean;
  mails: IMailListState;
  labels: IMailLabel[];
  onSelectMail: (id: string) => void;
  onDeselectMail: (id: string) => void;
  selectedMails: (id: string) => boolean;
  isLoading: boolean;
  isEmpty: boolean;
};

export default function MailList({
  mails,
  labels,
  dense,
  onSelectMail,
  onDeselectMail,
  selectedMails,
  isLoading,
  isEmpty,
}: Props) {
  const { allIds, byId } = mails;

  return (
    <Stack
      sx={{
        position: 'relative',
        height: `calc(100% - 80px)`,
      }}
    >
      {isLoading && (
        <LinearProgress
          color="inherit"
          sx={{
            top: 0,
            width: 1,
            position: 'absolute',
          }}
        />
      )}

      {isEmpty ? (
        <EmptyContent
          title="There is no conversation"
          img="/assets/illustrations/illustration_empty_mail.svg"
        />
      ) : (
        <Scrollbar sx={{ height: 1 }}>
          <Stack
            sx={{
              minWidth: {
                md: 960,
              },
            }}
          >
            {allIds.map((mailId) => (
              <MailItem
                key={mailId}
                dense={dense}
                mail={byId[mailId]}
                selected={selectedMails(mailId)}
                onSelect={() => onSelectMail(mailId)}
                onDeselect={() => onDeselectMail(mailId)}
                getLabel={(labelId: string) => labels.filter((label) => label.id === labelId)[0]}
              />
            ))}
          </Stack>
        </Scrollbar>
      )}
    </Stack>
  );
}
