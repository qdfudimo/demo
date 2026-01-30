<template>
  <div class="container">
    <header>
      <h1><i class="fas fa-file-pdf"></i> 表格导出PDF示例</h1>
      <p class="subtitle">使用 jsPDF + AutoTable 生成专业报表</p>
    </header>

    <div class="controls">
      <button class="btn btn-primary" @click="handelTable">
        <i class="fas fa-download"></i> 导出基础表格
      </button>
      <button class="btn btn-secondary" @click="exportStyledTable()">
        <i class="fas fa-palette"></i> 导出样式表格
      </button>
      <button class="btn btn-warning" @click="handelTable1">
        <i class="fas fa-chart-bar"></i> 导出复杂报表
      </button>
      <button class="btn btn-primary">
        <i class="fas fa-code"></i> 从HTML导出
      </button>
    </div>
    <div style="padding: 6px">
      <table
        class="table pure-table"
        id="basic-table"
        border="1"
        cellspacing="0"
      >
        <tbody>
          <tr>
            <th>督办事项名称</th>
            <td colspan="3">211.56.242.221</td>
          </tr>
          <tr>
            <th>联系人</th>
            <td style="font-weight: 200; font-size: 32px">张飞</td>
            <th>联系方式</th>
            <td>18351867153</td>
          </tr>
          <tr>
            <th>督办时间</th>
            <td>2025-02-03</td>
            <th>要求办结时间</th>
            <td>2026-03-36</td>
          </tr>
          <tr>
            <th>责任单位</th>
            <td colspan="3">
              选选择起止时间选择起止时间选择起止时间选择起止时间选择起止时间选择起止时间择起止时间选择起止时间选择起止时间选择起止时间
            </td>
          </tr>
          <tr>
            <th>抄送</th>
            <td colspan="3">选择起止时间选择起止时间</td>
          </tr>
          <tr>
            <td colspan="4" class="td-content">
              <b>督办内容:</b
              >填报环节：一线工区/班组进行隐患管理流程单填报操作，其中内容包括：隐患内容、发现日期、隐患来源、隐患类型、隐患分级、隐患内容、隐患危害程度和隐患治理单位等信息。隐患分级为一般隐患发送至县公司级单位（部门）负责人/中心安全员评估，隐患分级较大隐患发送至地市公司级单位数字化职能管理部门评估，隐患分级为重大隐患发送至省公司单位数字化职能管理部门。
              评估认定环节：隐患评估分为（县公司级单位（部门）负责人/中心安全员评估、地市公司级单位数字化职能管理部门评估和省公司级单位数字化职能管理部门评估）。
              “县公司级单位（部门）负责人/中心安全员评估通过发送至地市级单位数字化职能管理部门审议，评估为“不通过”则退回至填报环节。
              “地市公司级单位数字化职能管理部门”（地市单位数字化部负责人）评估通过发送至省公司级单位数字化职能管理部门审议，评估不通过退回至填报环节。
              “省公司级单位数字化职能管理部门”（省公司数字化部负责人）评估隐患。
              隐患审议环节：
              地市公司级单位数字化职能管理部门审议通过发送至隐患治理单位接收并进行治理；审议不通过则退回至隐患评估（县公司级单位（部门）负责人/中心安全员）环节。
              省公司级单位数字化职能管理部门审议通过发送至隐患治理单位接收并进行隐患治理；审议不通过发送的则退回至隐患评估（地市公司级单位数字化职能管理部门）环节，
              总部数字化部审议通过则发送至隐患治理单位接收并进行治理，审议不通过退回至隐患评估（省公司级单位数字化职能管理部门）环节。
              隐患分派环节：
              隐患治理单位接收人分派隐患工单至隐患治理责任人进行治理。
              隐患治理环节：
              总部数字化部审议通过则发送至隐患治理单位接收并进行治理，审议不通过退回至隐患评估（省公司级单位数字化职能管理部门）环节。
              隐患分派环节：
              隐患治理单位接收人分派隐患工单至隐患治理责任人进行治理。
              隐患治理环节：
              隐患治理责任人对隐患内容进行治理，治理完成后则发送至隐患验收单位进行验收。隐患验收单位根据隐患评估最终隐患分级发送，具体见下列举
              隐患验收环节：隐患验收根据最终评估隐患分级发送至对应人员验收，见下列举。隐患验收成功后在隐患案例库增加一条数据，隐患案例编号规则为“单位简称-年份+4位流水号”。
              查看操作：点击工单编号打开并可查看已办工单记录详情，查看工单详情不展示未流转的环节信息。
              查看日志操作：点击【查看日志】按钮，显示隐患治理流程单日志弹窗；
              查看流程图操作：点击【查看流程图】按钮，显示隐患治理流程单流程图弹窗。
              撤回操作：点击【撤回】按钮，撤回如果本级，不涉及子流程，是已办的内容撤回到代办中，发送人员的待办不展示，只有发送至下一个人未审批才可撤回，若涉及到子流程
            </td>
          </tr>
          <tr>
            <th style="width: 25%;">发出单位名称</th>
            <td style="width: 25%;">Adam</td>
            <th style="width: 25%;">督办人（签字）</th>
            <td style="width: 25%;">李四dmoore0@furl.net2dmoore0@furl.net222dm22dmoore0@furl.net222</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="margin-top: 6px; padding: 6px">
      <table
        class="table1 pure-table"
        id="basic-table1"
        border="1"
        cellspacing="0"
      >
        <tbody>
          <tr>
            <td>1</td>
            <td>Donna</td>
            <td>Moore</td>
            <th>dmoore0@furl.net2222</th>
            <td>China</td>
            <td>211.56.242.221</td>
          </tr>
          <tr style="background: rgb(155, 89, 182); color: white">
            <td>2</td>
            <td>Janice</td>
            <td>Henry</td>
            <td>jhenry1@theatlantic.com</td>
            <td>Ukraine</td>
            <td>38.36.7.199</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Ruth</td>
            <td>Wells</td>
            <td>rwells2@constantcontact.com</td>
            <td>Mexico</td>
            <td>19.162.133.184</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Jason</td>
            <td>Ray</td>
            <td>jray3@psu.edu</td>
            <td>Brazil</td>
            <td>10.68.11.42</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Jane</td>
            <td>Stephens</td>
            <td>jstephens4@go.com</td>
            <td>United States</td>
            <td>47.32.129.71</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Adam</td>
            <td>Nichols</td>
            <td>anichols5@com.com</td>
            <td>Canada</td>
            <td>18.186.38.37<br />18.123.22.82</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-container">
      <table id="dataTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>部门</th>
            <th>职位</th>
            <th>状态</th>
            <th>入职日期</th>
            <th>薪资</th>
            <th>项目进度</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>001</td>
            <td><i class="fas fa-user"></i> 张三</td>
            <td>技术部</td>
            <td>前端工程师</td>
            <td><span class="status status-active">在职</span></td>
            <td>2022-03-15</td>
            <td>¥18,500</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill progress-70"></div>
              </div>
              <small>70%</small>
            </td>
          </tr>
          <tr>
            <td>002</td>
            <td><i class="fas fa-user"></i> 李四</td>
            <td>设计部</td>
            <td>UI设计师</td>
            <td><span class="status status-active">在职</span></td>
            <td>2021-08-22</td>
            <td>¥16,000</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill progress-85"></div>
              </div>
              <small>85%</small>
            </td>
          </tr>
          <tr>
            <td>003</td>
            <td><i class="fas fa-user"></i> 王五</td>
            <td>市场部</td>
            <td>营销经理</td>
            <td><span class="status status-pending">休假</span></td>
            <td>2020-11-30</td>
            <td>¥22,000</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill progress-60"></div>
              </div>
              <small>60%</small>
            </td>
          </tr>
          <tr>
            <td>004</td>
            <td><i class="fas fa-user"></i> 赵六</td>
            <td>技术部</td>
            <td>后端工程师</td>
            <td><span class="status status-active">在职</span></td>
            <td>2023-01-10</td>
            <td>¥20,000</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill progress-90"></div>
              </div>
              <small>90%</small>
            </td>
          </tr>
          <tr>
            <td>005</td>
            <td><i class="fas fa-user"></i> 钱七</td>
            <td>财务部</td>
            <td>财务主管</td>
            <td><span class="status status-inactive">离职</span></td>
            <td>2019-05-18</td>
            <td>¥25,000</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill progress-45"></div>
              </div>
              <small>45%</small>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="features">
      <h3><i class="fas fa-star"></i> 支持的PDF功能</h3>
      <ul>
        <li><i class="fas fa-check-circle"></i> 自动分页处理</li>
        <li><i class="fas fa-check-circle"></i> 自定义表格样式</li>
        <li><i class="fas fa-check-circle"></i> 页眉和页脚</li>
        <li><i class="fas fa-check-circle"></i> 图片和LOGO插入</li>
        <li><i class="fas fa-check-circle"></i> 多表格组合</li>
        <li><i class="fas fa-check-circle"></i> 表格合并与拆分</li>
        <li><i class="fas fa-check-circle"></i> 自定义字体支持</li>
        <li><i class="fas fa-check-circle"></i> 水印和背景图</li>
      </ul>
    </div>
  </div>
</template>
<script>
import "./util.js";
// import "./alimama-normal.js"
export default {
  mounted() {},
  methods: {
    handelTable1() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF("p", "pt", "a4");
      doc.autoTable({
        html: ".table1",
        startY: 80,
        theme: "grid",
        styles: {
          overflow: "linebreak",
          // cellWidth: "wrap",
          // overflow: 'linebreak',
          cellPadding: 5,
          // lineWidth: 0.5,
          // lineColor: [230, 230, 230]
        },
        bodyStyles: {
          fontSize: 14,
          cellPadding: 7,
          halign: "center",
        },
        useCss: true,
        margin: { left: 40, right: 40 },
        didParseCell: function (data) {
          // 根据状态设置颜色
          if (data.column.index === 0) {
            console.log(data);
            // if (data.cell.raw === "在职") {
            //   data.cell.styles.fillColor = [220, 252, 231];
            //   data.cell.styles.textColor = [21, 128, 61];
            // }
            // else if (data.cell.raw === "休假") {
            //   data.cell.styles.fillColor = [254, 243, 199];
            //   data.cell.styles.textColor = [146, 64, 14];
            // } else {
            //   data.cell.styles.fillColor = [254, 226, 226];
            //   data.cell.styles.textColor = [153, 27, 27];
            // }
          }
        },
        didDrawPage: function (data) {
          // 添加页脚
          // const pageCount = doc.internal.getNumberOfPages();
          // doc.setFontSize(10);
          // doc.setTextColor(150, 150, 150);
          // doc.text(`机密文件 - 第 ${data.pageNumber} 页 / 共 ${pageCount} 页`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 30, { align: 'center' });
          // 添加公司水印
          // doc.setFontSize(60);
          // doc.setTextColor(240, 240, 240);
          // doc.text(
          //   "tesstt",
          //   doc.internal.pageSize.width / 2,
          //   doc.internal.pageSize.height / 2,
          //   { align: "center", angle: 45 },
          // );
        },
      });
      console.log(doc);
      doc.save("样式丰富的员工报表.pdf");
    },
    handelTable() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF("p", "pt", "a4");
      // doc.setFont("alimama");
      doc.autoTable({
        html: ".table",
        startY: 80,
        theme: "grid",
        styles: {
          // font: "alimama",
          overflow: "linebreak",
          // cellWidth: "wrap",
          // overflow: 'linebreak',
          cellPadding: 5,
          // lineWidth: 0.5,
          // lineColor: [230, 230, 230]
        },
        columnStyles: {
          0: { cellWidth: (595.28 - 80) / 4 }, // ID
          1: { cellWidth: (595.28 - 80) / 4 }, // 姓名
          2: { cellWidth: (595.28 - 80) / 4 }, // 部门
          3: { cellWidth: (595.28 - 80) / 4 }, // 职位
        },
        bodyStyles: {
          fontSize: 14,
          cellPadding: 7,
          halign: "center",
          // font: "alimama",
        },
        useCss: true,
        margin: { left: 40, right: 40 },
        didParseCell: function (data) {
          // 根据状态设置颜色
          if (data.column.index === 0) {
            console.log(data);
            // if (data.cell.raw === "在职") {
            //   data.cell.styles.fillColor = [220, 252, 231];
            //   data.cell.styles.textColor = [21, 128, 61];
            // }
            // else if (data.cell.raw === "休假") {
            //   data.cell.styles.fillColor = [254, 243, 199];
            //   data.cell.styles.textColor = [146, 64, 14];
            // } else {
            //   data.cell.styles.fillColor = [254, 226, 226];
            //   data.cell.styles.textColor = [153, 27, 27];
            // }
          }
        },
        didDrawPage: function (data) {
          // 添加页脚
          // const pageCount = doc.internal.getNumberOfPages();
          // doc.setFontSize(10);
          // doc.setTextColor(150, 150, 150);
          // doc.text(`机密文件 - 第 ${data.pageNumber} 页 / 共 ${pageCount} 页`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 30, { align: 'center' });
          // 添加公司水印
          // doc.setFontSize(60);
          // doc.setTextColor(240, 240, 240);
          // doc.text(
          //   "tesstt",
          //   doc.internal.pageSize.width / 2,
          //   doc.internal.pageSize.height / 2,
          //   { align: "center", angle: 45 },
          // );
        },
      });
      console.log(doc);
      doc.save("样式丰富的员工报表.pdf");

      // From Javascript
      // var finalY = doc.lastAutoTable.finalY || 10;
      // doc.text("From javascript arrays", 14, finalY + 15);
      // doc.autoTable({
      //   startY: finalY + 20,
      //   head: [["ID22", "Name", "Email", "Country", "IP-address"]],
      //   body: [
      //     ["1", "Donna", "dmoore0@furl.net", "China", "211.56.242.221"],
      //     ["2", "Janice", "jhenry1@theatlantic.com", "Ukraine", "38.36.7.199"],
      //     [
      //       "3",
      //       "Ruth",
      //       "rwells2@constantcontact.com",
      //       "Trinidad and Tobago",
      //       "19.162.133.184",
      //     ],
      //     ["4", "Jason", "jray3@psu.edu", "Brazil", "10.68.11.42"],
      //     ["5", "Jane", "jstephens4@go.com", "United States", "47.32.129.71"],
      //     ["6", "Adam", "anichols5@com.com", "Canada", "18.186.38.37"],
      //   ],
      // });

      // finalY = doc.lastAutoTable.finalY;
      // doc.text("From HTML with CSS", 14, finalY + 15);
      // doc.autoTable({
      //   startY: finalY + 20,
      //   html: ".table",
      //   useCss: true,
      // });
    },
    exportStyledTable() {
      // 确保jsPDF可用
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF("p", "pt", "a4");
      doc.setFont("alimama");
      // var columns = [
      //     { header: "111", dataKey: "name" },
      //     {
      //         header: "222", dataKey: "info", createCell: function (cell, data) {
      //             if (data.info === "__span") {
      //                 cell.rowSpan = 2; // 跨两行
      //                 cell.text = ""; // 不显示文本，因为我们已经在上一行显示了
      //             } else {
      //                 cell.text = data.info;
      //             }
      //         }
      //     }
      // ];
      // var data = [
      //     { name: "555", info: "aa：28" },
      //     { name: "", info: "__span" }, // 这行将与上一行合并，不显示内容
      //     { name: "nnn", info: "aa：32" }
      // ];

      // doc.autoTable(columns, data);
      // doc.save("table.pdf");

      // return
      // 添加标题和副标题
      doc.setFontSize(24);
      doc.setTextColor(79, 70, 229);
      doc.text("信息系统上线工作督办单", doc.internal.pageSize.width / 2, 50, {
        align: "center",
      });
      // doc.setFontSize(14);
      // doc.setTextColor(100, 116, 139);
      // doc.text('2023年度第二季度', doc.internal.pageSize.width / 2, 80, { align: 'center' });

      // 添加公司信息
      // doc.setFontSize(11);
      // doc.setTextColor(71, 85, 105);
      // doc.text('公司名称: 示例科技有限公司', 50, 110);
      // doc.text('报表类型: 人力资源报告', 50, 130);
      // doc.text(`生成时间: ${new Date().toLocaleString()}`, doc.internal.pageSize.width - 50, 110, { align: 'right' });

      // 表格数据
      const tableData = [
        {
          status: "督办事项名称",
          salary: "督办事项编号、督办事项名称、责任单位、督办内容、联系人",
        },
        {
          status: "联系人",
          salary: "张飞",
          joinDate: "联系电话及邮箱",
          performance: 18351867153,
        },
        {
          status: "督办时间",
          salary: "2025-01-24",
          joinDate: "要求办结时间",
          performance: "2026-01-23",
        },
        { status: "责任单位", salary: "xxxx有限公司" },
        {
          status: "抄送",
          salary:
            "李四、张三、王五、赵六、小王、小张、小王、小张、小王、小张、小王、小张、小王、小张、小王、小张、小王、小张、小王、小张、小王、小张、小王、小张、小王、小张、小王、小张、小王、小张、小王、小张、小",
        },
        { status: "督办内容：要求办结时间：选择起止时间（年月日形式）" },
        {
          status: "发出单位名称",
          salary: "xxxx有限公司",
          joinDate: "代办人（签字）",
          performance: "王五",
        },
      ];

      // 转换数据为表格格式
      const tableRows = tableData.map((row) => [
        row.status,
        row.salary,
        row.joinDate,
        row.performance,
      ]);

      // 生成主表格
      doc.autoTable({
        // head: [['员工ID', '姓名', '部门', '职位', '状态', '入职日期', '薪资', '绩效']],
        body: tableRows,
        startY: 80,
        theme: "grid",
        headStyles: {
          fillColor: [15, 118, 110],
          textColor: 255,
          fontSize: 12,
          fontStyle: "bold",
          halign: "center",
        },
        // tableWidth: '100%',  // 使用100%页面宽度
        styles: {
          font: "alimama",
          overflow: "linebreak",
          // cellWidth: "wrap",
          // overflow: 'linebreak',
          // cellPadding: 5,
          // lineWidth: 0.5,
          // lineColor: [230, 230, 230]
        },
        bodyStyles: {
          fontSize: 11,
          cellPadding: 7,
          halign: "center",
          font: "alimama",
        },
        margin: { left: 40, right: 40 },
        columnStyles: {
          0: { cellWidth: (595.28 - 80) / 4 }, // ID
          1: { cellWidth: (595.28 - 80) / 4 }, // 姓名
          2: { cellWidth: (595.28 - 80) / 4 }, // 部门
          3: { cellWidth: (595.28 - 80) / 4 }, // 职位
        },
        didParseCell: function (data) {
          console.log(data);

          // 根据状态设置颜色
          if (data.column.index === 4) {
            if (data.cell.raw === "在职") {
              data.cell.styles.fillColor = [220, 252, 231];
              data.cell.styles.textColor = [21, 128, 61];
            } else if (data.cell.raw === "休假") {
              data.cell.styles.fillColor = [254, 243, 199];
              data.cell.styles.textColor = [146, 64, 14];
            } else {
              data.cell.styles.fillColor = [254, 226, 226];
              data.cell.styles.textColor = [153, 27, 27];
            }
          }
        },
        didDrawPage: function (data) {
          // 添加页脚
          // const pageCount = doc.internal.getNumberOfPages();
          // doc.setFontSize(10);
          // doc.setTextColor(150, 150, 150);
          // doc.text(`机密文件 - 第 ${data.pageNumber} 页 / 共 ${pageCount} 页`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 30, { align: 'center' });

          // 添加公司水印
          doc.setFontSize(60);
          doc.setTextColor(240, 240, 240);
          doc.text(
            "tesstt",
            doc.internal.pageSize.width / 2,
            doc.internal.pageSize.height / 2,
            { align: "center", angle: 45 },
          );
        },
      });
      doc.save("样式丰富的员工报表.pdf");
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

header {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  padding: 30px;
  text-align: center;
}

h1 {
  font-size: 2.8rem;
  margin-bottom: 10px;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.controls {
  padding: 25px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 160px;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(135deg, #10b981, #34d399);
  color: white;
}

.btn-secondary {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  color: white;
}

.btn-warning {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  color: white;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(-1px);
}

.btn i {
  font-size: 18px;
}

.table-container {
  padding: 30px;
  overflow-x: auto;
}

#dataTable {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

#dataTable th {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  font-weight: 600;
  padding: 18px 15px;
  text-align: left;
  position: sticky;
  top: 0;
}

#dataTable td {
  padding: 16px 15px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

#dataTable tr:hover {
  background-color: #f8fafc;
}

#dataTable tr:nth-child(even) {
  background-color: #f8fafc;
}

.status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.status-active {
  background-color: #d1fae5;
  color: #065f46;
}

.status-pending {
  background-color: #fef3c7;
  color: #92400e;
}

.status-inactive {
  background-color: #fee2e2;
  color: #991b1b;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: #e5e7eb;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 5px;
}

.progress-70 {
  width: 70%;
  background: linear-gradient(90deg, #10b981, #34d399);
}

.progress-85 {
  width: 85%;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
}

.progress-60 {
  width: 60%;
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
}

.progress-90 {
  width: 90%;
  background: linear-gradient(90deg, #8b5cf6, #a78bfa);
}

.progress-45 {
  width: 45%;
  background: linear-gradient(90deg, #ef4444, #f87171);
}

.features {
  padding: 25px 30px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.features h3 {
  margin-bottom: 15px;
  color: #1e293b;
  font-size: 1.5rem;
}

.features ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
  list-style: none;
}

.features li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
}

.features li i {
  color: #4f46e5;
  font-size: 20px;
}

@media (max-width: 768px) {
  body {
    padding: 20px 10px;
  }

  .container {
    border-radius: 15px;
  }

  h1 {
    font-size: 2rem;
  }

  .btn {
    width: 100%;
  }

  .controls {
    flex-direction: column;
  }

  .table-container {
    padding: 15px;
  }
}
.pure-table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  color: rgba(0, 0, 0, 0.65);
}
.pure-table tr {
  height: 64px;
}
.pure-table th {
  padding: 10px;
}
.pure-table td {
  padding: 10px;
  word-wrap:break-word;
}
.pure-table .td-content {
  line-height: 10mm;
  text-align: left;
}
</style>
