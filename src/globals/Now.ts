import { HeadingFeature, lexicalEditor, RelationshipFeature } from "@payloadcms/richtext-lexical";
import { GlobalConfig } from "payload";

RelationshipFeature

export const Now: GlobalConfig = {
  slug: "now",
  versions: true,
  fields: [
    {
      name: "content",
      label: "Content",
      type: "richText",
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures, rootFeatures }) => [
          ...defaultFeatures.filter(
            feature => {
              return feature.key !== "relationship"
          }),
          ...rootFeatures.filter(feature => {
            return feature.key !== "relationship"
          }),
          HeadingFeature({
            enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'],
          })
        ],
      }),
    },
    {
      name: "updatedAt",
      label: "Updated At",
      type: "date",
      defaultValue: () => new Date().toISOString(),
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyyy',
        },
      },
    }
  ],
};
