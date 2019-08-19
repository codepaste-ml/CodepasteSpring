const path = require('path');

module.exports = {
    entry: './src/main/webapp/index.js',
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src/main/resources/static')
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader']},
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            'babel-plugin-transform-class-properties',
                            ["prismjs", {
                                "languages": ['markup','css','clike','javascript','abap','abnf','actionscript','ada','apacheconf','apl','applescript','arduino','arff','asciidoc','asm6502','aspnet','autohotkey','autoit','bash','basic','batch','bison','bnf','brainfuck','bro','c','csharp','cpp','cil','coffeescript','cmake','clojure','crystal','csp','css-extras','d','dart','diff','django','dns-zone-file','docker','ebnf','eiffel','ejs','elixir','elm','erb','erlang','fsharp','flow','fortran','gcode','gedcom','gherkin','git','glsl','gml','go','graphql','groovy','haml','handlebars','haskell','haxe','hcl','http','hpkp','hsts','ichigojam','icon','inform7','ini','io','j','java','javadoc','javadoclike','javastacktrace','jolie','jq','jsdoc','js-extras','js-templates','json','jsonp','json5','julia','keyman','kotlin','latex','less','lilypond','liquid','lisp','livescript','lolcode','lua','makefile','markdown','markup-templating','matlab','mel','mizar','monkey','n1ql','n4js','nand2tetris-hdl','nasm','nginx','nim','nix','nsis','objectivec','ocaml','opencl','oz','parigp','parser','pascal','pascaligo','pcaxis','perl','php','phpdoc','php-extras','plsql','powershell','processing','prolog','properties','protobuf','pug','puppet','pure','python','q','qore','r','jsx','tsx','renpy','reason','regex','rest','rip','roboconf','ruby','rust','sas','sass','scss','scala','scheme','shell-session','smalltalk','smarty','soy','splunk-spl','sql','stylus','swift','tap','tcl','textile','toml','tt2','twig','typescript','t4-cs','t4-vb','t4-templating','vala','vbnet','velocity','verilog','vhdl','vim','visual-basic','wasm','wiki','xeora','xojo','xquery','yaml'],
                                "plugins": ["line-numbers"],
                                "theme": "default",
                                "css": true
                            }]]
                    }
                }]
            }
        ]
    }
};