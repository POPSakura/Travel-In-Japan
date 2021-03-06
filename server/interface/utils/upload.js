import multer from 'koa-multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'W://nginx-1.16.1//home//image//head')
  },
  filename: (req, file, cb) => {
    const fileFormat = (file.originalname).split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

const upload = multer({ storage })

export default upload
