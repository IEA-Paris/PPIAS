/* eslint-disable camelcase */
import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'
import matter from 'gray-matter'
import fsExtra from 'fs-extra'
import { batchInsertArticles } from '../contentUtilities'
import slugify from '../slugify'
export default (options) => {
  try {
    const content = fs.readFileSync(
      './modules/publio/lib/tsvToArticles/profiles.tsv',
      'utf8'
    )
    const json = content.split('\r\n').flatMap((profile, index) => {
      const [
        date,
        article_title,
        time,
        issue,
        subissue,
        published,
        yt,
        start,
        stop,
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

      if (!article_title) {
        return []
      }
      return {
        date: new Date(date + 'T' + (time < 10 ? '0' + time : time) + ':00:00'),
        article_title,
        issue: 'content/issues/' + slugify(issue) + '.md',
        subissue: subissue || false,
        published: published === 'TRUE',
        yt: yt || false,
        start: start || false,
        stop: stop || false,
        needDOI: needDOI === 'TRUE',
        abstract: abstract.replace('|', ';'),
        authors: [
          ...(author_1_lastname.length
            ? [
                {
                  firstname: author_1_firstname,
                  lastname: author_1_lastname,
                  positions_and_institutions: [
                    {
                      institution: author_1_institution.replace('|', ';'),
                      positions: [author_1_position],
                    },
                  ],
                  is_institution: author_1_is_institution === 'TRUE',
                },
              ]
            : []),
          ...(author_2_lastname.length
            ? [
                {
                  firstname: author_2_firstname,
                  lastname: author_2_lastname,
                  positions_and_institutions: [
                    {
                      institution: author_2_institution.replace('|', ';'),
                      positions: [author_2_position],
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
                  positions_and_institutions: [
                    {
                      institution: author_3_institution.replace('|', ';'),
                      positions: [author_3_position],
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
    return options
  } catch (error) {
    console.log('error: ', error)
  }
}
