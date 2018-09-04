import React from 'react';
import { Grid } from 'antd-mobile';
import './GridSection.css'
import GridItem from '../../components/Home/GridItem'

const GridSection = ({grid}) => {
    return (<div>
            <Grid
                // onClick={_el =>{
                //     if(session.get_sid()){
                //         props.setOthers(_el.text.key)
                //     }else{
                //         Toast.fail('请先登录！',3)
                //     } 
                // }
                // }
                // onClick={_el => console.log(props.setOthers)}
                data={grid.data}
                columnNum={2}
                activeStyle={false}
                square={false}
                itemStyle={{ fontSize: '12px', padding: '8px 5px', borderBottom: '1px solid #eeeeee' }}
                renderItem={(el, index) => GridItem(el, index)}
                //isCarousel={true}  // 是否跑马灯  非常有用
            />
        </div>
    );
}

export default GridSection;