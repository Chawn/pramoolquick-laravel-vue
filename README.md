Laravel, Mamp, vite, vue

# Install Laravel via Composer
```
composer create-project laravel/laravel example-app
cd example-app
php artisan serve
```

# Edit .env
```
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=survey
  DB_USERNAME=root
  DB_PASSWORD=root
```

php artisan migrate


# install vite vue & vuex
  ```
  npm init vite vue
  cd vue
  npm install
  npm run dev
  npm install -S vuex@next
  ```

  Create folder "vue/src/store"
  Create file "index.js" in store folder

 

# install tailwind
  https://tailwindcss.com/docs/guides/vite


  ```
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  npm install @headlessui/vue @heroicons/vue @tailwindcss/forms -S
  ```

  ## src/index.css 
    ```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
# router
  ```
  npm i -S vue-router@next
  ```
  create folder "vue/src/router"
  create file "index.js" in routes folder


# src/main.js
  ```
  import { createApp } from 'vue'
  import store from './store'
  import router from './router'
  import './index.css'
  import App from './App.vue'

  createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
  ```

# vue/.env
  ``` VITE_API_BASE_URL = http://localhost:8000 ```
# vue/.env.production
  ``` VITE_API_BASE_URL = https://api.pramoolquick.app ```

# install axios
  npm install axios
# src/axios.js
  ```
  import axios from "axios";
  import store from './store';

  const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  });

  axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`;
    return config;
  })

  export default axiosClient;
  ```

# uuid
``` npm install uuid ```



DEV





# Deploy to shared host

## Vue
npm run build
upload all in dist foler to host

## Laravel

app/Providers/AppServiceProvider.php
```
public function register()
  {
      return base_path('public');
  }
```

config/database.php
Change 127.0.01 -> to -> localhost

.env
Change 127.0.01 -> to -> localhost

 
config/app.php
```
    'key' => env('APP_KEY', base64_decode('s0HuAHRowmfQoyS8q6XzHYjWqN8WEueCaWg2kTk89kY=')), <--- Copy from .env
```

.htaccess
```
RewriteEngine on
RewriteCond %{REQUEST_URI} !^public
RewriteRule ^(.*)$ public/$1 [L]
```