<template>
  <!-- 상단 -->
  <header class="header">
    <div class="inner">
      <a href="#" class="logo">stx건설</a>
      <nav class="gnb">
        <ul class="depth1">
          <li v-for="(item, index) in gnbData" :key="index">
            <a :href="item.mainlink">{{item.maintxt}}</a>
            <ul class="depth2">
              <li v-for="(subitem, subindex) in item.subdata" :key="subindex">
                <a :href="subitem.sublink">{{subitem.subtxt}}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div class="lang">
        <a href="#">ENG</a>
        <i class="lang-bar"></i>
        <a href="#" class="lang-active">KOR</a>
      </div>
    </div>
  </header>
</template>

<script>
  import $ from 'jquery';
  import { computed, onUpdated} from 'vue';
  import {useStore} from 'vuex';

  export default {
    props: ['gnbdata'],
    setup() {
      const store = useStore();
      // const gnbData = ref([]);
      // gnbData.value = store.state.gnbData
      const gnbData = computed(() => store.getters.getGnbData);

      // vuex의 store의 action을 요청한다.
      store.dispatch('fetchGnb');


      // vue에서 화면에 html 등록시 실행
      onUpdated(() => {
        // header를 저장한다.
        let header = $('.header');
        let gnb = $('.gnb');
        // 펼쳤을 때 높이값
        let gnbMaxHeight = gnb.outerHeight();
        // 닫혔을 때의 높이값
        let gnbMinHeight = header.outerHeight();
        // 기본 header의 높이값
        header.css('height', gnbMinHeight);

        gnb.mouseenter(function () {
          header.css('height', gnbMaxHeight);
          // header.addClass('header-open')
        });
        gnb.mouseleave(function () {
          header.css('height', gnbMinHeight);
          // header.removeClass('header-open');
          // depth_1_Li.eq(1).find('>a').addClass('depth1-focus')
        })
        //주메뉴 포커스 기능
        let depth_1_Li = $('.depth1 > li');
        $.each(depth_1_Li, function () {
          $(this).mouseenter(function () {
            depth_1_Li.find('>a').removeClass('depth1-focus')
            //li 의 > a 를 찾는다.
            $(this).find('>a').addClass('depth1-focus');
          });
          $(this).mouseleave(function () {
            //li 의 > a 를 찾는다.
            $(this).find('>a').removeClass('depth1-focus');
          });
        });

      });

      return {
        gnbData,

      }
    }
  }
</script>

<style>
  .header {
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    width: 100%;
    height: 80px;
    transition: height 0.5s;
    z-index: 9999;
    box-shadow: 0px 0px 7px 0px rgb(0 0 0 / 20%);
  }

  .header-open {
    height: 400px;
  }

  .header::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    width: 100vw;
    height: 80px;
    background-color: #fff;
  }

  .header .inner {
    /* background-color: greenyellow; */
  }

  .logo {
    position: absolute;
    right: calc(100% + 100px);
    top: 20px;
    width: 150px;
    height: 39px;
    font-size: 0;
    background: url('../assets/images/logo.png')no-repeat center;
    background-size: cover;
  }

  .gnb {}

  .gnb::before {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 80px;
    content: '';
    display: block;
    width: 100vw;
    height: calc(100% - 80px);
    background-color: rgba(0, 0, 0, 0.4);
  }

  .depth1 {
    position: relative;
    display: table;
    table-layout: fixed;
    width: calc(180px * 6 - 70px);
    margin: 0 auto;
  }

  .depth1>li {
    display: table-cell;
    width: 180px;
    /* background-color: yellow; */
  }

  .depth1>li:last-child {
    width: 70px;
  }

  .depth1>li>a {
    position: relative;
    font-size: 19px;
    color: #000;
    font-weight: 500;
    line-height: 80px;
  }

  .depth1>li>a::after {
    content: '';
    position: absolute;
    display: block;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    width: 0;
    height: 4px;
    background: #ed1c24;
    transition: width 0.5s;
  }

  .depth1-focus {
    color: #ed1c24 !important;
  }

  .depth1-focus::after {
    /* width: 100% !important; */
  }

  .depth2 {
    padding-top: 40px;
    padding-bottom: 20px;
  }

  .depth2 li a {
    display: inline-block;
    font-size: 15px;
    color: #fff;
    margin-bottom: 15px;
  }

  .lang {
    position: absolute;
    left: calc(100% + 100px);
    top: 35px;
    font-size: 0;
    white-space: nowrap;
  }

  .lang a {
    display: inline-block;
    color: #888;
    font-size: 15px;
    font-weight: 500;
    text-transform: uppercase;
  }

  .lang-bar {
    display: inline-block;
    width: 1px;
    height: 9px;
    background-color: #999;
    margin: 0 10px;
  }

  .lang .lang-active {
    color: #000;
  }
</style>