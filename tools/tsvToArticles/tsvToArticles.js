/* eslint-disable camelcase */
import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'
import matter from 'gray-matter'
import fsExtra from 'fs-extra'
import slugify from '../../assets/utils/slugify'

export default () => {
  const content = fs.readFileSync('profiles.tsv', 'utf8')
  const file = 'sam     tory  22;raj  kumar   24'
  const json = file.split(';').map((profile) => {
    const [
      ,
      date,
      article_title,
      time,
      issue,
      yt,
      needDOI,
      abstract,
      author_1_firstname,
      author_1_lastname,
      author_1_institution,
      author_1_is_institution,
      author_1_position,
      author_2_firstname,
      author_2_lastname,
      author_2_is_institution,
      author_2_institution,
      author_2_position,
      author_3_firstname,
      author_3_lastname,
      author_3_is_institution,
      author_3_institution,
      author_3_position,
      highlight,
    ] = profile.split('\t')
    return {
      date: date + 'T' + time < 10 ? time : '0' + time + ':00:00.000Z',
      article_title,
      issue: 'content/issues/' + slugify(issue) + '.md',
      yt,
      needDOI,
      abstract,
      author_1_firstname,
      author_1_lastname,
      author_1_institution,
      author_1_is_institution,
      author_1_position,
      author_2_firstname,
      author_2_lastname,
      author_2_is_institution,
      author_2_institution,
      author_2_position,
      author_3_firstname,
      author_3_lastname,
      author_3_is_institution,
      author_3_institution,
      author_3_position,
      highlight,
    }
  })

  console.log(json)
}
