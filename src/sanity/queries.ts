import { groq } from "next-sanity";

const projectFields = groq`
  _id,
  title,
  "slug": slug.current,
  category,
  year,
  role,
  client,
  summary,
  body,
  accent,
  tags,
  liveUrl,
  repoUrl,
  featured,
  "coverUrl": coverImage.asset->url,
  "gallery": gallery[]{
    "url": asset->url,
    "alt": alt,
    "caption": caption
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(featured desc, year desc, _createdAt desc) {
    ${projectFields}
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectFields}
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;
