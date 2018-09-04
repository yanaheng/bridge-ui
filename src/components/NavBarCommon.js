import React from 'react';
import { NavBar } from 'antd-mobile';
import { connect } from 'dva';

const NavBarCommon=({navbar,onLeftClick=null,rightContent=null})=>{
    return (
        <NavBar
            style={navbar.style}
            mode={navbar.mode}
            icon={navbar.icon}
            onLeftClick={onLeftClick}
            rightContent={rightContent}
        >{navbar.text}</NavBar>
    );
}

export default connect()(NavBarCommon);