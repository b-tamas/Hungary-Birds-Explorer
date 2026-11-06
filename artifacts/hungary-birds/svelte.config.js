import adapter from '@sveltejs/adapter-static';

const base = process.env.BASE_PATH === '/' ? '' : (process.env.BASE_PATH ?? '');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    files: { assets: 'public' },
    adapter: adapter({ pages: 'build', assets: 'build', strict: true }),
    paths: { base },
  },
};

export default config;
