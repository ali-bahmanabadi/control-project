const jsonServer = require('json-server')
const db = require('./db.json')
const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)
server.use(middlewares)

// server.post('/posts/:id/reaction/:type', (req, res) => {
//     const { id, type } = req.params
//     const post = router.db.get('posts').find({ id }).value()

//     post.reactions[type] += 1
//     res.jsonp({
//         success: true,
//     })
// })

// server.post('http://localhost:5000/projects', (req, res, next) => {
//     req.body = {
//         ...req.body,
//         date: Date.now(),
//     }

//     next()
// })

server.use(router)
server.listen(5000, () => {
    console.log('JSON Server is running')
})
