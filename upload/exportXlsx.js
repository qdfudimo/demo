const fs = require('fs')
const path = require('path')
const nodexlsx = require('node-xlsx').default
var data = [];
var title = ['姓名', '性别', '联系电话', '身份证号'];
//获取数据库数据
//var result = [];
//results = getresult();
var results = [{
        'name': '张三',
        'gender': '女',
        'mobile': '18888888888',
        'idcard': '110000000000000000'
    },
    {
        'name': '李四',
        'gender': '男',
        'mobile': '18888888888',
        'idcard': '110000000000000000'
    },
    {
        'name': '王五',
        'gender': '女',
        'mobile': '18888888888',
        'idcard': '110000000000000000'
    }
];
//先把title加到data
data.push(title);
//再把每一行数据加进去
results.forEach(function (result) {
    var ele = [];
    ele.push(result.name);
    ele.push(result.gender);
    ele.push(result.mobile);
    ele.push(result.idCard);
    data.push(ele);
});
//由于各列数据长度不同，可以设置一下列宽
const sheetOptions = {
    sheetOptions: {
        '!cols': [{
            wch: 10
        }, {
            wch: 5
        }, {
            wch: 15
        }, {
            wch: 20
        }]
    }
};
//生成表格
var buffer = nodexlsx.build([{
    name: 'sheet1',
    data: data
}], sheetOptions);
var filePath = './tmp/text1.xlsx';
fs.writeFileSync(filePath, buffer, {
    'flag': 'w'
});