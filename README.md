# agile-demo
- This application was created to show 4 values and 12 principles of Agile Development Method.
- User who interacts with the application can not only see the stuffs but also adding, deleting and updating existed value.

- To start demo, please install requirement environment and library for Back-end and Front-end bellow. Then compiles and hot-reloads for development in sequence Back-end, Front-end.

# Back-end
## Environment
- Require install Python 3
- Require install pip
## Project setup
```
pip install -r requirements.txt
```
### Compiles and hot-reloads for development
```
python api.py
```

# Front-end
```
cd webapp
```
## Environment
- Require install Nodejs
- Require install Vue-CLI
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Run tests
To run all test
```
jest
```
or
```
npm run test:unit
```

To run specify file: jest 'relative path'
example
```
jest your-computer-path/agile-demo-app/webapp/tests/unit/AgileBase.spec.js
```