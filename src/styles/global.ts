import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import './swiper.css'

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  * {
    box-sizing: border-box;
  }
  :root {
    --primary-color: #FF9C30;
    --primary-color-100: #FFECD6;
    --primary-color-200: #FFC078;
    --primary-color-300: #FFA94D;
    --swiper-theme-color: white;
    --gray-900: #212529;
    --gray-600: #868E96;
    --gray-700: #3E4145;
    --gray-800: #212529;
    --gray-500: #838485;
    --gray-400: #B0B0B0;
    --gray-250: #CED4DA;
    --error-color: #FF3257;
  }
  .App {
    width: 100%;
    // max-width: 1920px;
    margin: 0 auto;
  }
  .noScroll {
    height: 100%;
    overflow: hidden;
  }
  .popup {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
`

export default GlobalStyle
