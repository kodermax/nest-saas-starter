import React, { useRef } from 'react'
import data from './page.json'
import Grid from '@mui/material/Unstable_Grid2'
import { Paper, styled } from '@mui/material'
import Token, { TokenAdvancedRef } from './Token'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minHeight: 200,
  '& .highlight': {
    backgroundColor: '#008c1a',
    color: 'white',
    borderRadius: 3
  }
}))

const Books = () => {
  const refs = useRef<[TokenAdvancedRef | null]>([null])
  const trRefs = useRef<[TokenAdvancedRef | null]>([null])

  const handleMouseEnter = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const matches = event.currentTarget.getAttribute('data-matches')
    const hasWord = !!event.currentTarget.getAttribute('data-word')
    if (matches) {
      const highlightIds = matches.split(',')
      for (const id of highlightIds) {
        hasWord ? trRefs.current[id].setHightLightItem() : refs.current[id].setHightLightItem()
      }
    }
  }
  const handleMouseLeave = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const matches = event.currentTarget.getAttribute('data-matches')
    const hasWord = !!event.currentTarget.getAttribute('data-word')
    if (matches) {
      const highlightIds = matches.split(',')
      for (const id of highlightIds) {
        hasWord ? trRefs.current[id].setHightLightItem() : refs.current[id].setHightLightItem()
      }
    }
  }

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid xs={6}>
        <Item>
          {data.sentences.map((sentence: any) => {
            return sentence.pieces.map((piece: any) => {
              return piece.tokens.map((token: any) => {
                return (
                  <Token
                    key={token.id}
                    id={token.id}
                    matches={token.matches}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    word={token.text}
                    ref={el => (refs.current[token.id] = el)}
                  >
                    {token.text + token.after}
                  </Token>
                )
              })
            })
          })}
        </Item>
      </Grid>
      <Grid xs={6}>
        <Item id={'tr0'}>
          {data.tokens_ru.map((token: any) => {
            return (
              <Token
                id={token.id}
                key={token.id}
                matches={token.matches}
                ref={el => (trRefs.current[token.id] = el)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {token.text + token.after}
              </Token>
            )
          })}
        </Item>
      </Grid>
    </Grid>
  )
}
Books.acl = {
  action: 'manage',
  subject: 'all'
}
export default Books
