/**
 * Created by weie123 on 16/8/8.
 */
;(function($,window,document,undefined){
    var pluginName="myPicCircle";

    var defaults ={
        direction:"horizon",//vertical
    };

    picCircleCenter=function (element,opt){
        this.$element=element;
        this.options = $.extend({},defaults,opt);
        this.init(this.$element);
    }
    picCircleCenter.prototype={
        init:function ($picCircle) {
            var that=this;
            console.log($picCircle);
            var picCircleList=[];
            //new picCircle($picCircle);
            $($picCircle).each(function () {
                var $pic =$(this);
                if($pic.hasClass("init")){
                    return;
                }
                console.log("options"+that.options);
                picCircleList.push(new picCircle($pic,that.options));
                $pic.addClass('init');
            })
        }
    };
    function picCircle($picCircle,opt) {
        console.log($picCircle);

        this.options=opt;
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
        this.navUl=$picCircle.find('.nav');
        this.navUlLis=this.navUl.children();
        console.log(this.navUlLis);
        $ct.css('width',this.liWidthOrHeight*this.imgSize);

        this.bind();

    }
    picCircle.prototype={
        bind:function () {

            var _this=this;
            this.$pre.on('click',function () {

                _this.showPre();
            });
            this.$next.on('click',function () {

                _this.showNext();
            });
            this.navUl.on('click','li',function () {
                var $ct= _this.$ct;
                
                $(_this.navUlLis).removeClass();
                $(this).addClass('active');
                
                var temp=$(_this.navUlLis).index(this);
                console.log($(_this.navUlLis).index(this));
                for(var i=0;i<$ct.children().length;i++){
                    while($($ct.children()[i]).attr('data-value')!=temp){
                        $ct.prepend($ct.children().last());
                        $ct.css(_this.directionString,0-_this.liWidthOrHeight);
                        $ct.animate({'left':0});
                    }
                };
            });

        },
        showPre:function () {
            //alert('111')
            var $ct= this.$ct;
            var tempDirection=this.directionString;
            $ct.prepend($ct.children().last());
            $ct.css(tempDirection,0-this.liWidthOrHeight);
            $ct.animate({tempDirection:0});

        },
        showNext:function () {
            //alert('222');
            var $ct= this.$ct;
            var tempDirection=this.directionString;
            

            $ct.animate({tempDirection:0-this.liWidthOrHeight},function(){
                $ct.append($ct.children().first());
                $ct.css(tempDirection,0);
            });


        },

    };

    $.fn[pluginName]=function(options){
        this.each(function(){
            if(!$.data(this,"plugin_"+pluginName)){
                $.data(this,"plugin_"+pluginName,new picCircleCenter(this,options));
            }
        });
        return this;
    }
})(jQuery,window,document);