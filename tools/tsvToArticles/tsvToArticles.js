/* eslint-disable camelcase */
import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'
import matter from 'gray-matter'
import fsExtra from 'fs-extra'
import slugify from '../../assets/utils/slugify'
import { batchInsertArticles } from '../lib/contentUtilities'
export default () => {
  const content = fs.readFileSync('./tools/tsvToArticles/profiles.tsv', 'utf8')
  const json = content.split('\n').flatMap((profile) => {
    const [
      date,
      article_title,
      time,
      issue,
      subissue,
      published,
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
    if (!article_title) return []
    return {
      date: new Date(date + 'T' + (time < 10 ? '0' + time : time) + ':00:00'),
      article_title,
      issue: 'content/issues/' + slugify(issue) + '.md',
      subissue,
      published: published === 'TRUE',
      yt,
      needDOI: needDOI === 'TRUE',
      abstract: abstract.replace('|', ';'),
      authors: [
        {
          firstname: author_1_firstname,
          lastname: author_1_lastname,
          titles_and_institution: [
            { institution: author_1_institution, titles: [author_1_position] },
          ],
          is_institution: author_1_is_institution === 'TRUE',
        },
        ...(author_2_lastname.length
          ? [
              {
                firstname: author_2_firstname,
                lastname: author_2_lastname,
                titles_and_institution: [
                  {
                    institution: author_2_institution,
                    titles: [author_2_position],
                  },
                ],
                is_institution: author_2_is_institution === 'TRUE',
              },
            ]
          : []),
        ...(author_3_lastname.length
          ? [
              {
                firstname: author_3_firstname,
                lastname: author_3_lastname,
                titles_and_institution: [
                  {
                    institution: author_3_institution,
                    titles: [author_3_position],
                  },
                ],
                is_institution: author_3_is_institution === 'TRUE',
              },
            ]
          : []),
      ],
      highlight: highlight === 'TRUE',
    }
  })
  batchInsertArticles(json)
}
