import React from 'react';
import { Carousel } from 'antd-mobile';

const Banner=({banners})=>{
    return (
        <Carousel
          autoplay
          infinite
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log('slide to', index)}
          // 此处 利用 数组.map 返回一个新数组，新数组为 组件数组，可以直接渲染。
        > 
          {banners.data.map(val => (
            <a
              key={val}
              // href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: banners.imgHeight }}
            >
              <img
                src={val}
                alt=""
                style={{ width: '100%', verticalAlign: 'top', height: banners.imgHeight }}
              />
            </a>
          ))}
        </Carousel>
    );
}

export default Banner;