import got from 'got'
import fs from 'fs'
import cp from 'child_process'
import { join } from 'path'

const RAW_FROM_DEVTOOLS = "https://raw.githubusercontent.com/ChromeDevTools/devtools-frontend/main/front_end/models/emulation/EmulatedDevices.ts"
const ROOT = join(__dirname, '..')

const getRawContent = async () => {
  if (process.env.TEMP_SOURCE) {
    return fs.readFileSync(join(ROOT, './scripts/source'), { 'encoding': 'utf-8' })
  }
  const content = await got.get(RAW_FROM_DEVTOOLS)
  return content.body
}

const rewriteSource = (source: string) => {
  const re = /const\s+(emulatedDevices)(.+)/gms

  const matched = source.match(re)
  if (matched) {
    const emulatedDevices = matched[0]
    return emulatedDevices
  }
}

const main = async () => {
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist')
  }

  const rawContent = await getRawContent()
  const rewritten = rewriteSource(rawContent)

  const script = `
  // mock
  const UIStrings = {}
  const noop = () => {}
  const i18nLazyString = noop

  // const emulatedDevices = [...]
  ${rewritten};

  // filter default shown devices
  const devices = emulatedDevices.filter(item => {
    return item['show-by-default'] === true
  })

  const fs = require('fs');
  const jsonToTs = require('json-to-ts')

  const space = '\\n\\n'
  
  const typings = jsonToTs(devices).join(space)
    .replace('RootObject', 'Device')
    .replace(/interface/g, 'export interface')

  const header = 'declare const devices: Device[];' + space
  const str = JSON.stringify(devices, null, 2)

  fs.writeFileSync('${join(ROOT, './dist/index.d.ts')}', header + typings)
  fs.writeFileSync('${join(ROOT, './dist/index.cjs')}',  'const devices = ' + str + space + 'exports.devices = devices;')
  fs.writeFileSync('${join(ROOT, './dist/index.mjs')}', 'export const devices = ' + str)

  console.log('Generated dist/index.d.ts, dist/index.cjs, dist/index.mjs')
  `

  const { stderr, stdout } = cp.spawn('node', ['-e', script])
  stderr.pipe(process.stderr)
  stdout.pipe(process.stdout)
}

main()