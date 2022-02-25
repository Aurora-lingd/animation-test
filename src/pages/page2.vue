<template>
  <div class="scroll-player-container w-full relative">
    <div class="scroll-sequence absolute top-0 w-full h-full">
      <div class="image-sequence sticky top-0 overflow-hidden">
        <div class="canvas-container relative w-full h-screen">
          <canvas ref="canvas" id="scroll-player" :width="width" :height="height"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numeral from 'numeral'

export default {
  data: () => ({
    width: '1458',
    height: '820',
    imageLength: '128',
    images: [],
    imagesManager: [],
    canvas: null,
    context: null,
    scrollIndex: 0, // 显示当前滚动图片的索引值
    currentIndex: 0,
    raf: null
  }),
  created () {
    const baseUrl = 'https://www.apple.com.cn/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/02-head-bob-turn/'
    for(let i = 0; i < this.imageLength; i++) {
      // 把所有需要的图片放入
      this.images.push(baseUrl + numeral(i).format('0000') + '.jpg')
    }
  },
  mounted () {
    this.init()
  },
  destroy () {
    document.removeEventListener('scroll',this.handleScroll)
  },
  methods: {
    loadImage () {
      const _this = this
      function loadNextImage(src) {
        const img = new Image();
        img.onload = () => {
          _this.imagesManager.push(img);
          console.log(_this.imagesManager.length, '_this.imagesManager.length');
          if(_this.imagesManager.length == _this.imageLength) {
            // 所有图片加载完成后回调方法
            _this.imagesLoadComplete()
          }
        }
        img.src = src;
        if(_this.images.length === 0) return
        loadNextImage(_this.images.shift());
      }
      loadNextImage(this.images.shift());
    },
    init () {
      this.canvas = document.getElementById('scroll-player')
      this.context = this.canvas.getContext("2d")
      document.addEventListener('scroll', this.handleScroll)
      this.loadImage()
    },
    imagesLoadComplete() {
      console.log('images all  loaded');
      this.run()
    },
    run () {
      this.raf = window.requestAnimationFrame(this.draw)
    },
    draw() {
      if (this.currentIndex <= this.scrollIndex) {
        this.drawImage(this.imagesManager[this.currentIndex])
        this.currentIndex + 1 < this.scrollIndex && this.currentIndex++
      } else if (this.currentIndex >= this.scrollIndex) {
        this.drawImage(this.imagesManager[this.currentIndex])
        this.currentIndex - 1 > this.scrollIndex && this.currentIndex--
      }
      this.raf = window.requestAnimationFrame(this.draw)
    },
    drawImage (img) {
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.drawImage(img, 0, 0)
    },
    handleScroll () {
      const docElement = document.documentElement
      const scrollHeight = docElement.scrollHeight
      const clientHeight = docElement.clientHeight
      const scrollTop = docElement.scrollTop
      this.scrollIndex = Math.round(scrollTop * Number(this.imageLength) / (scrollHeight - clientHeight))
      console.log('this.scrollIndex: ', this.scrollIndex);
    }
  }
}
</script>

<style>
.scroll-player-container {
  height: 300vh;
}
</style>
