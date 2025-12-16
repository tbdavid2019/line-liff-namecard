const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const JSON5 = require('json5')
const dayjs = require('dayjs') // Require dayjs
const debug = require('debug')('app:build-api')

// Mock window object
global.window = {}

function extractVcardRaw(content) {
    // Pattern 1: window.vueConfig.data.vcard = {
    // Pattern 2: _.set(cfg, 'data.vcard', {
    let startIndex = -1

    const patterns = [
        /window\.vueConfig\.data\.vcard\s*=\s*\{/d, // 'd' flag might not be supported in older node, use index
        /\.set\(\w+,\s*['"]data\.vcard['"]\s*,\s*\{/
    ]

    for (const pattern of patterns) {
        const match = content.match(pattern)
        if (match) {
            startIndex = match.index + match[0].length - 1 // Point to the '{'
            break
        }
    }

    if (startIndex === -1) return null

    let balance = 0
    let endIndex = -1

    for (let i = startIndex; i < content.length; i++) {
        const char = content[i]
        if (char === '{') balance++
        else if (char === '}') balance--

        if (balance === 0) {
            endIndex = i + 1
            break
        }
    }

    if (endIndex !== -1) {
        return content.substring(startIndex, endIndex)
    }
    return null
}

async function buildApi() {
    const projectRoot = path.resolve(__dirname, '..')
    const srcDir = path.join(projectRoot, 'src')
    const distApiDir = path.join(projectRoot, 'dist', 'api', 'flex', 'template')

    fs.mkdirSync(distApiDir, { recursive: true })

    const csvPath = path.join(srcDir, 'businesscards.csv')
    const csvContent = fs.readFileSync(csvPath, 'utf-8')
    const lines = csvContent.trim().split('\n')

    const templates = []

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        if (!line) continue

        // Handle CSV more robustly for simple commas (assuming description is last and might contain commas)
        // form,name,author,lang,preview,description...
        const firstComma = line.indexOf(',')
        const secondComma = line.indexOf(',', firstComma + 1)
        const thirdComma = line.indexOf(',', secondComma + 1)
        const fourthComma = line.indexOf(',', thirdComma + 1)
        const fifthComma = line.indexOf(',', fourthComma + 1)

        if (fifthComma === -1) continue // Not enough columns

        const formRelPath = line.substring(0, firstComma)
        const name = line.substring(firstComma + 1, secondComma)
        const author = line.substring(secondComma + 1, thirdComma)
        // const lang = line.substring(thirdComma + 1, fourthComma)
        const preview = line.substring(fourthComma + 1, fifthComma)
        const description = line.substring(fifthComma + 1)

        const id = path.basename(formRelPath, '.html')
        const pugPath = path.join(srcDir, formRelPath.replace('.html', '.pug'))

        if (!fs.existsSync(pugPath)) {
            debug(`Warning: PUG file not found: ${pugPath}`)
            continue
        }

        try {
            const pugContent = fs.readFileSync(pugPath, 'utf-8')
            let vcardRaw = extractVcardRaw(pugContent)

            if (!vcardRaw) {
                debug(`Warning: Could not extract vcard from ${path.basename(pugPath)}`)
                continue
            }

            vcardRaw = vcardRaw.replace(/#\{baseurl\}/g, '')

            let vcard
            try {
                vcard = JSON5.parse(vcardRaw)
            } catch (err) {
                debug(`Error parsing vcard JSON5 in ${id}: ${err.message}`)
                continue
            }

            const templateRelPath = vcard.template
            if (!templateRelPath) {
                debug(`No template path in vcard for ${id}`)
                continue
            }

            const templatePath = path.join(srcDir, templateRelPath)
            if (!fs.existsSync(templatePath)) {
                debug(`Template file not found: ${templatePath}`)
                continue
            }

            const templateContent = fs.readFileSync(templatePath, 'utf-8')
            const compiled = _.template(templateContent)

            const liffLink = 'https://liff.line.me/mock-liff-id/share.html'

            const context = {
                vcard,
                liffLink,
                _: _,
                JSON,
                dayjs, // Add dayjs
                CryptoJS: {
                    HmacMD5: () => 'hash',
                    enc: { Base64: { stringify: () => 'hash' } }
                },
                gtagClientId: 'mock-client-id',
                gtagSessionId: 'mock-session-id',
                profile: { userId: 'mock-user-id' },
                gtag: { mpCollectUrl: () => 'https://mock-ga-url' }
            }

            let jsonStr
            try {
                jsonStr = compiled(context)
            } catch (err) {
                debug(`Error rendering template ${id}: ${err.message}`)
                continue
            }

            try {
                const jsonObj = JSON5.parse(jsonStr)
                fs.writeFileSync(path.join(distApiDir, `${id}.json`), JSON.stringify(jsonObj, null, 2))
                debug(`Generated: ${id}.json`)

                templates.push({
                    id,
                    title: name,
                    description,
                    template: 'Flex Message',
                    cover: preview
                })
            } catch (err) {
                debug(`Generated invalid JSON for ${id}: ${err.message}`)
            }

        } catch (err) {
            debug(`Unexpected error processing ${id}: ${err.message}`)
        }
    }

    fs.writeFileSync(path.join(distApiDir, 'list.json'), JSON.stringify(templates, null, 2))
    debug(`Generated: list.json with ${templates.length} items`)
}

if (require.main === module) {
    buildApi().catch(err => {
        console.error(err)
        process.exit(1)
    })
} else {
    module.exports = buildApi
}
