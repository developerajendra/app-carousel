import styled from 'styled-components';

export const CarouselStyle = styled.section` 
    font-size: 1em;
    margin: 1em;
    border-radius: 3px;
    width: ${props=> props.witdh + 'px'}
    position: relative;
    overflow: hidden;
    margin: auto;
    padding: 20px 0;
    min-height: 255px;
`;

export const AnimateSlider = styled.ul`   
  transition: all ease-in-out .3s;
    display: flex;
    position: absolute;
    left:0
    width: 919px;
    padding: 0;
    transform:${props=>  `translateX(-${props.next}px)`}
  `;