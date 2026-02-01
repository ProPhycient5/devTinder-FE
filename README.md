# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment
- Signup on AWS
- Launch instance (by opting the configuration - Ubuntu)
- chmod 400 <secret-key>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-13-51-242-85.eu-north-1.compute.amazonaws.com
- Install node v24.11.0
- Git clone <repo-link>
- Frontend:
  - npm install
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - Copy code from dist(build files) to /var/www/html/
  - sudo scp -r dist/* /var/www/html
  - Enable port :80 of your instance

- Backend:
  - allowed EC2 instance public IP on mongodb server
  - npm install pm2 -g
  - pm2 start npm -- start  
  - pm2 logs
  - pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete <name>
  - config nginx - /etc/nginx/sites-available/default
  - restart nginx - sudo systemctl restart nginx
  - Modify the BASEURL in frontend project to "/api"


## Nginx

    Frontend = http://13.51.242.85/
    Backend = http://13.51.242.85:7777/

    Domain name = devtinder.com => 13.51.242.85

    Frontend = devtinder.com
    Backend = devtinder.com:7777 => devtinder.com/api

    nginx config : 

    server_name 13.51.242.85;

    location /api/ {
        proxy_pass http://localhost:7777/;  # Pass the request to the Node.js app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

## Adding custom Domain name    
  - Purchased domain name from godaddy
  - signup on cloudflare
  - change the nameservers on godaddy and point it to cloudflare
  - wait for sometime(~ 15 min) till your nameservers are updated
