import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  new VuexPersistence({
    key: 'data',
    storage: window.localStorage,
  }).plugin(store);
};