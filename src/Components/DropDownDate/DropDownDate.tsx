import React, {FC, useRef, useState} from 'react';
import styled from "styled-components";
import useOnClickOutside from "../../hooks/useOutsideClick";

type position = 'left'|'right'
export interface DropDownMenuProps {
    position?:position;
    children?:React.ReactElement;
    value?:string|React.ReactElement;
    width?:string
}

const DropDownDate: FC<DropDownMenuProps> = (props) => {
    const field = useRef(null)
    const [isActive,setActive] = useState(false)
    useOnClickOutside(field, ()=>setActive(false))
    return (
        <DropDownContainer width={props.width} ref={field}>
            <DropDownContent isActive={isActive} onClick={()=>setActive(!isActive)}>
                {props.value}
            </DropDownContent>
            {isActive && <DropDown position={props.position} >{props.children}</DropDown>}
        </DropDownContainer>
    );
};

export default DropDownDate;

const DropDownContent = styled.div<{isActive:boolean}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 38px;
  font-size: 14px;
  cursor: pointer;
  padding: 0 10px;
  border-bottom:${props => props.isActive?'2px solid blue':'2px solid transparent'}
  :before{
    content: '';
    position: absolute;
    z-index: 2;
    display: ${props => props.isActive ? 'block':'none'};
    top: 21px;
    left: 50%;
    transform: translateX(-50% );
    border: 15px solid transparent;
    border-bottom: 15px solid #fff; 
  }
`

const DropDownContainer = styled.div<{width?:string}>`
  position: relative;
  width: ${props => props.width ||'100%'};
`

const DropDown = styled.div<{position:string}>`
    z-index: 1;
    position: absolute;
    color:black;
    right: ${props=>props.position==='left'?'':'0%'};
    top: 50px;
    width: 400px;
    -webkit-box-shadow: 1px 0px 28px 1px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 1px 0px 28px 1px rgba(34, 60, 80, 0.2);
    box-shadow: 1px 0px 28px 1px rgba(34, 60, 80, 0.2);
    border: 1px solid;
    border-color: #d0d3d9;
    border-top-color: #d9dce0;
    border-bottom-color: #aaafba;
`