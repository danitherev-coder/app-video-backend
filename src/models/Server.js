import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import compression from 'compression'
// db import
import db from '../config/db.js'
// routes import
import authRoutes from '../routes/authRoutes.js'
import publishedRoutes from '../routes/publishedRoutes.js'
import likeRoutes from '../routes/likeRoutes.js'
import followerRoutes from '../routes/followerRoutes.js'
import videoRoutes from '../routes/videoRoutes.js'

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT !== undefined ? process.env.PORT : '4000'
    this.paths = {
      auth: '/api/auth',
      published: '/api/published',
      like: '/api/like',
      follower: '/api/follow',
      user: '/api/user',
      video: '/api/video',
    }
    this.conexionDB()
    this.middlewares()
    this.routes()
  }

  async conexionDB() {
    try {
      await db.authenticate()
      db.sync()
      console.log('base de datos conectada')
    } catch (error) {
      console.log(error)
    }
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(express.static('public'))
    // compression middleware
    this.app.use(compression())
  }

  routes() {
    this.app.use(this.paths.auth, authRoutes)
    this.app.use(this.paths.follower, followerRoutes)
    this.app.use(this.paths.like, likeRoutes)
    this.app.use(this.paths.published, publishedRoutes)
    this.app.use(this.paths.video, videoRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`)
    })
  }
}

export default Server
