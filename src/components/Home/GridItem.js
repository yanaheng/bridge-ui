import React from 'react';
import { Flex} from 'antd-mobile';
import { Icon } from 'antd'
export default  function GridItem(el, index) {
    return (
        <Flex justify="center" align="center" style={{ border: '0px' }}>
            <Flex.Item style={{ flex: 3, border: '0px' }}>
                <b style={{ fontSize: '14px' }}>{el.text.title}</b><br />
                <font color="#cccccc">{el.text.desc}</font>
            </Flex.Item>
            <Flex.Item style={{ flex: 1, border: '0px' }}><Icon type={el.icon} style={{ fontSize: '26px', color: '#555599' }} /></Flex.Item>
        </Flex>

    );
}