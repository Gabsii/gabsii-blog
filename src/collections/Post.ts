import type { CollectionConfig } from 'payload'

import { AmbientColorWash } from '../blocks/AmbientColorWash/AmbientColorWash'
import { Footnote } from '../blocks/Footnote/Footnote'
import { MapTour } from '../blocks/MapTour/MapTour'
import { MoodBoard } from '../blocks/MoodBoard/MoodBoard'
import { PostImage } from '../blocks/PostImage/PostImage'
import { PostMap } from '../blocks/PostMap/PostMap'
import { PostParagraph } from '../blocks/PostParagraph/PostParagraph'
import { PullQuote } from '../blocks/PullQuote/PullQuote'
import { SectionDivider } from '../blocks/SectionDivider/SectionDivider'
import { Timeline } from '../blocks/Timeline/Timeline'

export const Post: CollectionConfig = {
  slug: 'post',
  access: {
    create: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      index: true,
      unique: true,
    },
    {
      name: 'titleImage',
      label: 'Title Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'publishedAt',
      label: 'Published At',
      type: 'date',
      required: true,
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'select',
      options: [
        { label: 'Travel', value: 'travel' },
      ],
      hasMany: true,
      required: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'blocks',
      required: true,
      minRows: 1,
      blocks: [
        PostParagraph,
        PostImage,
        PostMap,
        PullQuote,
        SectionDivider,
        Footnote,
        MoodBoard,
        Timeline,
        MapTour,
        AmbientColorWash,
      ],
    },
  ],
}
