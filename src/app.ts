import express from 'express'
import cors from 'cors'

import { UserRoutes } from './infra/http/routes/UserRoutes'
import { TaskRoutes } from './infra/http/routes/TaskRoutes'
import { NoticeRoute } from './infra/http/routes/NoticeRoute'
import { ProgramMinimumRoute } from './infra/http/routes/ProgramMinimumRoute'
import { AttendanceRoute } from './infra/http/routes/attendanceRoutes'
import { classPlanRoutes } from './infra/http/routes/ClassPlanRoutes'

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:4173',
      'http://31.97.26.156',
      'http://127.0.0.1:4173',
      'https://musicoson-web.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

app.use('/users', UserRoutes)
app.use('/tasks', TaskRoutes)
app.use('/notices', NoticeRoute)
app.use('/program-minimum', ProgramMinimumRoute)
app.use('/attendance', AttendanceRoute)
app.use('/class-plan', classPlanRoutes)

export { app }
