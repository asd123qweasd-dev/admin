import { css, Global } from '@emotion/react'
import { media, scroll } from '~/styles'
import { svgSprite } from './svg-sprite'

const styles = css`
  * {
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    font-weight: normal;
  }

  html {
    margin: 0;
    padding: 0;
    font-size: 10px;
    /* overflow-x: hidden; */
    
    ${media.touch} {
      /* font-size: calc((100vw / 400) * 10) */
    }

    ${media.mobile__portrait} {
      font-size: calc((100vw / 400) * 10)
    }

    ${media.mobile__landscape} {
      font-size: calc((100vw / 730) * 10);

      ${media.tablet} {
        font-size: calc((100vw / 1100) * 10);
      }
    }

    ${media.tablet__portrait} {
      font-size: calc((100vw / 896) * 10);
    }

    ${media.tablet__landscape} {
      font-size: calc((100vw / 1108) * 10);
    }

    @media (min-width: 1920px) {
      font-size: calc((100vw / 1920) * 10);
    }

    @media (min-width: 1920px) and (min-aspect-ratio: 20/9) {
      font-size: 10px;
    }
  }

  body{
    font-size: 1.6rem;
    font-family: 'Inter', sans-serif;
    /* overflow-x: hidden; */
  }
  
  ${scroll}
  ${svgSprite}
`
export const globalStyles = () => {
  return <Global styles={styles} />
}
