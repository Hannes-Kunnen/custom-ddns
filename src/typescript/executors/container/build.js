import * as esbuild from 'esbuild';

const options = {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    outfile: './dist/bundle.cjs',
    platform: 'node',
};

const builds = {
    'default': () => ({
        ...options,
    }),
};

if (process.argv.length !== 3) {
    console.error(`unexpected number of arguments, expected 3 got ${process.argv.length}`);
    process.exit(1);
}

await esbuild
    .build(builds[process.argv[2]]())
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
