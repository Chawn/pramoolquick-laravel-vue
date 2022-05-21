import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/Home.vue";
import Dashboard from "../views/Member/Dashboard.vue";

import Login from "../views/Auth/Login.vue";
import Register from "../views/Auth/Register.vue";
import NotFound from "../views/NotFound.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import MemberLayout from "../components/MemberLayout.vue";
import store from "../store";

import Help from "../views/Home/Help.vue";
import Premium from "../views/Home/Premium.vue";
import AssetList from "../views/Member/AssetList.vue";
import Account from "../views/Member/Account.vue";

const routes = [
  {
    path: "/",
    name: 'index',
    component: DefaultLayout,
    children: [
          { path: "/", name: "Home", component: Home },
          { path: "/help", name: "Help", component: Help },
          { path: "/premium", name: "Premium", component: Premium },
    ],
  },
  {
    path: "/assetlist",
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: "/assetlist", name: "AssetList", component: AssetList },
      { path: "/account", name: "Account", component: Account },
    ],
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "Auth",
    component: DefaultLayout,
    meta: {isGuest: true},
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
      },
    ],
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
