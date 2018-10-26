import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as cors from 'koa-cors';
import {Sequelize} from  'sequelize-typescript'

import httpRoute from './router'

const app = new Koa();
const koaRouter = new Router();

const sequelize =  new Sequelize({
	dialect  :  'postgres',
	host 	 :  'localhost',
	name 	 : 	'backend',
	username : 	'postgres',
	password :  'root',
	modelPaths : [
		__dirname + '/models'
	]
})

sequelize.sync({ force: true });
app.use(koaRouter.routes());
app.use(httpRoute.routes());

koaRouter.get('/', async (ctx) => {
    ctx.body = 'hello world';
});

app.use(cors({
    origin: '*'
}));


app.listen(3000)

console.log('server running on port 3000')