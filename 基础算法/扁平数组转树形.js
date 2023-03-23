var data = [
    { id: 1, pid: 0, name: '超市' },
    { id: 2, pid: 0, name: '生鲜区' },
    { id: 8, pid: 7, name: '烧烤味' },
    { id: 9, pid: 7, name: '黄瓜味' },
    { id: 3, pid: 1, name: '零食区' },
    { id: 4, pid: 2, name: '大虾' },
    { id: 5, pid: 2, name: '猪肉' },
    { id: 6, pid: 13, name: '卫生纸' },
    { id: 7, pid: 3, name: '薯片' },
];
//时间复杂度：O(n^2)，其中 n 是节点的数量。 空间复杂度：O(n^2)。 优缺点：不适合大规模数据。
function arrayToTreeRec(nodes, pid = null) {
    return nodes
      .filter((node) => node.pid === pid)
      .map((node) => ({ ...node, children: arrayToTreeRec(nodes, node.id) }));
  }
console.log(arrayToTreeRec(data, 0))
function arrayToTreeReduce(nodes,pid = 0) {
    const map = {};
    const tree = nodes.reduce((acc, node) => {
      map[node.id] = { ...node, children:(map[node.id] && map[node.id].children)|| [] };
      if (node.pid === pid) {
        acc.push(map[node.id]);
      } else {
        if (!map[node.pid]) {
            map[node.pid] = {
                children: []
            }
        }
        map[node.pid].children.push(map[node.id]);
      }
      return acc;
    }, []);
  
    return tree;
  }
  function arrayToTreeMap(nodes) {
    const map = new Map(nodes.map((node) => [node.id, { ...node, children: [] }]));
    const tree = [];
  
    for (const node of map.values()) {
      if (node.parentId === null) {
        tree.push(node);
      } else {
        map.get(node.parentId).children.push(node);
      }
    }
  
    return tree;
  }
  
//根据对象的引用关系
function recurrenceFilter(items) {
    const result = [];   // 存放结果集
    const itemMap = {};  // 
    for (const item of items) {
        const id = item.id;
        const pid = item.pid;
        itemMap[id] = { ...item, children: (itemMap[id]&&itemMap[id].children)||[] }
        const treeItem = itemMap[id];
        if (pid === 0) {
            result.push(treeItem);
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: [],
                }
            }
            itemMap[pid].children.push(treeItem)
        }
    }
    return result;
}
console.log(recurrenceFilter(data));
//有bug 数据混乱的情况下 还是会缺少
function recurrenceFilter(data) {
    var result = [];//存储结果
    var map = new Map(); //存在id,对应所在的内存地址
    var tempObj, pid;
    for (let i = 0; i < data.length; i++) {
        pid = data[i].pid;
        //map中存在pid
        if (map.has(pid)) {
            //存在pid则将些信息加入到对应id=pid的对象上的children
            // pid这项是否存在children
            if (!map.get(pid).children)        
                map.get(pid).children = [];
            var obj = new Object(data[i]);
            map.get(pid).children.push(obj);
            map.set(data[i].id, obj);
        } else if (!map.has(pid) && pid == 0) {
            //处理pid不存在且pid为0的情况
            // 1.将该项push到result
            // 2. id为key，该项对象为value存储
            tempObj = new Object(data[i]);
            result.push(tempObj);
            map.set(data[i].id, tempObj);
        }
    }
    return result;
}
