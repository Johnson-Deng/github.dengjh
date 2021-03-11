/**
 * Created by Ouyang on 2016/4/5.
 * 获取信息工具类
 */
var Utils = {
    getDeviceType: function () {
        var userAgent =  navigator.userAgent.toLocaleLowerCase();
        console.log(userAgent.indexOf("android") >= 0);
        if(userAgent.indexOf("micrcomeeager") >= 0){
            return DEVICE_CONFIG.WEIXING;
        }else if(userAgent.indexOf("chrome") >= 0 && userAgent.indexOf("windows") >= 0){
            return DEVICE_CONFIG.CHROME;
        }else if(userAgent.indexOf("iphone") >= 0){
            return DEVICE_CONFIG.IOS;
        }else if(userAgent.indexOf("android") >= 0){
            return DEVICE_CONFIG.ANDROID;
        }else if(false){
            return DEVICE_CONFIG.WP;
        }
        return DEVICE_CONFIG.CHROME;
    },
    //判断是否是PC环境
    isPC: function () {
        var userAgent =  navigator.userAgent.toLocaleLowerCase();
        return (userAgent.indexOf("chrome") >= 0 && userAgent.indexOf("windows") >= 0);
    }
};

/**
 * 设备类型配置表
 * */
var DEVICE_CONFIG = {
    WEIXING : "weixing",
    CHROME : "chrome",
    PC: "PC",
    ANDROID: "android",
    IOS: "iphone",
    WP: "",
    MOBILE: ""
};
