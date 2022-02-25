<template>
  <div>
    <div class="h-5">
    </div>
    <div class="oper-item flex w-44 justify-center items-center" @click="thumbsUp">
      <div class="heart relative ml-8" ref="heart">
        <svg ref="heart_icon" :style="{ fill: `${hearted? '#E05B5B' : ''}`,stroke: `${hearted?'#E05B5B':''}`,transform: `scale3d(${heartP}, ${heartP}, 1)`}" t="1644483580027" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1234" width="30" height="200"><path d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z" p-id="1235"></path></svg>
      </div>
      <div class="flex-1 ml-1">
        喜欢
      </div>
    </div>
    <div ref="test" class="test" @click="test">
      ❤
    </div>
    <button class="button">按钮</button>
    <div class="sticky top-0 h-screen flex justify-center items-center">
      <h1 class="text-4xl">Less bezel, more screen</h1>
    </div>
  </div>
</template>

<script>
import mojs from '@mojs/core'

export default {
  data: () => ({
    hearted: false,
    testA: null,
    testB: null,
    testC: null,
    heartP: 1,
  }),
  computed : {
    // heartStyle () {
    //   return {
    //     fill: `${this.hearted? '#E05B5B' : ''}`,
    //     stroke: `${this.hearted?'#E05B5B':''}`,
    //     transform: `scale3d(${this.heartP}, ${this.heartP}, 1)`
    //   }
    // }
  },
  methods: {
    onClick () {

    },
    test () {
      let a = new mojs.Transit({
          // 动画挂载的父元素, 如果不填默认挂载到 <body>
          parent: this.$refs.test,
          // 动画延迟时间
          duration: 350,
          // 图形的类型, 这里选择圆形
          type: 'circle',
          // 半径 {从多大 : 到多大}
          radius: { 0: 20 },
          // 填充透明色
          fill: 'transparent',
          // 边框颜色
          stroke: '#E05B5B',
          // 边框粗细 {从多粗 : 到多粗}
          strokeWidth: { 20: 0 },
          // 透明度
          opacity: 0.6,
      })
      a.play()
    },
    thumbsUp () {
      if (!this.hearted) {
        new mojs.Timeline().add(this.testA, this.testB, this.testC).play()
        this.hearted = true;
      } else {
        this.hearted = false;
      }
    }
  },
  mounted () {
    this.testA = new mojs.Burst({
        // 爆裂范围 {从多大 : 到多大}
        radius: {0: 50},
        // 动画挂载的父元素, 如果不填默认挂载到 <body>
        parent: this.$refs.heart,
        // 动画延迟的贝塞尔曲线函数
        easing:  mojs.easing.bezier(0.1, 1, 0.3, 1),
        // 动画延迟时间
        duration: 1500,
        // 在动画动之前等待的时间 (这里一般设置150ms方便减少低端机型可能会存在的卡顿)
        delay: 300,
        // 扩散的粒子配置
        children: {
            duration: 750,
            // 粒子大小变换 {从多大 : 到多大}
            // rand(from, to) rand函数可以帮我们随机出一个区间的值
            radius: {0: 'rand(5, 25)'},
            // 形状选择, 这里我们选择了 “圆形”
            shape: 'circle',
            // 粒子可选的填充色
            fill: ['#1abc9c', '#2ecc71', '#00cec9', '#3498db', '#9b59b6', '#fdcb6e', '#f1c40f', '#e67e22', '#e74c3c', '#e84393']
        },
        // 透明度
        opacity: 0.6,
        // 生成的粒子数量
        count: 10,
        onStart(){
            // 动画触发前的钩子函数     
        },
        onComplete(){
            // 动画完成后的钩子函数     
        }
      })
    this.testB = new mojs.Transit({
        // 动画挂载的父元素, 如果不填默认挂载到 <body>
        parent: this.$refs.heart,
        // 动画延迟时间
        duration: 350,
        // 图形的类型, 这里选择圆形
        type: 'circle',
        // 半径 {从多大 : 到多大}
        radius: { 0: 20 },
        // 填充透明色
        fill: 'transparent',
        // 边框颜色
        stroke: '#E05B5B',
        // 边框粗细 {从多粗 : 到多粗}
        strokeWidth: { 20: 0 },
        // 透明度
        opacity: 0.6,
    })
    this.testC = new mojs.Tween({
      duration: 1200,
      onUpdate: function(progress) {
          if (progress > 0.3) {
          this.heartP = mojs.easing.elastic.out(1.43 * progress - 0.43);
          // heart_icon.value.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
        } else {
            this.heartP = 0
            // heart_icon.value.style.transform = 'scale3d(0,0,1)';
        }
      }
    })
    const h1 = document.querySelector('h1')
    window.addEventListener('scroll', () => {
      let scrolled = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)
      console.log('scrolled: ', scrolled);
      h1.style.setProperty('--percentage', `${scrolled * 100}%`)
    })
  }
}
</script>

<style>
:root {
  --percentage: 0%;
}
body {
  /* background: black; */
  margin: 0;
  height: 200vh;
}
h1 {
  font-family: Helvetica;
  padding: 0;
  color: orange;
  letter-spacing:-0.3px;
  background-image: linear-gradient(75deg, rgb(241, 222, 136) 0%, rgb(241, 222, 136) 33.33%, rgba(255, 255, 255, 1) 66.67%, rgba(255, 255, 255, 1) 100%);
  background-size:  300% 100%;
  background-position-x: calc(100% - var(--percentage));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

h1:hover {
  background-position-x: 0%;
  /* transition: 2s background-position-x ease-in-out */
}

#button {

}
.button {
  outline: none;
  border: none;
  z-index: 1;
  position: relative;
  color: white;
  background: #262626;
  padding: 0.5em 1em;
  overflow: hidden;
}

.button::after {
  content: '';
  z-index: -1;
  position: absolute;
  background: #595959;
  top: -50%;
  left: 0%;
  bottom: -50%;
  widows: 1.25em;
  transform: translate3d(-200%, 0, 0) rotate(35deg);
}

.oper-item:hover .heart svg {
  stroke: #E05B5B;
}
.mySvg {
  transition: fill .3s, stroke .3s;
  fill: transparent;
  stroke-width: 20px;
  font-size: 16px;
}
.btn {
    border-radius: 13px;
    background: #FFD811;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0;
    margin-top: 0;
    transition: all 250ms ease;
    overflow: hidden;
    transform-origin: center center;
    opacity: 0;
  }
.box {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: default;
}
.box:hover .btn {
  width: 85px;
  height: 26px;
  margin-top: 10px;
  opacity: 1;
}
</style>
