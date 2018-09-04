const Width=window.screen.width;
const Height=window.screen.height;
export default{
    table:{
        width: Width,
        height: Height-50,
    },
    header:{
        width: Width,
        height: Width * 0.2,
    },
    re: {
        width: Width * 0.19,
        height: Width * 0.19,
    },
    search: {
        lineHeight: Width*0.08+'px',
        width: Width * 0.19,
        height: Width *0.1,
    },


    body: {
        width: Width,
        height: Width,
    },
    panel: {
        top: Width * 0.15,
        left: Width * 0.2,
        width: Width * 0.6,
        height: Width * 0.6
    },
    mask: {
        width: Width,
        height: Height-50-Width * 0.2,
    },

    footer: {
        width: Width,
        height: '40px',
    },
 
    
    
    // footer: {
    //     width: this.width,
    //     height: '40px',
    // },
   
    // re: {
    //     width: this.width * 0.19,
    //     height: this.width * 0.19,
    // },
    // board: {
    //     width: this.width * 0.6,
    //     height: this.width * 0.6,
    //     top: this.width * 0.2,
    //     left: this.width * 0.2,
    // },
    // result: {
    //     width: this.width * 0.6,
    //     height: this.width * 0.2,
    //     top: this.width * 0.6,
    //     left: this.width * 0.2,
    //     zIndex:1000,
    //     textAlign:'center',
    //     fontSize:this.width * 0.06 + 'px',
    // }
}