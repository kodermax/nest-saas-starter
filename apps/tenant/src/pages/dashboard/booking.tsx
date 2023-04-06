// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// _mock_
import { _bookings, _bookingNew, _bookingsOverview, _bookingReview } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  BookingDetails,
  BookingBookedRoom,
  BookingTotalIncomes,
  BookingRoomAvailable,
  BookingNewestBooking,
  BookingWidgetSummary,
  BookingCheckInWidgets,
  BookingCustomerReviews,
  BookingReservationStats,
} from '../../sections/@dashboard/general/booking';
// assets
import {
  BookingIllustration,
  CheckInIllustration,
  CheckOutIllustration,
} from '../../assets/illustrations';

// ----------------------------------------------------------------------

GeneralBookingPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------
export default function GeneralBookingPage() {
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> General: Booking | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title="Total Booking"
              total={714000}
              icon={<BookingIllustration />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary title="Check In" total={311000} icon={<CheckInIllustration />} />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title="Check Out"
              total={124000}
              icon={<CheckOutIllustration />}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <BookingTotalIncomes
                  total={18765}
                  percent={2.6}
                  chart={{
                    series: [111, 136, 76, 108, 74, 54, 57, 84],
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <BookingBookedRoom title="Booked Room" data={_bookingsOverview} />
              </Grid>

              <Grid item xs={12} md={12}>
                <BookingCheckInWidgets
                  chart={{
                    colors: [theme.palette.warning.main],
                    series: [
                      { label: 'Check In', percent: 72, total: 38566 },
                      { label: 'Check Out', percent: 64, total: 18472 },
                    ],
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingRoomAvailable
              title="Room Available"
              chart={{
                series: [
                  { label: 'Sold out', value: 120 },
                  { label: 'Available', value: 66 },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <BookingReservationStats
              title="Reservation Stats"
              subheader="(+43% Check In | +12% Check Out) than last year"
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                series: [
                  {
                    type: 'Week',
                    data: [
                      { name: 'Check In', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
                      { name: 'Check Out', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                    ],
                  },
                  {
                    type: 'Month',
                    data: [
                      { name: 'Check In', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                      { name: 'Check Out', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                    ],
                  },
                  {
                    type: 'Year',
                    data: [
                      { name: 'Check In', data: [76, 42, 29, 41, 27, 138, 117, 86, 63] },
                      { name: 'Check Out', data: [80, 55, 34, 114, 80, 130, 15, 28, 55] },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingCustomerReviews
              title="Customer Reviews"
              subheader={`${_bookingReview.length} Reviews`}
              list={_bookingReview}
            />
          </Grid>

          <Grid item xs={12}>
            <BookingNewestBooking
              title="Newest Booking"
              subheader="12 Booking"
              list={_bookingNew}
            />
          </Grid>

          <Grid item xs={12}>
            <BookingDetails
              title="Booking Details"
              tableData={_bookings}
              tableLabels={[
                { id: 'booker', label: 'Booker' },
                { id: 'checkIn', label: 'Check In' },
                { id: 'checkOut', label: 'Check Out' },
                { id: 'status', label: 'Status' },
                { id: 'phone', label: 'Phone' },
                { id: 'roomType', label: 'Room Type' },
                { id: '' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
