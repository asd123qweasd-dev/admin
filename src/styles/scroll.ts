import { css } from "@emotion/react";

export const scroll = css`
  ::-webkit-scrollbar{
    width: 5px;
    height: 9px;
    transition: background .3s;
  }

  ::-webkit-scrollbar-button{
    width: 0px;
    height: 0px;}

  ::-webkit-scrollbar-thumb{
    background: #979899;
    border: 9px none #979899;
    transition: background .3s;
    cursor: pointer;
    border-radius: 50px;}

  ::-webkit-scrollbar-thumb:hover{
    background: darken(#979899, 20%);
  }

  ::-webkit-scrollbar-thumb:active{
    background: darken(#979899, 20%);
  }

  ::-webkit-scrollbar-track{
    transition: background .3s;
    background: #F5F5F7;
    border: 0px none #979899;
    // border-radius 50px;
  }

  ::-webkit-scrollbar-track:hover{
    background: #F5F5F7;
    }

  ::-webkit-scrollbar-track:active{
    background: #F5F5F7;
  }

  ::-webkit-scrollbar-corner{
    background: transparent;
  }
`
