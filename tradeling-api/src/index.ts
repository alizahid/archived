const { PORT } = process.env

import { init } from './server'

init().listen(PORT)
