# 11ty .ts/.tsx Template 🚜

#### To run:
1. Clone repository
2. `$ npm install`
3. To start the development server: `$ npm start`
4. To output the static site: `$ npm run build`


#### The development file structure is as follows:
```
src
├── components
│   └── Header.tsx
├── index.11ty.tsx
├── js
│   └── main.ts
├── some-page
│   └── index.11ty.tsx
└── style
    ├── main.scss
    └── variables.scss
```

#### The output file structure will be:
```
dist
├── index.html
├── js
│   └── main.js
├── some-page
│   └── index.html
└── style
    ├── main.css
    └── variables.css
```
