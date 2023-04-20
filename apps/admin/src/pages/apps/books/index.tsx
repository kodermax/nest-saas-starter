import React, { useRef } from 'react'
import data from './page.json'
import Grid from '@mui/material/Unstable_Grid2'
import { Paper, styled } from '@mui/material'
import Token, { TokenAdvancedRef } from './Token'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minHeight: 50,
  margin: 15
}))

const Books = () => {
  const refs = useRef<{ [id: string]: TokenAdvancedRef | null }>({})

  const handleMouseEnter = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const matches = event.currentTarget.getAttribute('data-matches')
    if (matches) {
      const highlightIds = matches.split(',')
      for (const id of highlightIds) {
        refs.current[id]!.setHightLightItem()
        const otherMatches = refs.current[id]!.getMatches()
        if (otherMatches) {
          for (const id of otherMatches) {
            refs.current[id]!.setHightLightItem()
          }
        }
      }
    }
  }
  const handleMouseLeave = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const matches = event.currentTarget.getAttribute('data-matches')
    if (matches) {
      const highlightIds = matches.split(',')
      for (const id of highlightIds) {
        refs.current[id]!.unsetHightLightItem()
        const otherMatches = refs.current[id]!.getMatches()
        if (otherMatches) {
          for (const id of otherMatches) {
            refs.current[id]!.unsetHightLightItem()
          }
        }
      }
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={6}>
        {data.map((paragraph: any) => {
          return (
            <Item key={paragraph.id}>
              {paragraph.sentences.map((sentence: any) => {
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
          )
        })}
      </Grid>
      <Grid xs={6}>
        {data.map((paragraph: any) => {
          return (
            <Item key={paragraph.id}>
              {paragraph.tokens_ru.map((token: any) => {
                return (
                  <Token
                    id={token.id}
                    key={token.id}
                    matches={token.matches}
                    ref={el => (refs.current[token.id] = el)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {token.text + token.after}
                  </Token>
                )
              })}
            </Item>
          )
        })}
      </Grid>
    </Grid>
  )
}
Books.acl = {
  action: 'manage',
  subject: 'all'
}
export default Books
