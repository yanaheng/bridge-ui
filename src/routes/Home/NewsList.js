import React from 'react';
import { List } from 'antd-mobile';
import './GridSection.css'

const Item = List.Item;
const Brief = Item.Brief;

const NewsList = ({newsList})=>{
    return(
        <List renderHeader={() => '网站新闻'} className="my-list">
            {newsList.data.map((item,index)=>(
                <Item thumb={item.thumb} multipleLine key={index}>
                    {item.text}<Brief>{item.time}</Brief>
                    </Item>
            ))}
        </List>
    )
}

export default NewsList