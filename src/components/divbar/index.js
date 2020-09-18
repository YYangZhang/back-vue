import mydivbar from './divbar.vue'

const divbar = {
    install : function(Vue){
        Vue.component('divbar',mydivbar)
    }
}
export default divbar