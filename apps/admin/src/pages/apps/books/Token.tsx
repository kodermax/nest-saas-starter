import { styled } from '@mui/material'
import { ForwardedRef, ReactNode, forwardRef, useImperativeHandle, useState } from 'react'

interface TokenProps {
  highlight?: boolean
}

export interface TokenAdvancedRef {
  setHightLightItem: () => void
  unsetHightLightItem: () => void
  getMatches: () => string
}
const StyledSpan = styled('span', {
  shouldForwardProp: prop => prop !== 'highlight'
})<TokenProps>(({ highlight }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#008c1a',
    color: 'white',
    borderRadius: 3
  },
  ...(highlight && {
    backgroundColor: '#008c1a',
    color: 'white',
    borderRadius: 3
  })
}))

interface Props {
  id: string
  matches: string
  children: ReactNode
  onMouseEnter: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  onMouseLeave: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  word?: string
}

const Token = (props: Props, ref: ForwardedRef<TokenAdvancedRef>) => {
  const [highlight, setHighLight] = useState<boolean>(false)

  useImperativeHandle<TokenAdvancedRef, TokenAdvancedRef>(
    ref,
    () => ({
      setHightLightItem: () => {
        setHighLight(true)
      },
      unsetHightLightItem: () => {
        setHighLight(false)
      },
      getMatches: () => {
        return props.matches
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <StyledSpan
      id={`word${props.id}`}
      data-word={props.word}
      data-matches={props.matches}
      highlight={highlight}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </StyledSpan>
  )
}

export default forwardRef<TokenAdvancedRef, Props>(Token)
