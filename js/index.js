function carousel($ct) {
  this.init($ct)
  this.bind()
  this.autoplay()
}

carousel.prototype = {
  init: function($ct){
    this.$ct = $ct
    this.$imgBig = this.$ct.find('.images')
    this.$imgs = this.$ct.find('.images > li')
    this.$upper = this.$ct.find('.btn-left')
    this.$under = this.$ct.find('.btn-right')
    this.$bulBtn = this.$ct.find('.bullet > li')
    this.pageIndex = 0
    this.isAnimation = false

    this.imgWidth = this.$imgs.width()
    this.imgCount = this.$imgs.length

    this.$imgBig.append(this.$imgs.first().clone())
    this.$imgBig.prepend(this.$imgs.last().clone())

    this.$imgBig.css("width",this.imgWidth * (this.imgCount + 2))
    this.$imgBig.css('left',-this.imgWidth)
  },

  bind: function(){
    var _this = this
    this.$upper.on('click',function(){
      _this.playPro()
    })
    this.$under.on('click',function(){
      _this.playNext()
    })
    this.$bulBtn.on('click',function(){
      var index = $(this).index()
      console.log(index)
      if(index > _this.pageIndex){
        _this.playNext(index - _this.pageIndex)
      }else{
        _this.playPro(_this.pageIndex - index)
      }
    })

  },

  playPro: function(len){
    if(this.isAnimation) return
    this.isAnimation = true
    len = len === undefined ? 1 : len
    var _this = this
    this.$imgBig.animate({
      left: '+=' + this.imgWidth * len
    },function(){
      _this.pageIndex -= len
      if(_this.pageIndex < 0) {
        _this.$imgBig.css('left',-_this.imgWidth * _this.imgCount)
        _this.pageIndex = _this.imgCount - 1
      }
      _this.isAnimation = false
      _this.setBul()
    })
  },

  playNext: function(len){
    if(this.isAnimation) return
    this.isAnimation = true
    var _this = this
    len = len === undefined ? 1 : len
    this.$imgBig.animate({
      left: '-=' + this.imgWidth * len
    },function(){
      _this.pageIndex += len
      if(_this.pageIndex === _this.imgCount){
        _this.$imgBig.css('left',-_this.imgWidth)
        _this.pageIndex = 0
      }
      _this.isAnimation = false
      _this.setBul()
    })
  },

  setBul: function(){
    this.$bulBtn.eq(this.pageIndex)
                .addClass('active')
                .siblings().removeClass('active')
  },

  autoplay: function(){
    var _this = this
    setInterval(function(){
      _this.playNext()
    },3000)
  }
}



new carousel($('.carousel').eq(0))
new carousel($('.carousel').eq(1))
new carousel($('.carousel').eq(2))