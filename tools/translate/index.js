const fs = require("fs")
const querystring = require("querystring")
const _ = require("lodash")
const commandLineArgs = require("command-line-args")
const ProgressBar = require("progress")
const axios = require("axios")
const path = require("path")
var showdown = require("showdown")
const jsdom = require("jsdom")
const glob = require("glob")
const frontmatter = require("@github-docs/frontmatter")
const optionDefinitions = [
  { name: "verbose", alias: "v", type: Boolean },
  { name: "help", alias: "h", type: Boolean },
  { name: "lang", alias: "l", type: String },
  { name: "input", alias: "i", type: String },
  { name: "output", alias: "o", type: String },
]
const folders = [
  "../../common/frontend/data/translations/",
  "../../common/backend/lib/mailing/templates/createGeneralContact/translations/",
  "../../common/backend/lib/mailing/templates/createProject/translations/",
  "../../common/backend/lib/mailing/templates/createProjectContact/translations/",
  "../../common/backend/lib/mailing/templates/editRequest/translations/",
  "../../common/backend/lib/mailing/templates/forgotPassword/translations/",
  "../../common/backend/lib/mailing/templates/publishProject/translations/",
  "../../common/backend/lib/mailing/templates/rejectProject/translations/",
  "../../common/backend/lib/mailing/templates/sendAlerts/translations/",
  "../../common/backend/lib/mailing/templates/changePassword/translations/",
  "../../common/backend/lib/mailing/templates/createAlert/translations/",
  "../../common/backend/lib/mailing/templates/validateProject/translations/",
]
const languages = ["fr", "de", "el", "es", "it", "ja", "nl", "pt", "ru", "zh"]
converter = new showdown.Converter()
const dom = new jsdom.JSDOM()
languages.forEach((lang) => {
  /*  // process all json files
  folders.forEach(folder => {
    const options = commandLineArgs(optionDefinitions)
    let data
    let moc
    let model
    data = fs.readFileSync(path.resolve(folder + 'en.json'))
    moc = JSON.parse(data)

    dataOut = fs.readFileSync(path.resolve(folder + lang + '.json'))
    model = JSON.parse(dataOut)

    let numberOfCall = 0
    let numOfCallResolved = 0
    let skipped = 0
    let bar

    translateObj = (params, target, outputLang, callback) => {
      _.forIn(params, (value, key) => {
        if (_.isObject(value)) {
          translateObj(value, target[key], outputLang, callback)
        } else {
          numberOfCall++ // count for number of call
          setTimeout(() => {
            if (!(target && target[key] && target[key].length)) { // is it already translated?
              const queryParams = {
                auth_key: '2158ca99-2a15-e18c-8e5b-671c6c22ade8', // TODO make it a secret
                text: value,
                target_lang: lang,
                split_sentences: '0',
              }
              axios
                .post(
                  'https://api.deepl.com/v2/translate',
                  querystring.stringify(queryParams)
                )
                .then((res) => {
                  if (!bar) {
                    bar = new ProgressBar('translating [:bar] :percent :etas', {
                      complete: '=',
                      incomplete: ' ',
                      width: 50,
                      total: numberOfCall,
                    })
                    bar.tick()
                  } else {
                    bar.tick()
                  }
                  numOfCallResolved++ // count for number of callback
                  console.log('translation: ', res.data.translations[0].text)
                  params[key] = res.data.translations[0].text
                  if (numberOfCall === numOfCallResolved) {
                    callback(null, moc) // once all callback arrived means that process ended
                  }
                })
                .catch((e) => {
                  callback(e, null)
                })
            } else { // already translated, just skip
              skipped++
              params[key] = target[key]
              numOfCallResolved++ // count for number of callback
              if (numberOfCall === numOfCallResolved) {
                callback(null, moc) // once all callback arrived means that process ended
              }
            }
            console.log('Item: ' + numberOfCall + '/' + numOfCallResolved)
          }, numberOfCall * 100) // avoid the api call limit
        }
      });
    }
    translateObj(moc, model, lang, (err, result) => {
      if (err) {
        console.error(err)
      } else {
        console.log('skipped', skipped)
        console.log(`Translation file available at ${lang}`)
        fs.writeFileSync(path.resolve(folder + lang + '.json'), JSON.stringify(result))
        console.log('result: ', result)
      }
    })
  }) */
  // process all *.md files

  glob(
    path.resolve("../../app/frontend/content/en") + "/**/*.md",
    {},
    (err, files) => {
      files.forEach(async (file) => {
        setTimeout(() => {
          // check if the lang counterpart of the file exist
          const path = file.replace("content/en", "content/" + lang)
          console.log("path: ", path)
          let shouldTranslate = false
          fs.access(path, fs.F_OK, async (err) => {
            if (err) {
              // file not found, we should proceed
              shouldTranslate = true
              console.log("not found: ", shouldTranslate)
              // create an empty file
              await fs.writeFileSync(
                path,
                `---

---`
              )
            }
            const sourceFile = fs.readFileSync(file, "utf8")
            const { data, content, errors } = frontmatter(sourceFile)
            const targetFile = fs.readFileSync(path, "utf8")
            const target = frontmatter(targetFile)
            console.log("target.data: ", target.data)
            if (!shouldTranslate) {
              //file exists, let's check version

              if (
                !target.data ||
                !target.data.version ||
                target.data.version < data.version
              ) {
                console.log("target.data.version: ", target.data.version)
                console.log("data.version: ", data.version)
                // version mismatch, we should proceed
                shouldTranslate = true
                console.log("version: ", shouldTranslate)
              }
            }
            if (shouldTranslate) {
              const xhtml = converter.makeHtml(content)
              const queryParams = {
                auth_key: "2158ca99-2a15-e18c-8e5b-671c6c22ade8", // TODO make it a secret
                text: xhtml,
                target_lang: lang,
                split_sentences: "0",
                tag_handling: "xml",
              }
              console.log(`Will translate the file ${sourceFile} into ${lang}`)
              const res = await axios.post(
                "https://api.deepl.com/v2/translate",
                querystring.stringify(queryParams)
              )
              let title = ""
              if (data.title) {
                // translate title
                const queryParams = {
                  auth_key: "2158ca99-2a15-e18c-8e5b-671c6c22ade8", // TODO make it a secret
                  text: data.title,
                  target_lang: lang,
                  split_sentences: "0",
                }
                const titleRes = await axios.post(
                  "https://api.deepl.com/v2/translate",
                  querystring.stringify(queryParams)
                )
                title = titleRes.data.translations[0].text
              }

              const body = converter.makeMarkdown(
                res.data.translations[0].text,
                dom.window.document
              )
              delete target.data.title
              delete target.data.version
              // todo, print the rest of target data in the target frontmatter
              const newDoc = `---
title: ${title}
version : ${data.version}
---
${body}
`
              fs.writeFile(path, newDoc, function (err) {
                if (err) return console.log(err)
                console.log(
                  `Succefully translated the file ${sourceFile} info ${lang}`
                )
              })
            }
          })
        }, 2000)
      })
    }
  )
})
