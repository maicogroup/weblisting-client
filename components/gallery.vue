<template>
    <div>
        <button style="display:none" id="dynamic" v-on:click="openGallery">Open Slice</button>
        <div id="light-gallery">
            <div class="glide">
                <div class="glide__track" data-glide-el="track">
                    <ul class="glide__slides">
                        <li
                            v-for="(item, index) in items"
                            :key="index"
                            class="glide__slide media_container"
                            v-on:click="openGallery(index)"
                        >
                            <div :style="`background-image: url(${item.includes('.mp4') ? imgUrl : item}); filter: blur(100px); -webkit-filter: blur(100px);height: 400px;`"></div>
                            <video v-if="item.includes('mp4')" :src="item" controls/>
                            <img v-else :src="item" />
                        </li>
                    </ul>
                </div>
                <div class="glide__arrows" data-glide-el="controls">
                    <button class="glide__arrow glide__arrow--left" style="font-size: 69px;" data-glide-dir="<">
                    &lsaquo;
                    </button>
                    <button class="glide__arrow glide__arrow--right" style="font-size: 69px;" data-glide-dir=">">
                    &rsaquo;
                    </button>
                </div>
                <div class="glide__bullets" data-glide-el="controls[nav]">
                    <button v-for="(item, index) in items" :key="index" class="glide__bullet" :data-glide-dir="`=${index}`"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Glide from '@glidejs/glide';
import glide from '@glidejs/glide';
export default {
    name: 'Gallery',
    props:["items"],
    data: () => ({
        imgUrl: "https://maico-hub-record.ss-hn-1.bizflycloud.vn/apartment-resource/00800a5f-eb0c-4c6f-93ad-1c28e03b70dc/17-01-2022_0953/image/z3116547105303_32a851d4f5d44bca12e64ac1a09e6a6d.jpg",
        index: null,
        el: "",
        gallery: []
    }),
    mounted(){
        // this.el = document.getElementById('light-gallery');
        // this.gallery = window.lightGallery(this.el);
        window.glide = new Glide('.glide').mount();
        this.items.forEach(element => {
            var item = '';
            if(element.includes('.mp4')){
                item = {
                    poster: '/images/video-poster.jpg',
                    thumb: '/images/video-thumbnail.jpg',
                    html: `<video class="lg-video-object lg-html5" controls preload="none"><source src="${element}" type="video/mp4">Your browser does not support HTML5 video</video>`
                }
            }
            else{
                item = {
                    src: element,
                    thumb: element
                }
            }
            this.gallery.push(item)
        });
    },
    methods: {
        openGallery: function(index){
            const element = document.getElementById('dynamic');
            if(element.hasAttribute("lg-uid")){
                window.lgData[element.getAttribute('lg-uid')].index = index;
                window.lgData[element.getAttribute('lg-uid')].build(index);
            }else{
                window.lightGallery(element,{
                    dynamic: true,
                    dynamicEl: this.gallery,
                    thumbnail: true,
                    autoplayFirstVideo: false,
                    index: index
                })
                element.addEventListener('onAfterSlide', function(event){
                    window.glide.update({
                        startAt: event.detail.index
                    })
                })
            }
        }
    }
};
</script>
<style scoped>
.media_container{
    height: 400px !important; 
    position: relative; 
}
.media_container > video, .media_container > img {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
</style>
<style lang="scss" scoped>
@import "node_modules/@glidejs/glide/src/assets/sass/glide.core";
@import "node_modules/@glidejs/glide/src/assets/sass/variables";
.#{$glide-class} {
  $this: &;
  $se: $glide-element-separator;
  $sm: $glide-modifier-separator;
  &#{$se}arrow {
    position: absolute;
    display: block;
    top: 50%;
    z-index: 2;
    color: white;
    text-transform: uppercase;
    padding: 9px 12px;
    // background-color: transparent;
    // border: 2px solid rgba(255, 255, 255, 0.5);
    // border-radius: 4px;
    // box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, 0.1);
    text-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.1);
    opacity: 1;
    cursor: pointer;
    transition: opacity 150ms ease, border 300ms ease-in-out;
    transform: translateY(-50%);
    line-height: 1;
    height: 100%;
    width: 100px;
    &:focus { outline: none; }
    &:hover { border-color: white; box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, 0.1);}
    &#{$sm}left {
      left: 0;
    }
    &#{$sm}right {
      right: 0;
    }
    &#{$sm}disabled {
      opacity: 0.33;
    }
  }
  &#{$se}bullets {
    position: absolute;
    z-index: 2;
    bottom: 2em;
    left: 50%;
    display: inline-flex;
    list-style: none;
    transform: translateX(-50%);
  }
  &#{$se}bullet {
    background-color: rgba(255, 255, 255, 0.5);
    width: 9px;
    height: 9px;
    padding: 0;
    border-radius: 50%;
    border: 2px solid transparent;
    transition: all 300ms ease-in-out;
    cursor: pointer;
    line-height: 0;
    box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, 0.1);
    margin: 0 0.25em;
    &:focus {
      outline: none;
    }
    &:hover,
    &:focus {
      border: 2px solid white;
      background-color: rgba(255, 255, 255, 0.5);
    }
    &#{$sm}active {
      background-color: white;
    }
  }
  &#{$sm}swipeable {
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  }
  &#{$sm}dragging {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }
}
</style> 