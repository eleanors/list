import Vue from 'vue'
import routes from './routes'
import VueRouter from 'vue-router'

const title = 'Food'

Vue.use(VueRouter)

const generateRoute = function(pannel = [], routes = []){
        for(let i=0, len=pannel.length; i<len; i++){
                let item = pannel[i]
                if(item.path) {
                        routes.push(item)
                }
                if(!item.components) {
                        generateRoute(item.children, routes)
                }
        }
        return routes;
}

// instance vue-router
const router = new VueRouter({
        mode: 'hash',
        linkActiveClass: 'is-active',
        routes: routes
})

// 路由切换todo....
router.beforeEach(function(to, from, next){
        let pageTitle = ''
        if (to.name !== 'Home') {
                for (let i=0, len = to.matched.length; i < len; i++) {
                        pageTitle += `${to.matched[i].meta.title} - `
                }
        }
        document.title = pageTitle
        next()
})

export default router