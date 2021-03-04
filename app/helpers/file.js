import fs from 'fs'
import path from 'path'
import mv from 'mv'
import xhr2 from 'xhr2'

global.XMLHttpRequest = xhr2

export const fileToBlob = file =>
  new Promise((resolve, reject) => {
    fs.readFile(file.path, (err, data) => {
      if (err) {
        reject(err)
      }
      fs.unlinkSync(file.path)
      resolve(data)
    })
  })

export const nameToUrl = filename => {
  const split = filename.split('.')
  const name = split.slice(0, split.length - 1).join('.')

  return `${name}_${Date.now()}.${split[split.length - 1]}`
}

export const writeFile = file =>
  new Promise((resolve, reject) => {
    file.on('error', err => reject(err)).on('finish', () => resolve(file))
  })

export const saveFileTo = ({ file, dir = 'files', prefix = '' }) => {
  return new Promise((resolve, reject) => {
    const newFileName = prefix.length
      ? `${prefix}.${file.name}`
      : `${file.name}`
    const newPath = `${process.cwd()}/src/${dir}/${newFileName}`
    mv(file.path, newPath, err => {
      if (err) {
        reject(err)
      }
      resolve({
        size: file.size,
        path: newPath,
        name: newFileName,
        type: file.type,
        mtime: file.lastModifiedDate
      })
    })
  })
}

export const readFileFrom = ({
  file,
  dir = 'files',
  stream = false,
  options = {}
}) => {
  return new Promise((resolve, reject) => {
    const filepath = `${process.cwd()}/src/${dir}/${file}`
    if (stream) {
      resolve(fs.createReadStream(filepath, options))
    } else {
      fs.readFile(filepath, options, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    }
  })
}

export const deleteFile = ({ file, dir = 'files' }) => {
  return new Promise((resolve, reject) => {
    const filepath = `${process.cwd()}/src/${dir}/${file}`
    fs.unlink(filepath, (err, data) => {
      if (err) {
        reject(err)
      }
      console.log(file, 'deleted from ', dir)
      resolve(data)
    })
  })
}

export const createTempFileStorage = ({ dirname }) => {
  const dir = `${path.dirname(__dirname)}/${dirname}`

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}
