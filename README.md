# site-master-head

/!\ archive /!\
this project is ok with php7.2
/!\ archive /!\

## at first

- install dependencies:

        npm install

## run app

run application in dev mode

    npm run dev
    
## api info

api link google doc à checker ! 
    
    https://docs.google.com/spreadsheets/d/1QO2JmZhJ4jMWP4II5tJ9BgASon5dLVDf2B82lmS3GJY/edit#gid=0
    
## generate ts interface from json

    curl http://localhost:8000/$api_url | ./node_modules/.bin/json-ts --stdin >> $file_name.ts
