import axios from "axios";

const state = {
  gnbData: [],
  noticeData: [],
  newsData: []
};

const actions = {
  // gnb.json 데이터를 axios로 받아온다.
  // mutation: 즉, state를 업데이트 하기 위해 필요한 메서드(commit)
  fetchGnb({commit}){
    axios.get('./data/gnb.json')
    .then(response => {
      // console.log("axios", response);
      // commit('mutation 메서드 이름', 전달할 값);
      commit('UPDATE_GNB', response.data);
    })
    .catch(err => console.log(err))
  },
  fetchNotice({commit}){
    // new.json을 axios로 호출한다.
    axios.get('./data/notice.json')
    .then(response => {
      // console.log(response)
      // mutation으로 자료를 전송한다. commit 필요
      // axios는 받아온 자료를 .data에 보관한다.
      // commit('mutation 메서드 이름', 전송할 데이터)
      commit('UPDATE_NOTICE', response.data)
    })
    .catch(err => console.log(err))
  },
  fetchNews({commit}){
    axios.get('./data/news.json')
    .then(response => {
      // console.log(response)
      commit('UPDATE_NEWS', response.data)
    })
    .catch(err => console.log(err))
  }
};

// mutation state에 값을 없데이트 하기 위한 용도
const mutations = {
  // 메서드 이름(state(mutations자체), 전달할 재료){}
  UPDATE_GNB(state, payload){
    // console.log(payload)
    // 최종적으로 store 데이터 state.gnbData업데이트
    state.gnbData = payload;
  },
  UPDATE_NEWS(state, payload){
    // console.log('mutation', payload)
    state.newsData = payload
  },
  UPDATE_NOTICE(state, payload){
    // console.log('mutation', payload)
    state.noticeData = payload
  },
};
const getters = {
  getGnbData(state){
    return state.gnbData;
  },
  getNoticeData(state){
    console.log('getters', state.noticeData)
    return state.noticeData;

  },
  getNewsData(state){
    console.log('getters', state.newsData)
    return state.newsData;

  },
};

export default {state, actions, mutations, getters}