/**
 * Created by weie123 on 16/8/8.
 */
;(function($,window,document,undefined){
    var pluginName="myPicCircle";

    var defaults ={
        direction:"horizon",//vertical
        autoCircleTime:2000,
        clearAutoPlay:false,//默认开启自动轮播
    };

/*    picCircleCenter=function (element,opt){
        this.$element=element;
        this.options = $.extend({},defaults,opt);
        this.init(this.$element);
    }

    picCircleCenter.prototype={
        init:function ($picCircle) {
            var that=this;
            //console.log($picCircle);
            var picCircleList=[];
            //new picCircle($picCircle);
            $($picCircle).each(function () {
                var $pic =$(this);
                if($pic.hasClass("init")){
                    return;
                }
                //console.log("options"+that.options);
                picCircleList.push(new picCircle($pic,that.options));
                picCircleCenter.prototype = new picCircle($pic,that.options);
                $pic.addClass('init');
            })
        }
    };
    //picCircleCenter.prototype.showNext=*/

    picCircle=function ($picCircle,opt) {
        //console.log($picCircle);
        var $picCircle = $($picCircle);
        this.options=$.extend({},defaults,opt);;
        this.clearAutoPlay=this.options.clearAutoPlay;
/*        this.$picCircle=$picCircle;
        var $ct=this.$ct=this.$picCircle.find('.img-ct');
        this.$pre =$picCircle.find('.pre');
        this.$next= $picCircle.find('.next');*/
        this.$picCircle=$picCircle;
        var $ct=this.$ct=this.$picCircle.find('.img-ct');
        this.$pre =$picCircle.find('.pre');
        this.$next= $picCircle.find('.next');
        var imgWidth = $ct.find('li').width();
        var imgHeight= $ct.find('li').height();
        //根据方向配置决定取宽度还是长度
        this.liWidthOrHeight=this.options.direction=="horizon"?imgWidth:(this.options.direction=="vertical"?imgHeight:"");
        //根据方向配置决定向左还是向上移
        this.directionString=this.options.direction=="horizon"?'left':(this.options.direction=="vertical"?'top':"");
        
        this.imgSize = $ct.find('li').size();
        /*this.navUl=$picCircle.find('.nav');*/
        this.navUl=$picCircle.find('.nav');
        this.navUlLis=this.navUl.children();
        //console.log(this.navUlLis);
        $ct.css('width',this.liWidthOrHeight*this.imgSize);
        //this.circleTime=setInterval(this.showNext(),1000);
        this.autoCircle();
        this.bind();

    }
    picCircle.prototype={
        bind:function () {

            var _this=this;
            this.$pre.on('click',function (evt) {
                evt.preventDefault();
                _this.showPre();
            });
            this.$next.on('click',function (evt) {
                evt.preventDefault();
                _this.showNext();
            });
            this.navUl.on('click','li',function () {

                var $ct= _this.$ct;
                
                $(_this.navUlLis).removeClass();
                $(this).addClass('active');
                
                var temp=$(_this.navUlLis).index(this);
                _this.showCurrentImg(temp);

            });
            this.$ct.on('mouseover','li',function () {
                if(!_this.options.clearAutoPlay){//如果设置了不开启自动轮播
                    _this.clearAutoPlay=true;
                }

            });
            this.$ct.on('mouseout','li',function () {//开启自动轮播
                if(!_this.options.clearAutoPlay){
                    _this.clearAutoPlay=false;
                    _this.autoCircle();
                }

            });

            this.navUl.on('mouseover',function () {
                if(!_this.options.clearAutoPlay){//如果设置了不开启自动轮播
                    _this.clearAutoPlay=true;
                }
            });
            this.$pre.on('mouseover',function () {
                if(!_this.options.clearAutoPlay){//如果设置了不开启自动轮播
                    _this.clearAutoPlay=true;
                }
            });
            this.$next.on('mouseover',function () {
                if(!_this.options.clearAutoPlay){//如果设置了不开启自动轮播
                    _this.clearAutoPlay=true;
                }
            });
        },
        showPre:function () {
            var $ct= this.$ct;
            var tempDirection=this.directionString;
            $ct.prepend($ct.children().last());
            $ct.css(tempDirection,0-this.liWidthOrHeight);
            $ct.animate({tempDirection:0});
            this.showCurrentNavIndex(true);
        },
        showNext:function () {
            var $ct= this.$ct;
            var tempDirection=this.directionString;
            

            $ct.animate({tempDirection:0-this.liWidthOrHeight},function(){
                $ct.append($ct.children().first());
                $ct.css(tempDirection,0);
            });
            this.showCurrentNavIndex(false);

        },
        showCurrentImg:function (index) {
            var $ct= this.$ct;
            while($($ct.children()[0]).attr('data-value')!=index){
                $ct.prepend($ct.children().last());
                $ct.css(this.directionString,0-this.liWidthOrHeight);
                $ct.animate({'left':0});
            }

        },
        showCurrentNavIndex:function (flag) {//flag为true表示ul位置没有被抽动,相当于showPre的情况
            if(flag){
                var $ct= this.$ct;
                this.navUlLis.css('color',"#000");//后期可以将颜色扩展到配置项中
                var currentImgIndex=$($ct.children()[0]).attr('data-value');
                $(this.navUlLis[currentImgIndex]).css('color',"#fff");
            }else{
                var $ct= this.$ct;
                this.navUlLis.css('color',"#000");//后期可以将颜色扩展到配置项中
                var currentImgIndex=$($ct.children()[1]).attr('data-value');
                $(this.navUlLis[currentImgIndex]).css('color',"#fff");
            }

            
        },
        autoCircle:function (flag) {//待会儿实现,鼠标放上去停止自动轮播,鼠标移走又继续,将时间也放入默认配置中,开启和停止轮播也放进配置中,在外面提供出一个接口来让其进行控制
            var Time=this.options.autoCircleTime;
            var _this=this;
            var innerTime;
            var outTime=setTimeout(function () {//要清除当前的这次setTimeout??
                if(_this.clearAutoPlay==false){
                    _this.showNext();
                    innerTime=setTimeout(arguments.callee,Time);
                }/*else{
                    clearTimeout(innerTime);
                    clearTimeout(outTime);
                }*/
            },Time);
        },
        clearAutoCircle:function () {
            this.clearAutoPlay=true;
        }

    };

    $.fn[pluginName]=function(options){
        this.each(function(){
            if(!$.data(this,"plugin_"+pluginName)){
                //$.data(this,"plugin_"+pluginName,new picCircleCenter(this,options));
                $.data(this,"plugin_"+pluginName,new picCircle(this,options));
            }
        });
        return this;
    }
})(jQuery,window,document);