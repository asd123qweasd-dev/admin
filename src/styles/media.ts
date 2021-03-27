
export const media = {
  touch: '@media (hover: none) and (pointer: coarse)',
  mobile: '@media (max-width: 599px)',
  mobile__portrait: '@media (hover: none) and (pointer: coarse) and (orientation: portrait) and (max-width: 599px) and (max-height: 900px)',
  mobile__landscape: '@media (hover: none) and (pointer: coarse) and (orientation: landscape) and (max-width: 900px) and (max-height: 599px) ',

  tablet: '@media (min-width: 768px)',
  tablet__portrait: '@media (hover: none) and (pointer: coarse) and (orientation: portrait) and (min-width: 600px) and (max-width: 1024px) and (min-height: 900px) and (max-height: 1366px)',
  tablet__landscape: '@media (hover: none) and (pointer: coarse) and (orientation: landscape) and (min-width: 900px) and (max-width: 1366px) and (min-height: 600px) and (max-height: 1024px)',

  desktop: '@media (min-width: 1366px)',
  desktop__wide: '@media (min-width: 1600px)',
  desktop__long: '@media (min-width: 2400px)'
}
