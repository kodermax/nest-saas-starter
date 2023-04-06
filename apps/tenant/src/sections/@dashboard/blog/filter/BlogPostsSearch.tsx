import { useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// next
import { useRouter } from 'next/router';
// @mui
import { Link, Typography, Autocomplete, InputAdornment } from '@mui/material';
// utils
import axios from '../../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// @types
import { IBlogPost } from '../../../../@types/blog';
// components
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';
import { CustomTextField } from '../../../../components/custom-input';
import SearchNotFound from '../../../../components/search-not-found';

// ----------------------------------------------------------------------

export default function BlogPostsSearch() {
  const { push } = useRouter();

  const [searchPosts, setSearchPosts] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const handleSearchPosts = async (value: string) => {
    try {
      setSearchPosts(value);
      if (value) {
        const response = await axios.get('/api/blog/posts/search', {
          params: { query: value },
        });

        setSearchResults(response.data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (title: string) => {
    push(PATH_DASHBOARD.blog.view(paramCase(title)));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick(searchPosts);
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      options={searchResults}
      onInputChange={(event, value) => handleSearchPosts(value)}
      getOptionLabel={(post: IBlogPost) => post.title}
      noOptionsText={<SearchNotFound query={searchPosts} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      componentsProps={{
        popper: {
          sx: {
            width: `280px !important`,
          },
        },
        paper: {
          sx: {
            '& .MuiAutocomplete-option': {
              px: `8px !important`,
            },
          },
        },
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          width={220}
          placeholder="Search..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, post, { inputValue }) => {
        const { title, cover } = post;
        const matches = match(title, inputValue);
        const parts = parse(title, matches);

        return (
          <li {...props}>
            <Image
              alt={cover}
              src={cover}
              sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
            />

            <Link underline="none" onClick={() => handleClick(title)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}
