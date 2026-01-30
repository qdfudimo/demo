// js/pdf-export.js
// PDF导出功能模块

(function() {
    'use strict';
    
    // 检查依赖
    // if (typeof window.jspdf === 'undefined') {
    //     console.error('jsPDF未加载');
    //     return;
    // }
    
    // if (typeof window.jspdf.AutoTable === 'undefined') {
    //     console.error('jspdf-autotable未加载');
    //     return;
    // }
    
    // 示例数据
    const sampleData = {
        // 简单表格数据
        simpleTable: {
            title: '产品库存表',
            headers: ['ID', '产品名称', '类别', '价格', '库存', '状态'],
            rows: [
                ['001', '笔记本电脑', '电子产品', '¥6,599', '25', '有货'],
                ['002', '智能手机', '电子产品', '¥3,299', '42', '有货'],
                ['003', '无线耳机', '配件', '¥899', '0', '缺货'],
                ['004', '机械键盘', '外设', '¥1,299', '15', '低库存'],
                ['005', '显示器', '外设', '¥2,199', '8', '低库存']
            ]
        },
        
        // 发票数据
        invoice: {
            company: '示例科技有限公司',
            address: '北京市朝阳区建国路88号',
            phone: '010-12345678',
            invoiceNo: 'INV20231027001',
            customer: '张三',
            customerAddress: '上海市浦东新区',
            date: new Date().toLocaleDateString('zh-CN'),
            items: [
                { id: '001', name: '笔记本电脑', spec: 'i7/16GB/512GB', unit: '台', quantity: 2, price: 6599, total: 13198 },
                { id: '002', name: '无线鼠标', spec: '蓝牙5.0', unit: '个', quantity: 5, price: 89, total: 445 },
                { id: '003', name: 'USB扩展坞', spec: '7合1', unit: '个', quantity: 3, price: 199, total: 597 },
                { id: '004', name: '电脑包', spec: '15.6寸', unit: '个', quantity: 2, price: 159, total: 318 }
            ]
        },
        
        // 报表数据
        report: {
            title: '2023年第三季度销售报表',
            period: '2023年7月 - 2023年9月',
            departments: [
                { name: '华东区', target: 850, actual: 920, growth: 12.5 },
                { name: '华南区', target: 780, actual: 810, growth: 9.2 },
                { name: '华北区', target: 920, actual: 890, growth: 6.8 },
                { name: '华中区', target: 650, actual: 720, growth: 15.3 },
                { name: '西南区', target: 580, actual: 610, growth: 8.9 }
            ],
            products: [
                { name: '智能手机', q1: 1250, q2: 1380, q3: 1520 },
                { name: '笔记本电脑', q1: 980, q2: 1050, q3: 1120 },
                { name: '平板电脑', q1: 720, q2: 780, q3: 850 },
                { name: '智能手表', q1: 550, q2: 620, q3: 690 }
            ]
        },
        
        // 员工数据
        employees: [
            { id: '001', name: '张三', department: '技术部', position: '前端工程师', salary: 18500, joinDate: '2022-03-15' },
            { id: '002', name: '李四', department: '设计部', position: 'UI设计师', salary: 16000, joinDate: '2021-08-22' },
            { id: '003', name: '王五', department: '市场部', position: '营销经理', salary: 22000, joinDate: '2020-11-30' },
            { id: '004', name: '赵六', department: '技术部', position: '后端工程师', salary: 20000, joinDate: '2023-01-10' },
            { id: '005', name: '钱七', department: '财务部', position: '财务主管', salary: 25000, joinDate: '2019-05-18' }
        ]
    };
    
    /**
     * 导出简单表格
     */
    async function exportSimpleTable() {
        try {
            showStatus('正在生成简单表格...', 'info');
            
            const doc = await window.ChineseFonts.createPDF('p', 'mm', 'a4');
            const data = sampleData.simpleTable;
            
            // 添加标题
            doc.setFontSize(20);
            doc.text(data.title, doc.internal.pageSize.width / 2, 20, { align: 'center' });
            
            // 添加日期
            doc.setFontSize(11);
            doc.text(`生成日期: ${new Date().toLocaleDateString('zh-CN')}`, doc.internal.pageSize.width / 2, 30, { align: 'center' });
            
            // 准备表格数据
            const tableRows = data.rows.map(row => [...row]);
            
            // 设置表格选项（确保中文字体）
            const tableOptions = window.ChineseFonts.setTableFont(doc, {
                head: [data.headers],
                body: tableRows,
                startY: 40,
                theme: 'grid',
                headStyles: {
                    fillColor: [106, 17, 203],
                    textColor: 255
                },
                columnStyles: {
                    0: { cellWidth: 20 },
                    1: { cellWidth: 40 },
                    3: { halign: 'right' },
                    4: { halign: 'center' },
                    5: { 
                        cellWidth: 30,
                        halign: 'center'
                    }
                },
                didParseCell: function(data) {
                    // 根据库存状态设置颜色
                    if (data.column.index === 5) {
                        if (data.cell.raw === '有货') {
                            data.cell.styles.fillColor = [212, 237, 218];
                            data.cell.styles.textColor = [21, 87, 36];
                        } else if (data.cell.raw === '缺货') {
                            data.cell.styles.fillColor = [248, 215, 218];
                            data.cell.styles.textColor = [114, 28, 36];
                        } else if (data.cell.raw === '低库存') {
                            data.cell.styles.fillColor = [255, 243, 205];
                            data.cell.styles.textColor = [133, 100, 4];
                        }
                    }
                }
            });
            
            // 生成表格
            doc.autoTable(tableOptions);
            
            // 添加页脚
            addFooter(doc, '简单表格');
            
            // 保存PDF
            doc.save('产品库存表.pdf');
            
            showStatus('表格导出成功', 'success');
        } catch (error) {
            console.error('导出简单表格失败:', error);
            showStatus(`导出失败: ${error.message}`, 'error');
        }
    }
    
    /**
     * 导出发票
     */
    async function exportInvoice() {
        try {
            showStatus('正在生成发票...', 'info');
            
            const doc = await window.ChineseFonts.createPDF('p', 'mm', 'a4');
            const invoice = sampleData.invoice;
            
            // 公司信息
            doc.setFontSize(16);
            doc.text(invoice.company, 20, 20);
            
            doc.setFontSize(10);
            doc.text(`地址: ${invoice.address}`, 20, 28);
            doc.text(`电话: ${invoice.phone}`, 20, 34);
            
            // 发票标题
            doc.setFontSize(24);
            doc.text('增值税普通发票', doc.internal.pageSize.width / 2, 50, { align: 'center' });
            
            // 发票信息
            doc.setFontSize(11);
            doc.text(`发票号码: ${invoice.invoiceNo}`, doc.internal.pageSize.width - 20, 20, { align: 'right' });
            doc.text(`开票日期: ${invoice.date}`, doc.internal.pageSize.width - 20, 26, { align: 'right' });
            
            // 客户信息
            doc.text('购货单位:', 20, 65);
            doc.text(invoice.customer, 50, 65);
            doc.text(`地址: ${invoice.customerAddress}`, 20, 71);
            
            // 表格数据
            const tableHeaders = ['序号', '货物名称', '规格型号', '单位', '数量', '单价', '金额'];
            const tableRows = invoice.items.map((item, index) => [
                index + 1,
                item.name,
                item.spec,
                item.unit,
                item.quantity,
                `¥${item.price.toLocaleString('zh-CN')}`,
                `¥${item.total.toLocaleString('zh-CN')}`
            ]);
            
            // 计算合计
            const totalAmount = invoice.items.reduce((sum, item) => sum + item.total, 0);
            const tax = totalAmount * 0.13;
            const totalWithTax = totalAmount + tax;
            
            tableRows.push(['', '', '', '', '', '合计:', `¥${totalAmount.toLocaleString('zh-CN')}`]);
            tableRows.push(['', '', '', '', '', '税额(13%):', `¥${tax.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}`]);
            tableRows.push(['', '', '', '', '', '价税合计:', `¥${totalWithTax.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}`]);
            
            // 生成表格
            const tableOptions = window.ChineseFonts.setTableFont(doc, {
                head: [tableHeaders],
                body: tableRows,
                startY: 80,
                theme: 'striped',
                headStyles: {
                    fillColor: [37, 117, 252],
                    textColor: 255
                },
                columnStyles: {
                    0: { cellWidth: 15 },
                    1: { cellWidth: 40 },
                    2: { cellWidth: 30 },
                    4: { halign: 'center' },
                    5: { halign: 'right' },
                    6: { 
                        halign: 'right',
                        fontStyle: 'bold'
                    }
                },
                margin: { left: 15, right: 15 }
            });
            
            doc.autoTable(tableOptions);
            
            // 大写金额
            const finalY = doc.lastAutoTable.finalY + 15;
            doc.setFontSize(11);
            doc.text(`大写金额: ${convertCurrency(totalWithTax)}`, 20, finalY);
            
            // 签字区域
            doc.text('销售单位(盖章):', 20, finalY + 20);
            doc.text('开票人:', 20, finalY + 30);
            doc.text('收款人:', 120, finalY + 30);
            doc.text('复核人:', 20, finalY + 40);
            
            // 页脚
            addFooter(doc, '发票');
            
            // 保存
            doc.save(`发票_${invoice.invoiceNo}.pdf`);
            
            showStatus('发票导出成功', 'success');
        } catch (error) {
            console.error('导出发票失败:', error);
            showStatus(`导出失败: ${error.message}`, 'error');
        }
    }
    
    /**
     * 导出报表
     */
    async function exportReport() {
        try {
            showStatus('正在生成销售报表...', 'info');
            
            const doc = await window.ChineseFonts.createPDF('l', 'mm', 'a4');
            const report = sampleData.report;
            
            // 报表标题
            doc.setFontSize(22);
            doc.text(report.title, doc.internal.pageSize.width / 2, 20, { align: 'center' });
            
            doc.setFontSize(14);
            doc.text(report.period, doc.internal.pageSize.width / 2, 30, { align: 'center' });
            
            // 部门业绩表格
            const deptHeaders = ['区域', '销售目标(万元)', '实际完成(万元)', '完成率', '同比增长'];
            const deptRows = report.departments.map(dept => {
                const rate = ((dept.actual / dept.target) * 100).toFixed(2);
                return [
                    dept.name,
                    dept.target.toLocaleString('zh-CN'),
                    dept.actual.toLocaleString('zh-CN'),
                    `${rate}%`,
                    `${dept.growth}%`
                ];
            });
            
            // 计算总计
            const totalTarget = report.departments.reduce((sum, d) => sum + d.target, 0);
            const totalActual = report.departments.reduce((sum, d) => sum + d.actual, 0);
            const totalRate = ((totalActual / totalTarget) * 100).toFixed(2);
            
            deptRows.push(['总计', totalTarget.toLocaleString('zh-CN'), totalActual.toLocaleString('zh-CN'), `${totalRate}%`, '-']);
            
            const deptOptions = window.ChineseFonts.setTableFont(doc, {
                head: [deptHeaders],
                body: deptRows,
                startY: 45,
                theme: 'grid',
                headStyles: {
                    fillColor: [119, 153, 0],
                    textColor: 255
                },
                columnStyles: {
                    0: { cellWidth: 40 },
                    1: { halign: 'right' },
                    2: { halign: 'right' },
                    3: { halign: 'center' },
                    4: { halign: 'center' }
                },
                didParseCell: function(data) {
                    // 高亮完成率
                    if (data.column.index === 3 && data.row.index < deptRows.length - 1) {
                        const rate = parseFloat(data.cell.raw);
                        if (rate >= 105) {
                            data.cell.styles.fillColor = [220, 252, 231];
                            data.cell.styles.textColor = [21, 128, 61];
                            data.cell.styles.fontStyle = 'bold';
                        } else if (rate < 95) {
                            data.cell.styles.fillColor = [254, 226, 226];
                            data.cell.styles.textColor = [153, 27, 27];
                        }
                    }
                }
            });
            
            doc.autoTable(deptOptions);
            
            // 产品销量表格
            const productHeaders = ['产品名称', '第一季度', '第二季度', '第三季度', '季度增长'];
            const productRows = report.products.map(product => {
                const growth = ((product.q3 - product.q2) / product.q2 * 100).toFixed(1);
                return [
                    product.name,
                    product.q1.toLocaleString('zh-CN'),
                    product.q2.toLocaleString('zh-CN'),
                    product.q3.toLocaleString('zh-CN'),
                    `${growth}%`
                ];
            });
            
            const productOptions = window.ChineseFonts.setTableFont(doc, {
                head: [productHeaders],
                body: productRows,
                startY: doc.lastAutoTable.finalY + 20,
                theme: 'striped',
                headStyles: {
                    fillColor: [153, 0, 102],
                    textColor: 255
                },
                columnStyles: {
                    0: { cellWidth: 50 },
                    1: { halign: 'right' },
                    2: { halign: 'right' },
                    3: { halign: 'right' },
                    4: { 
                        halign: 'center',
                        cellWidth: 40
                    }
                }
            });
            
            doc.autoTable(productOptions);
            
            // 分析总结
            const finalY = doc.lastAutoTable.finalY + 20;
            doc.setFontSize(16);
            doc.text('业绩分析', 20, finalY);
            
            doc.setFontSize(11);
            const analysis = [
                `1. 第三季度总销售额: ${totalActual.toLocaleString('zh-CN')}万元，完成率: ${totalRate}%`,
                '2. 华中区表现最为突出，完成率达110.77%',
                '3. 智能手机产品线增长迅速，季度增长达22.6%',
                '4. 建议加强华北区市场推广，提升市场份额'
            ];
            
            analysis.forEach((item, index) => {
                doc.text(item, 25, finalY + 10 + (index * 7));
            });
            
            // 添加水印
            addWatermark(doc, '公司机密');
            
            // 页脚
            addFooter(doc, '销售报表');
            
            doc.save('销售报表.pdf');
            
            showStatus('报表导出成功', 'success');
        } catch (error) {
            console.error('导出报表失败:', error);
            showStatus(`导出失败: ${error.message}`, 'error');
        }
    }
    
    /**
     * 导出员工表格
     */
    async function exportEmployeeTable() {
        try {
            showStatus('正在生成员工信息表...', 'info');
            
            const doc = await window.ChineseFonts.createPDF('p', 'mm', 'a4');
            const employees = sampleData.employees;
            
            // 标题
            doc.setFontSize(20);
            doc.text('员工信息表', doc.internal.pageSize.width / 2, 20, { align: 'center' });
            
            doc.setFontSize(11);
            doc.text(`生成时间: ${new Date().toLocaleString('zh-CN')}`, doc.internal.pageSize.width / 2, 30, { align: 'center' });
            doc.text(`共 ${employees.length} 名员工`, doc.internal.pageSize.width / 2, 36, { align: 'center' });
            
            // 表格数据
            const headers = ['员工ID', '姓名', '部门', '职位', '薪资', '入职日期'];
            const rows = employees.map(emp => [
                emp.id,
                emp.name,
                emp.department,
                emp.position,
                `¥${emp.salary.toLocaleString('zh-CN')}`,
                emp.joinDate
            ]);
            
            // 薪资统计
            const avgSalary = employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length;
            const maxSalary = Math.max(...employees.map(emp => emp.salary));
            const minSalary = Math.min(...employees.map(emp => emp.salary));
            
            rows.push(['', '', '', '', '', '']);
            rows.push(['', '', '', '平均薪资:', `¥${avgSalary.toLocaleString('zh-CN', { maximumFractionDigits: 0 })}`, '']);
            rows.push(['', '', '', '最高薪资:', `¥${maxSalary.toLocaleString('zh-CN')}`, '']);
            rows.push(['', '', '', '最低薪资:', `¥${minSalary.toLocaleString('zh-CN')}`, '']);
            
            const tableOptions = window.ChineseFonts.setTableFont(doc, {
                head: [headers],
                body: rows.slice(0, -3),
                foot: [rows[rows.length - 3], rows[rows.length - 2], rows[rows.length - 1]],
                startY: 45,
                theme: 'striped',
                headStyles: {
                    fillColor: [0, 123, 255],
                    textColor: 255
                },
                columnStyles: {
                    0: { cellWidth: 25 },
                    1: { cellWidth: 30 },
                    2: { cellWidth: 30 },
                    3: { cellWidth: 40 },
                    4: { 
                        halign: 'right',
                        fontStyle: 'bold'
                    },
                    5: { halign: 'center' }
                },
                footStyles: {
                    fontStyle: 'bold',
                    fillColor: [248, 249, 250]
                },
                margin: { left: 15, right: 15 }
            });
            
            doc.autoTable(tableOptions);
            
            // 部门分布
            const finalY = doc.lastAutoTable.finalY + 15;
            doc.setFontSize(14);
            doc.text('部门分布', 20, finalY);
            
            doc.setFontSize(11);
            const deptCount = {};
            employees.forEach(emp => {
                deptCount[emp.department] = (deptCount[emp.department] || 0) + 1;
            });
            
            let yPos = finalY + 10;
            for (const [dept, count] of Object.entries(deptCount)) {
                doc.text(`${dept}: ${count}人`, 25, yPos);
                yPos += 7;
            }
            
            addFooter(doc, '员工信息表');
            
            doc.save('员工信息表.pdf');
            
            showStatus('员工表导出成功', 'success');
        } catch (error) {
            console.error('导出员工表失败:', error);
            showStatus(`导出失败: ${error.message}`, 'error');
        }
    }
    
    /**
     * 导出产品清单
     */
    async function exportProductTable() {
        try {
            showStatus('正在生成产品清单...', 'info');
            
            const doc = await window.ChineseFonts.createPDF('p', 'mm', 'a4');
            
            // 标题
            doc.setFontSize(24);
            doc.text('产品清单', doc.internal.pageSize.width / 2, 25, { align: 'center' });
            
            // 公司信息
            doc.setFontSize(12);
            doc.text('示例科技有限公司产品目录', doc.internal.pageSize.width / 2, 35, { align: 'center' });
            doc.text(`更新日期: ${new Date().toLocaleDateString('zh-CN')}`, doc.internal.pageSize.width / 2, 42, { align: 'center' });
            
            // 产品数据（示例）
            const products = [
                { category: '电子产品', items: [
                    { id: 'P001', name: '智能手机', desc: '旗舰机型，8GB+256GB', price: 3299, stock: 42 },
                    { id: 'P002', name: '笔记本电脑', desc: 'i7处理器，16GB内存', price: 6599, stock: 25 },
                    { id: 'P003', name: '平板电脑', desc: '11英寸，2K显示屏', price: 2899, stock: 18 }
                ]},
                { category: '外设配件', items: [
                    { id: 'P004', name: '机械键盘', desc: '青轴，RGB背光', price: 1299, stock: 15 },
                    { id: 'P005', name: '无线鼠标', desc: '蓝牙5.0，静音设计', price: 89, stock: 56 },
                    { id: 'P006', name: '显示器', desc: '27英寸，4K分辨率', price: 2199, stock: 8 }
                ]},
                { category: '办公用品', items: [
                    { id: 'P007', name: '办公椅', desc: '人体工学设计', price: 899, stock: 12 },
                    { id: 'P008', name: '文件柜', desc: '三层抽屉，带锁', price: 450, stock: 7 },
                    { id: 'P009', name: '打印纸', desc: 'A4，500张/包', price: 25, stock: 120 }
                ]}
            ];
            
            let startY = 55;
            
            products.forEach(category => {
                // 分类标题
                doc.setFontSize(16);
                doc.text(category.category, 20, startY);
                
                // 分类表格
                const headers = ['产品编号', '产品名称', '规格描述', '价格(元)', '库存'];
                const rows = category.items.map(item => [
                    item.id,
                    item.name,
                    item.desc,
                    `¥${item.price.toLocaleString('zh-CN')}`,
                    item.stock
                ]);
                
                const tableOptions = window.ChineseFonts.setTableFont(doc, {
                    head: [headers],
                    body: rows,
                    startY: startY + 5,
                    theme: 'grid',
                    headStyles: {
                        fillColor: [108, 117, 125],
                        textColor: 255
                    },
                    columnStyles: {
                        0: { cellWidth: 30 },
                        1: { cellWidth: 40 },
                        2: { cellWidth: 60 },
                        3: { 
                            halign: 'right',
                            fontStyle: 'bold'
                        },
                        4: { 
                            halign: 'center',
                            cellWidth: 25
                        }
                    },
                    didParseCell: function(data) {
                        // 根据库存设置颜色
                        if (data.column.index === 4) {
                            const stock = parseInt(data.cell.raw);
                            if (stock === 0) {
                                data.cell.styles.fillColor = [248, 215, 218];
                                data.cell.styles.textColor = [114, 28, 36];
                            } else if (stock < 10) {
                                data.cell.styles.fillColor = [255, 243, 205];
                                data.cell.styles.textColor = [133, 100, 4];
                            }
                        }
                    },
                    margin: { left: 15, right: 15 }
                });
                
                doc.autoTable(tableOptions);
                startY = doc.lastAutoTable.finalY + 15;
            });
            
            // 统计信息
            const totalProducts = products.reduce((sum, cat) => sum + cat.items.length, 0);
            const totalStock = products.reduce((sum, cat) => 
                sum + cat.items.reduce((s, item) => s + item.stock, 0), 0);
            
            doc.setFontSize(14);
            doc.text('统计信息', 20, startY);
            
            doc.setFontSize(11);
            doc.text(`产品种类: ${products.length}类`, 25, startY + 10);
            doc.text(`产品总数: ${totalProducts}个`, 25, startY + 18);
            doc.text(`总库存量: ${totalStock}件`, 25, startY + 26);
            
            // 水印和页脚
            addWatermark(doc, '产品清单');
            addFooter(doc, '产品目录');
            
            doc.save('产品清单.pdf');
            
            showStatus('产品清单导出成功', 'success');
        } catch (error) {
            console.error('导出产品清单失败:', error);
            showStatus(`导出失败: ${error.message}`, 'error');
        }
    }
    
    /**
     * 添加页脚
     * @param {object} doc - jsPDF文档
     * @param {string} docType - 文档类型
     */
    function addFooter(doc, docType) {
        const addFooterFlag = document.getElementById('addFooter')?.checked ?? true;
        
        if (!addFooterFlag) return;
        
        const pageCount = doc.internal.getNumberOfPages();
        
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            
            doc.setFontSize(9);
            doc.setTextColor(128, 128, 128);
            
            // 左侧信息
            doc.text(`文档类型: ${docType}`, 15, doc.internal.pageSize.height - 10);
            
            // 中间页码
            doc.text(`第 ${i} 页 / 共 ${pageCount} 页`, 
                doc.internal.pageSize.width / 2, 
                doc.internal.pageSize.height - 10, 
                { align: 'center' });
            
            // 右侧信息
            doc.text(`生成时间: ${new Date().toLocaleString('zh-CN')}`, 
                doc.internal.pageSize.width - 15, 
                doc.internal.pageSize.height - 10, 
                { align: 'right' });
        }
    }
    
    /**
     * 添加水印
     * @param {object} doc - jsPDF文档
     * @param {string} text - 水印文字
     */
    function addWatermark(doc, text) {
        const addWatermarkFlag = document.getElementById('addWatermark')?.checked ?? true;
        
        if (!addWatermarkFlag) return;
        
        const pageCount = doc.internal.getNumberOfPages();
        
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            
            // 保存当前状态
            doc.saveGraphicsState();
            
            // 设置水印样式
            doc.setFontSize(60);
            doc.setTextColor(220, 220, 220);
            doc.setGState(new window.jspdf.GState({ opacity: 0.1 }));
            
            // 计算水印位置
            const x = doc.internal.pageSize.width / 2;
            const y = doc.internal.pageSize.height / 2;
            
            // 添加水印
            doc.text(text, x, y, { 
                align: 'center', 
                angle: 45 
            });
            
            // 恢复状态
            doc.restoreGraphicsState();
        }
    }
    
    /**
     * 数字转中文大写金额
     * @param {number} num - 数字
     * @returns {string} 中文大写金额
     */
    function convertCurrency(num) {
        const chineseNumbers = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        const units = ['', '拾', '佰', '仟'];
        const bigUnits = ['', '万', '亿'];
        
        let result = '';
        let integerPart = Math.floor(num);
        let decimalPart = Math.round((num - integerPart) * 100);
        
        // 处理整数部分
        if (integerPart === 0) {
            result = '零';
        } else {
            let str = integerPart.toString();
            let zeroCount = 0;
            
            for (let i = 0; i < str.length; i++) {
                const digit = parseInt(str[i]);
                const unitIndex = (str.length - i - 1) % 4;
                const bigUnitIndex = Math.floor((str.length - i - 1) / 4);
                
                if (digit === 0) {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        result += '零';
                        zeroCount = 0;
                    }
                    result += chineseNumbers[digit] + units[unitIndex];
                }
                
                if (unitIndex === 0 && zeroCount < 4) {
                    result += bigUnits[bigUnitIndex];
                }
            }
        }
        
        result += '元';
        
        // 处理小数部分
        if (decimalPart > 0) {
            const jiao = Math.floor(decimalPart / 10);
            const fen = decimalPart % 10;
            
            if (jiao > 0) {
                result += chineseNumbers[jiao] + '角';
            }
            
            if (fen > 0) {
                result += chineseNumbers[fen] + '分';
            }
        } else {
            result += '整';
        }
        
        return result;
    }
    
    /**
     * 显示状态消息
     * @param {string} message
     * @param {string} type
     */
    function showStatus(message, type = 'info') {
        if (window.showStatus) {
            window.showStatus(message, type);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }
    
    // 导出到全局作用域
    window.exportSimpleTable = exportSimpleTable;
    window.exportInvoice = exportInvoice;
    window.exportReport = exportReport;
    window.exportEmployeeTable = exportEmployeeTable;
    window.exportProductTable = exportProductTable;
    
    console.log('PDF导出模块已加载');
})();