import fs from 'node:fs'

const files = fs.readdirSync('./plugins/GT-Manual/apps').filter(file => file.endsWith('.js'))

let ret = []

files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')

  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }
  let app = ret[i].value[Object.keys(ret[i].value)[0]]
  apps[name] = app
}
export { apps }
