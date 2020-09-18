import mycrumb from './crumb.vue'

const crumb = {
    install : function(Vue){
        Vue.component('crumb',mycrumb)
    }
}
export default crumb