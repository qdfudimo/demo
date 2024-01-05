/*! build-version-plugin v0.1.3 | MIT */
function dateFormat(fmt, date) {
    //author: meizz 
    var o = {
        "M+": date.getMonth() + 1,
        //月份 
        "d+": date.getDate(),
        //日 
        "h+": date.getHours(),
        //小时 
        "m+": date.getMinutes(),
        //分 
        "s+": date.getSeconds(),
        //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3),
        //季度 
        "S": date.getMilliseconds() //毫秒 

    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));

    return fmt;
}

const childProcess = require('child_process');
let state = 'success'; // git 提交记录信息 https://git-scm.com/docs/git-show    https://git-scm.com/docs/git

let builder = '';
let commitHash = '';
let localBranchName = '';
let branchName = '';
let commitDate = new Date();
let lastCommitDateObj = new Date();
let localState = '';
let commitContent = '';

try {
    builder = childProcess.execSync('git config user.name').toString().trim();
    commitHash = childProcess.execSync('git show -s --format=%H').toString().trim();
    localBranchName = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    commitContent = childProcess.execSync('git log -1').toString().trim();
    branchName = childProcess.execSync(`git rev-parse --abbrev-ref ${localBranchName}@{upstream}`).toString().trim();
    lastCommitDateObj = new Date(childProcess.execSync('git show -s --format=%cd').toString());
    localState = childProcess.execSync('git status -s').toString().trim().replace(/\n/g, ' ---- ');

    if (localState.length > 0) {
        state = 'warning';
        builder = encodeURIComponent(builder);
    } else {
        state = 'success';
    }
} catch (error) {
    state = 'error';
}

commitDate = dateFormat('yyyy-MM-dd hh:mm:ss', lastCommitDateObj);
const buildDate = dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
var baseInfo = {
    state,
    builder,
    localBranchName,
    commitHash,
    branchName,
    commitDate,
    buildDate,
    commitContent,
    localState
};
const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5])
console.log(buf,JSON.stringify(buf));
console.log(baseInfo);
const pluginName = 'BuildVersionPlugin';
/**
 * 在生产环境打包的时候，给 html 中插入 vue 相关的静态资源的地址
 * 优化首屏加载速度、还要配置webpack打包的时候，不打包相关的资源
 */

class BuildVersionPlugin {
    constructor(options) {
        this.name = '';
        this.version = '';

        for (const option in options) {
            // eslint-disable-next-line no-prototype-builtins
            if (options.hasOwnProperty(option)) {
                if (options[option]) {
                    this[option] = options[option];
                }
            }
        }

        baseInfo.name = this.name;
        baseInfo.version = this.version;
    }

    apply(compiler) {
        if (compiler.hooks) {
            compiler.hooks.compilation.tap(pluginName, compilation => {
                compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(pluginName, this.addVersion);
            });
        } else {
            compiler.plugin('compilation', compilation => {
                compilation.plugin('html-webpack-plugin-before-html-processing', this.addVersion);
            });
        }
    }

    addVersion(data, callback) {
        let versionMessage = '';

        if (baseInfo.state === 'warning') {
            versionMessage = `
  <script>
    console.groupCollapsed('%c Version %c ${baseInfo.name}-${baseInfo.version}%c', 'background:#E6A23C ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#35495e ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff', 'background:transparent')
    console.log('分支名称. . . . . . . . : ${baseInfo.branchName}')
    console.log('本地分支. . . . . . . . : ${baseInfo.localBranchName}')
    console.log('提交哈希. . . . . . . . : ${baseInfo.commitHash}')
    console.log('最后一次提交commit. . . . . . . . : ${baseInfo.commitContent}')
    console.log('提交时间. . . . . . . . : ${baseInfo.commitDate}')
    console.log('构建时间. . . . . . . . : ${baseInfo.buildDate}')
    console.log('构建人员. . . . . . . . : ${baseInfo.builder}')
    console.log('本地未提交文件 . . . . . : ${baseInfo.localState}')
    console.groupEnd()
  </script>
  </head>
  `;
        } else if (baseInfo.state === 'success') {
            versionMessage = `
  <script>
    console.groupCollapsed('%c Version %c ${baseInfo.name}-${baseInfo.version}%c', 'background:#41b883 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#35495e ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff', 'background:transparent')
    console.log('分支名称. . . . . . . . : ${baseInfo.branchName}')
    console.log('本地分支. . . . . . . . : ${baseInfo.localBranchName}')
    console.log('提交哈希. . . . . . . . : ${baseInfo.commitHash}')
    console.log('最后一次提交commit. . . . . . . . : ${baseInfo.commitContent}')
    console.log('提交时间. . . . . . . . : ${baseInfo.commitDate}')
    console.log('构建时间. . . . . . . . : ${baseInfo.buildDate}')
    console.groupEnd()
  </script>
  </head>
  `;
        } else {
            versionMessage = `
  <script>
    console.groupCollapsed('%c Version %c ${baseInfo.name}-${baseInfo.version}%c', 'background:#c41a16 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#35495e ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff', 'background:transparent')
    console.log('构建时间. . . . . . . . : ${baseInfo.buildDate}')
    console.groupEnd()
  </script>
  </head>
        `;
        }

        const newHtml = data.html.replace('</head>', versionMessage);
        data.html = newHtml;

        if (callback) {
            callback();
        }
    }

}

module.exports = BuildVersionPlugin;