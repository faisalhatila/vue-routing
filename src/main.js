import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' }, // our-domain.com/teams => TeamsList
    {
      name: 'teams',
      path: '/teams',
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true
        } // our-domain.com/teams => TeamsList
      ]
    }, // our-domain.com/teams => TeamsList
    {
      path: '/users',
      components: { default: UsersList, footer: UsersFooter },
      beforeEnter(to, from, next) {
        console.log('Route Config Before Enter');
        console.log('to', to);
        console.log('from', from);
        next(true);
      }
    },

    { path: '/:notFound(.*)', redirect: '/teams' } // our-domain.com/teams => TeamsList
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    // console.log('to', to);
    // console.log('from', from);
    // console.log('savedPosition', savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return {
      left: 0,
      top: 0
    };
  }
});

router.beforeEach((to, from, next) => {
  console.log('Global BeforeEach');
  console.log('to', to);
  console.log('from', from);
  next(true);
});

router.afterEach((to, from) => {
  // sending analytic data to server
  console.log('Global after each');
  console.log('to', to);
  console.log('from', from);
});

const app = createApp(App);

app.use(router);

app.mount('#app');
