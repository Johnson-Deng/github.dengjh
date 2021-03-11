/**
 * Created by Administrator on 2016/2/15.
 */

/**正则表达式-过滤空格*/
var rclass = /[\t\r\n\f]/g;
/**引用*/
var self = null;
var ul = null;
var body = null;
var sliderArray = null;
/**起点X坐标*/
/**起点Y坐标*/
var startX = 0;
var startY = 0;
/**是否可以滑动*/
var isMoving = true;
/**图片下标*/
var index = 0;
/**图片长度*/
var length = 2;
/**滑动距离阀值*/
var limit = 50;
/**滑动距离*/
var distanceY = -1;
/**背景图片高度*/
var offsetHeight = 0;
/**图片高度*/
//var height = 0;

var scrollPage = {
    init: function () {
        self = this;
        index = 0;
        body = document.getElementsByTagName("body")[0];
        /**获得窗口参数*/
        //var height = window.innerHeight;
        //var width = window.innerWidth;
        /**初始化屏幕*/
        //body.style.height = height + "px";
        //body.style.width = width + "px";
        ul = document.getElementsByTagName("ul")[0];
        length = ul.children.length;
        //sliderArray = document.getElementsByClassName("slider-index");
        /**调整内容高度*/
        var banner = document.getElementsByClassName("banner");
        self.adjustmentHeight(banner);
        /**注册默认item-index*/
        //self.setCurrentItem(index);
        /**添加触碰事件**/
        self.registerListener(body, Utils.isPC());
        //viewPager.scroll({
        //    id: "oy",
        //    loop: true,
        //    pagination: false,
        //    afterMove: function (index) {
        //        console.log("after: " + index);
        //    },
        //    beforeMove: function (index) {
        //        console.log("before: " + index);
        //    }
        //});

    },
    /**注册兼容事件*/
    registerListener: function (element,type) {
        if(type){
            element.addEventListener("mousedown", self.onTouchStart, false);
            element.addEventListener("mousemove", self.onTouchMove, false);
            element.addEventListener("mouseup", self.onTouchEnd, false);
        }else{
            element.addEventListener("touchstart", self.onTouchStart, false);
            element.addEventListener("touchmove", self.onTouchMove, false);
            element.addEventListener("touchend", self.onTouchEnd, false);
        }
    },
    /**调整图片内容高度*/
    adjustmentHeight: function (element) {
        var height = window.innerHeight;
        for(var i = 0; i < element.length; i++){
            var beforeStyle = element[i].style.cssText;
            var adaptHeight = " height:" + height + "px";
            element[i].style.cssText = beforeStyle + adaptHeight;
            console.log(element[i].style.cssText);
        }
    },
    /**手指点击事件*/
    onTouchStart: function (event) {
        if(null != event){
            var touch = event;
            if(!Utils.isPC()){
                touch = event.touches[0];
            }
            if(null != touch){
                startX = touch.pageX;
                startY = touch.pageY;
                isMoving = true;
            }
        }
        //console.log("onTouchStart:y " + event.touches[0].pageY);
    },
    /**手指移动事件*/
    onTouchMove: function (event) {
        if(isMoving){
            event.preventDefault();
            var touch = event;
            if(!Utils.isPC()){
                touch = event.touches[0];
            }
            var currentX = touch.pageX;
            var currentY = touch.pageY;
            var distanceX = startX - currentX;
            distanceY = currentY - startY;
            //console.log("distanceX: " + distanceY);
            console.log("distanceY: " + distanceY);
            //var distance = parseInt(Math.sqrt(
            //    (currentX - startX)*(currentX - startX)+
            //    (currentY - startY)*(currentY - startY)));
            //console.log("距离->" + distance);
            //console.log("currentX; " + currentX);
            //console.log("currentY; " + currentY);
        }
        //console.log("onTouchMove:x " + event.touches[0].pageX);
        //console.log("onTouchMove:y " + event.touches[0].pageY);
    },
    /**事件结束*/
    onTouchEnd: function(event){
        //noinspection JSUnresolvedVariable
        var touch = event;
        if(!Utils.isPC()){
            touch = event.changedTouches[0];
        }
        var lastX = touch.pageX;
        var lastY = touch.pageY;
        /**最后一次坐标点减去start的坐标点，正向下，负向上*/
        var distance = lastY - startY;
        if(distanceY < limit){
            if(index >= length - 1){
                index = 2;
                return;
            }
            self.down();
            console.log("执行下拉");
        }else {
            if(index <= 0){
                index = 0;
                return;
            }
            self.up();
            console.log("执行上拉");
        }
        startX = -1;
        startY = -1;
        isMoving = false;
        console.log("onTouchEnd:y " + lastY);
        console.log("最终距离y:" + distance);
        console.log("当前index->" + index);
    },
    computeTouchStart: function (clickX, clickY) {

    },
    computeTouchMove: function (clickX, clickY) {

    },
    computeTouchEnd: function (clickX, clickY) {

    },
    /*
     *取消触碰事件
     *弃用
     * */
    cancelTouch: function () {
        //body.removeEventListener("touchmove", self.onTouchMove);
        startX = -1;
        startY = -1;
        isMoving = false;
    },
    /**下拉*/
    down: function () {
        index++;
        offsetHeight = (offsetHeight - window.innerHeight);
        ul.style.webkitTransform = "translateY(" + offsetHeight + "px";
        //self.setCurrentItem(index);
        console.log("向下滑动");
    },
    /**上拉*/
    up: function (){
        index--;
        offsetHeight = (offsetHeight + window.innerHeight);
        ul.style.webkitTransform = "translateY(" + offsetHeight + "px";
        //self.setCurrentItem(index);
        console.log("向上滑动");
    },
    /**设置当前下标item*/
    setCurrentItem: function (index) {
        var sliderOnClass = "slider-index-on";
        var length = sliderArray.length;
        if(index < length){
            var slider = sliderArray[index];
            for(var i = 0; i < length; i++){
                var _sliderClass = self.getClass(sliderArray[i]);
                if(self.hasClass(_sliderClass, sliderOnClass)){
                    console.log("remove class->");
                    /**
                     * 原来如此 是这里搞错了 一直写成 _sliderClass.className = "slider-index"，对一个类名(字符串)做.className的属性改变没有任何意义,这个属于
                     * 错误的代码，但是javascript没有报错，导致一直没找到问题所在。
                     * 应该改成一个对象的className;
                     * object.className = "slider-index"
                     * */
                    sliderArray[i].className = "slider-index";
                }
            }
            slider.className += " " + sliderOnClass;
        }
    },
    /**对比class1 和 class2 是否相等*/
    hasClass: function (class1, class2) {
        return (class1.replace(rclass, " ").indexOf(class2)) > -1;
    },
    /**获得元素上的Class*/
    getClass: function(element){
        return element.getAttribute && element.getAttribute("class") || "";
    }
};

var viewPager = {
    scroll: function(options){
        var defaults = {
            id: "scroll",
            afterMove: null,
            beforeMove: null,
            loop: false,
            pagination: false
        };
        var setting = deepCopy(options, defaults);
        log(setting);
        var container = document.getElementById(setting.id);
        var index = 0;
        var offsetHeight = 0;
        var paginationList = "";
        var startX = 0;
        var startY = 0;
        var isMoving = false;
        var distanceY = 0;
        css(container, 'transition: all 1s;-webkit-transition: all 1s;');
        registerListener(container, Utils.isPC());
        indicatorView(setting.pagination);

        //初始化indicator
        function indicatorView(bool){
            if(bool){
                var nav = document.createElement("nav");
                var ul = document.createElement("ul");
                nav.className = "navigation-index";
                ul.className = "navigation-slider";
                nav.appendChild(ul);
                for(var i = 0; i < container.childElementCount; i++){
                    var li = document.createElement("li");
                    if(i == index){
                        li.className = "slider-index-on"
                    }
                    li.className += " slider-index";
                    ul.appendChild(li);
                }
                document.getElementsByTagName("body")[0].appendChild(nav);
                //setCurrentItem(index);
            }
        }

        //注册监听事件
        function registerListener(element, type){
            if(type){
                element.addEventListener("mousedown", onTouchStart, false);
                element.addEventListener("mousemove", onTouchMove, false);
                element.addEventListener("mouseup", onTouchEnd, false);
            }else{
                element.addEventListener("touchstart", onTouchStart, false);
                element.addEventListener("touchmove", onTouchMove, false);
                element.addEventListener("touchend", onTouchEnd, false);
            }
        }
        function onTouchStart(event){
            if(null != event){
                var touch = event;
                if(!Utils.isPC()){
                    touch = event.touches[0];
                }
                if(null != touch){
                    startX = touch.pageX;
                    startY = touch.pageY;
                    isMoving = true;
                }
            }
        }
        function onTouchMove(event){
            if(isMoving){
                event.preventDefault();
                var touch = event;
                if(!Utils.isPC()){
                    touch = event.touches[0];
                }
                var currentX = touch.pageX;
                var currentY = touch.pageY;
                distanceY = currentY - startY;
            }
        }
        function onTouchEnd(event){
            //noinspection JSUnresolvedVariable
            var touch = event;
            if(!Utils.isPC()){
                touch = event.changedTouches[0];
            }
            var lastX = touch.pageX;
            var lastY = touch.pageY;
            /**最后一次坐标点减去start的坐标点，正向下，负向上*/
            var distance = lastY - startY;
            if(distanceY < limit){
                if(index >= length && !setting.loop){
                    index = 2;
                    return;
                }
                down();
            }else {
                if(index <= 0 && !setting.loop){
                    index = 0;
                    return;
                }
                up();
            }
            startX = -1;
            startY = -1;
            isMoving = false;
        }
        //下拉动画
        function down(){
            index++;
            offsetHeight = (offsetHeight - window.innerHeight);
            container.style.webkitTransform = "translateY(" + offsetHeight + "px";
            container.style.transform = "translateY(" + offsetHeight + "px";
            if(setting.loop && container.childElementCount == index){
                offsetHeight = 0;
                index = 0;
                container.style.webkitTransform = "translateY(" + offsetHeight + "px";
                container.style.transform = "translateY(" + offsetHeight + "px";
            }
            //setCurrentItem(index);
            if(setting.beforeMove != undefined){
                setting.beforeMove(index);
            }
            if(setting.afterMove != undefined){
                setting.afterMove(index);
            }
            log(length == index);
        }
        //上拉动画
        function up(){
            index--;
            if(setting.loop && index == -1){
                index = container.childElementCount - 1;
                offsetHeight = container.children[0].clientHeight * (container.childElementCount - 1) * -1;
                container.style.webkitTransform = "translateY(" + offsetHeight + "px";
                container.style.transform = "translateY(" + offsetHeight + "px";
                log("up");
            }else{
                offsetHeight = (offsetHeight + window.innerHeight);
                container.style.webkitTransform = "translateY(" + offsetHeight + "px";
                container.style.transform = "translateY(" + offsetHeight + "px";
            }
            //setCurrentItem(index);
            if(setting.beforeMove != undefined){
                setting.beforeMove(index);
            }
            if(setting.afterMove != undefined){
                setting.afterMove(index);
            }
        }
        //设置Item项
        function setCurrentItem(index){
            var sliderOnClass = "slider-index-on";
            var length = container.childElementCount;
            if(index < length){
                var ele = container.children[index];
                for(var i = 0; i < length; i++){
                    var _class = getClass(ele);
                    if(hasClass(_class, sliderOnClass)){
                        ele.className = "slider-index";
                    }
                }
                ele.className += " " + sliderOnClass;
            }
        }
        //继承
        function deepCopy(p, c){
            var c = c || {};
            for (var i in p) {
                if (typeof p[i] === 'object' ) {
                    c[i] = (p[i].constructor === Array) ? [] : {};
                    deepCopy(p[i], c[i]);
                } else {
                    c[i] = p[i];
                }
            }
            return c;
        }
        /**对比class1 和 class2 是否相等*/
        function hasClass (class1, class2) {
            return (class1.replace(rclass, " ").indexOf(class2)) > -1;
        }
        /**获得元素上的Class*/
        function getClass(element){
            return element.getAttribute && element.getAttribute("class") || "";
        }
        function addClass(element, class1){
            if(element != undefined || element != null){
                var classList = element.getAttribute('class') == null ? "" : element.getAttribute('class');
                classList += " " + class1;
                element.setAttribute('class', classList);
            }
        }
        function css(element, cssText){
            var text = element.style.cssText;
            text += cssText;
            element.style.cssText = text;
        }
        //调试
        function log(msg){
            console.log(msg);
        }
    }
};
