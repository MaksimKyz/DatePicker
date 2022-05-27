import React, {FC, useState} from 'react';
import styled from "styled-components";

export interface TabsProps {
    children?:React.ReactElement[];
    activeTab?:number;
    changeActiveTab?:(e:number)=>void
}

const Tabs: FC<TabsProps> = (props) => {
    return (
        <>
            <TabsList>
                {props.children.map((child,index)=>(
                    <TabsListItem
                        isActive={index===props.activeTab}
                        key={child.props.tittle}
                        onClick={()=>props.changeActiveTab(index)}
                    >
                        {child.props.tittle}
                    </TabsListItem>
                ))}
            </TabsList>
            <TabContent>
                {props.children[props.activeTab]}
            </TabContent>
        </>
    );
};

export default Tabs;



const TabsList = styled.div`
  display: flex;
`

const TabsListItem = styled.div<{isActive:boolean}>`
  flex-grow: 1;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  cursor: pointer;
  border-bottom: ${props => props.isActive?'2px solid blue':'1px solid lightgrey'};
  margin-bottom: 10px;
  background: ${props => props.isActive?'#e6f0f8':''};
  color: ${props => props.isActive?'#006BB4':''};
`
const TabContent = styled.div`
  padding: 0 10px 10px 10px;
`