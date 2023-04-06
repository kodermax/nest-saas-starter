import { useState, useEffect } from 'react';
// next
import Head from 'next/head';
// @mui
import { Box, Checkbox, Container, TextField, Typography, Autocomplete } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { Block } from '../../../sections/_examples/Block';
//
import { countries } from '../../../assets/data';

// ----------------------------------------------------------------------

MUIAutocompletePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

const options = ['Option 1', 'Option 2'];

function countryToFlag(isoCode: string) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

export default function MUIAutocompletePage() {
  const [value, setValue] = useState<string | null>(options[0]);

  const [inputValue, setInputValue] = useState('');

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title> MUI Components: Autocomplete | Minimal UI</title>
      </Head>

      <Box
        sx={{
          pt: 6,
          pb: 1,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
        }}
      >
        <Container>
          <CustomBreadcrumbs
            heading="Autocomplete"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Autocomplete' },
            ]}
            moreLink={['https://mui.com/components/autocomplete']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
          <Block title="Combo box">
            <Autocomplete
              fullWidth
              options={top100Films}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label="Combo box" margin="none" />}
            />
          </Block>

          <Block title="Country Select">
            <Autocomplete
              fullWidth
              autoHighlight
              options={countries}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box component="li" {...props} sx={{ px: '8px !important' }}>
                  <Box component="span" sx={{ flexShrink: 0, mr: 2, fontSize: 22 }}>
                    {countryToFlag(option.code)}
                  </Box>
                  {option.label} ({option.code}) +{option.phone}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a country"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  }}
                />
              )}
            />
          </Block>

          <Block title=" Controllable states" sx={{ flexDirection: 'column' }}>
            <>
              <Autocomplete
                fullWidth
                value={value}
                options={options}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Controllable" />}
              />

              <Typography variant="body2" sx={{ mt: 2 }}>{`value: ${
                value !== null ? `'${value}'` : 'null'
              }`}</Typography>

              <Typography variant="body2">{`inputValue: '${inputValue}'`}</Typography>
            </>
          </Block>

          <Block title="Free solo">
            <Autocomplete
              fullWidth
              freeSolo
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => <TextField {...params} label="freeSolo" />}
              sx={{ mb: 2 }}
            />

            <Autocomplete
              fullWidth
              freeSolo
              disableClearable
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />
          </Block>

          <Block title="Multiple Values">
            <Autocomplete
              multiple
              fullWidth
              options={top100Films}
              getOptionLabel={(option) => option.title}
              defaultValue={[top100Films[13]]}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="filterSelectedOptions" placeholder="Favorites" />
              )}
            />
          </Block>

          <Block title="Checkboxes">
            <Autocomplete
              fullWidth
              multiple
              options={top100Films}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox checked={selected} />
                  {option.title}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Checkboxes" placeholder="Favorites" />
              )}
            />
          </Block>

          <Block title="Sizes">
            <>
              <Autocomplete
                fullWidth
                options={top100Films}
                getOptionLabel={(option) => option.title}
                defaultValue={top100Films[13]}
                renderInput={(params) => (
                  <TextField {...params} label="Size Medium" placeholder="Favorites" />
                )}
              />

              <br />

              <Autocomplete
                fullWidth
                multiple
                size="small"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                defaultValue={[top100Films[13]]}
                renderInput={(params) => (
                  <TextField {...params} label="Size small" placeholder="Favorites" />
                )}
              />
            </>
          </Block>
        </Masonry>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

export const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];
