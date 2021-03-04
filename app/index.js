import app from 'server'
import process from 'process'
import { createTempFileStorage } from './helpers'

import { PORT } from 'config'

app.shutdown = () => process.exit()

process.on('SIGINT', () => app.shutdown())

process.on('SIGTERM', () => app.shutdown())

createTempFileStorage({ dirname: 'files' })

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

export default app
