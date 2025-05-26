window.global = {
  prefixUrl: '/minio/record-avatar/',
  filePrefixUrl: '/minio',
  fileSystemUrl:"",//文件系统的地址 如果不设置的话默认取当前窗口的地址
  filePreviewUrl: 'https://172.26.10.16:8001',
  // fileSystemUrl: 'https://172.26.5.112:8081',
  streetViewFeatureLayerUrl:
    'https://tangf.arcgis.online/server/rest/services/Vietnam/XianGang/FeatureServer', //街景地图的数据图层地址 通过渲染这个图层可以在地图上渲染有街景的坐标点 通过这些点和地图图片的对应关系渲染对应的街景地图
  streetViewImageUrl: '/streetView', //街景地图的地图瓦片地址 例如完整的瓦片地址是这个 https://172.26.10.16:8001/streetView/AF1QipO5wwHqpKvidfG2fME9Erzr3O08eXHuoWMX8kg8/x7-y0-z3.jpg 那这里就填 /streetView
};

window.difyChatbotConfig = {
  token: 'i9LpfGGSvZSMb87k',
  baseUrl: 'https://172.26.10.16:8003',
};
