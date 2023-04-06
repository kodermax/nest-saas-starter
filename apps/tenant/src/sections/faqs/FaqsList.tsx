// @mui
import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
// _mock_
import { _faqs } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function FaqsList() {
  return (
    <div>
      {_faqs.map((accordion) => (
        <Accordion key={accordion.id}>
          <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
            <Typography variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>{accordion.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
