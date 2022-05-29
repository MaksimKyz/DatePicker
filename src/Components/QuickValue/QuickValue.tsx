import React, {FC} from 'react';
import styled from "styled-components";

export interface QuickValueProps {
    text:string
    deleteQuick:()=>void;
}

const QuickValue: FC<QuickValueProps> = ({text,deleteQuick}) => {


    const deleteHandler = () =>{
        deleteQuick()
    }
    return (
            <>
                {!!text &&
                    <QuickContainer onClick={deleteHandler}>
                        {text}
                        <Show>Show dates</Show>
                    </QuickContainer>
                }
            </>
    );
};

export default QuickValue;

const Show = styled.div`
  color: #006BB4;
`

const QuickContainer = styled.div`
  cursor: pointer;
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  &:hover{
    ${Show}{
      text-decoration: underline;
    }
  }
`