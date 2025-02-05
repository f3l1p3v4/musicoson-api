import express from 'express'
import { UserRoutes } from '@/infra/http/routes/UserRoutes'
import { TaskRoutes } from '@/infra/http/routes/TaskRoutes'
import { NoticeRoute } from '@/infra/http/routes/NoticeRoute'
import { ProgramMinimumRoute } from '@/infra/http/routes/ProgramMinimumRoute'
import { AttendanceRoute } from '@/infra/http/routes/attendanceRoutes'

const app = express()
app.use(express.json())

app.use('/users', UserRoutes)
app.use('/tasks', TaskRoutes)
app.use('/notices', NoticeRoute)
app.use('/program-minimum', ProgramMinimumRoute)
app.use('/attendance', AttendanceRoute)

export { app }
