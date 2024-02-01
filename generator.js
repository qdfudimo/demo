function performTask(role) {
    return new Promise((resolve, reject) => {
        // 模拟异步操作
        setTimeout(() => {
            resolve(`已处理角色：${role}`);
        }, Math.random() * 1000);
    });
}
async function processRoles() {
    let roles = ['admin', 'editor', 'employee'];
    let iterator = roles[Symbol.iterator]();
    let res = iterator.next();
    while (!res.done) {
        let value = res.value;
        console.log(value);
        console.log(await performTask(value));
        res = iterator.next();
    }
    console.log('任务处理完成');
}
processRoles()

/**
 * admin
已处理角色：admin
editor
已处理角色：editor
employee
已处理角色：employee
任务处理完成
https://github.com/xyxc0673/calendar-remark
 */