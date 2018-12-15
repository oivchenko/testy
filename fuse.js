
const {
    FuseBox,
    VueComponentPlugin,
    QuantumPlugin,
    HTMLPlugin,
//    ConsolidatePlugin,
//    JSONPlugin,
    SassPlugin,
    CSSModules,
    CSSPlugin,
    CSSResourcePlugin,
    WebIndexPlugin,
    PostCSSPlugin,
    Sparky
} = require("fuse-box");





let fuse;
let isProduction = false;

Sparky.task("set-prod", () => {
    isProduction = true;
});

Sparky.task("clean", () => Sparky.src("./dist").clean("dist/"));
Sparky.task("watch-assets", () => Sparky.watch("./assets", { base: "./src" }).dest("./dist"));
Sparky.task("copy-assets", () => Sparky.src("./assets", { base: "./src" }).dest("./dist"));
Sparky.task("copy-data", () => Sparky.src("./data/Tests.json", { base: "./src" }).dest("./dist"));


Sparky.task("config", () => {
    fuse = FuseBox.init({
        target: "browser@es5",
        homeDir: "./src",
        output: "dist/$name.js",
        //hash: isProduction,
        sourceMaps: !isProduction,
//        alias: { '@src':'~/' , '@components':'~/components/','@models':'~/models/','@data':'~/data/'},
        useTypescriptCompiler: true,
        allowSyntheticDefaultImports: true,
//        shim:{ vue:{ exports:"Vue"}},
        plugins: [
//            JSONPlugin(),
            VueComponentPlugin({
//                template: ConsolidatePlugin({ engine:"pug"  , baseDir:"src/components" , includeDir:"src/components"   }),
                style: [
                    SassPlugin({ importer: true }),
                    CSSResourcePlugin(),
                    PostCSSPlugin(),
                    CSSPlugin()
                ]
            }),
            [PostCSSPlugin(),CSSPlugin()],
            WebIndexPlugin({
                template: "./src/index.html"
            }),
            isProduction && QuantumPlugin({
                bakeApiIntoBundle: "vendor",
                uglify: true,
                treeshake: true
            })
        ]
    });

    if(!isProduction){
        fuse.dev({
            open: true,
            port: 8080
        });
    }

    const vendor = fuse.bundle("vendor")
        .instructions("~ index.ts");

    const app = fuse.bundle("app")
        .instructions("> [index.ts]");

    if(!isProduction){
        app.watch().hmr();
    }
});

Sparky.task("default", ["clean", "copy-data",/*"watch-assets",*/ "config"], () => {
    return fuse.run();
});

Sparky.task("dist", [ "clean", "set-prod", "config"], () => {
    return fuse.run();
});







