import slug from "slug";

export const makeSlug = (str: string) =>
  slug(str, {
    remove: /[*+~.'"!:?]/g,
    lower: true,
  });
