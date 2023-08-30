import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Router from './Router';
import { ReactQueryDevtools } from "react-query/devtools";
import { lightTheme, darkTheme } from './theme';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@10..48,300;10..48,400;10..48,600&family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,300;1,400;1,500;1,600;1,700&display=swap');

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
*{
  box-sizing: border-box;
}
body {
  line-height: 1;
  font-family: 'Bricolage Grotesque', sans-serif;
  background-color: ${(props)=>props.theme.bgColor};
  color:${(props)=>props.theme.textColor};
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a{
  text-decoration: none;
  color:inherit;
}
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
 
  return(<> 
   <ThemeProvider theme={isDark? lightTheme: darkTheme}>
    
    <GlobalStyle />
    <Router />
    < ReactQueryDevtools initialIsOpen={false} / >
  </ThemeProvider>
  </>
  );
}

export default App;
