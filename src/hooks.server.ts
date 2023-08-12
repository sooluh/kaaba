import { env } from '$env/dynamic/private'
import { minify } from 'html-minifier-terser'
import type { Handle, ResolveOptions } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  let options: ResolveOptions = {}

  if (env.NODE_ENV === 'production') {
    options = {
      transformPageChunk: ({ html }) =>
        minify(html, {
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          removeComments: true,
          ignoreCustomComments: [/^#/],
          minifyCSS: true,
          minifyJS: true,
          sortAttributes: true,
          sortClassName: true,
        }),
    }
  }

  return await resolve(event, options)
}
