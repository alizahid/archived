const { FTP_HOST, FTP_USER, FTP_PASSWORD } = process.env

const LOCAL_PATH = 'public'
const LAST_DEPLOY = '.last_deploy'

const { dirname, join } = require('path')

const ftp = require('basic-ftp')
const fs = require('fs-extra')
const glob = require('glob')
const compact = require('lodash.compact')
const uniq = require('lodash.uniq')
const ProgressBar = require('progress')

const client = new ftp.Client()

const lastDeployed = async () => {
  const exists = await fs.exists(LAST_DEPLOY)

  if (!exists) {
    await fs.outputFile(LAST_DEPLOY, '0', 'utf8')
  }

  const time = await fs.readFile(LAST_DEPLOY, 'utf8')

  return time.trim()
}

const find = path => {
  return new Promise((resolve, reject) => {
    glob(
      path,
      {
        absolute: true
      },
      (err, files) => {
        if (err) {
          return reject()
        }

        resolve(files)
      }
    )
  })
}

const eligibleFiles = async path => {
  const eligible = []

  const files = await find(path)
  const time = await lastDeployed()

  for (file of files) {
    if (await updatedAfter(file, time)) {
      eligible.push(file)
    }
  }

  return eligible
}

const updatedAfter = async (path, time) => {
  const file = await fs.stat(path)

  return file.isFile() && file.mtime > time
}

const getRemotePath = file => file.substr(join(__dirname, LOCAL_PATH).length)

const updateLastDeployment = () =>
  fs.outputFile(LAST_DEPLOY, Date.now(), 'utf8')

const run = async () => {
  const files = await eligibleFiles('public/**/*')

  const directories = compact(
    uniq(files.map(file => dirname(getRemotePath(file))))
  ).sort()

  const bar = new ProgressBar('Uploading files :current/:total', {
    total: files.length + directories.length
  })

  await client.access({
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD
  })

  for (const directory of directories) {
    await client.ensureDir(directory)

    bar.tick()
  }

  for (const file of files) {
    const remoteFile = getRemotePath(file)

    const stream = fs.createReadStream(file)

    await client.upload(stream, remoteFile)

    bar.tick()
  }

  client.close()

  await updateLastDeployment()
}

run()
