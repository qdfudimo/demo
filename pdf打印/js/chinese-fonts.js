// js/chinese-fonts.js
// 中文字体注册和管理模块

(function() {
    'use strict';
    
    // 字体配置
    const ChineseFonts = {
        // 字体文件路径（相对路径）
        simhei: 'fonts/simhei.ttf',
        simsun: 'fonts/simsun.ttf',
        msyh: 'fonts/msyh.ttf',
        kaiti: 'fonts/kaiti.ttf'
    };
    
    // 已加载的字体缓存
    const loadedFonts = new Set();
    
    // 字体加载状态
    let fontsLoaded = false;
    let fontsLoading = false;
    const fontLoadCallbacks = [];
    
    /**
     * 加载字体文件并转换为base64
     * @param {string} fontName - 字体名称
     * @param {string} url - 字体文件URL
     * @returns {Promise<string>} base64编码的字体数据
     */
    async function loadFontData(fontName, url) {
        try {
            console.log(`开始加载字体: ${fontName}`);
            
            // 如果是本地相对路径，转换为绝对路径
            if (!url.startsWith('http') && !url.startsWith('data:')) {
                url = new URL(url, window.location.href).href;
            }
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`字体加载失败: ${response.status} ${response.statusText}`);
            }
            
            const arrayBuffer = await response.arrayBuffer();
            const base64 = arrayBufferToBase64(arrayBuffer);
            
            console.log(`字体加载成功: ${fontName}, 大小: ${(arrayBuffer.byteLength / 1024).toFixed(2)}KB`);
            return base64;
        } catch (error) {
            console.error(`字体加载错误 (${fontName}):`, error);
            throw error;
        }
    }
    
    /**
     * 将ArrayBuffer转换为Base64
     * @param {ArrayBuffer} buffer
     * @returns {string}
     */
    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        
        return window.btoa(binary);
    }
    
    /**
     * 注册单个字体到jsPDF
     * @param {object} jsPDF - jsPDF实例
     * @param {string} fontName - 字体名称
     * @param {string} base64Data - 字体base64数据
     */
    function registerFont(jsPDF, fontName, base64Data) {
        try {
            // 添加到虚拟文件系统
            jsPDF.API.addFileToVFS(`${fontName}.ttf`, base64Data);
            
            // 注册字体
            jsPDF.API.addFont(`${fontName}.ttf`, fontName, 'normal');
            
            // 缓存已注册字体
            loadedFonts.add(fontName);
            
            console.log(`字体注册成功: ${fontName}`);
        } catch (error) {
            console.error(`字体注册失败 (${fontName}):`, error);
            throw error;
        }
    }
    
    /**
     * 初始化加载所有中文字体
     * @returns {Promise<void>}
     */
    async function initializeChineseFonts() {
        if (fontsLoaded) {
            return Promise.resolve();
        }
        
        if (fontsLoading) {
            return new Promise(resolve => {
                fontLoadCallbacks.push(resolve);
            });
        }
        
        fontsLoading = true;
        showStatus('正在加载中文字体...', 'info');
        
        try {
            const { jsPDF } = window.jspdf;
            
            // 加载所有字体
            for (const [fontName, fontUrl] of Object.entries(ChineseFonts)) {
                if (loadedFonts.has(fontName)) {
                    continue;
                }
                
                try {
                    const base64Data = await loadFontData(fontName, fontUrl);
                    registerFont(jsPDF, fontName, base64Data);
                } catch (error) {
                    console.warn(`跳过字体 ${fontName}:`, error.message);
                }
            }
            
            fontsLoaded = true;
            fontsLoading = false;
            
            // 执行等待中的回调
            fontLoadCallbacks.forEach(callback => callback());
            fontLoadCallbacks.length = 0;
            
            showStatus('中文字体加载完成', 'success');
            return Promise.resolve();
        } catch (error) {
            fontsLoading = false;
            showStatus(`字体加载失败: ${error.message}`, 'error');
            return Promise.reject(error);
        }
    }
    
    /**
     * 获取当前选中的字体
     * @returns {string}
     */
    function getCurrentFont() {
        return window.currentFont || 'simhei';
    }
    
    /**
     * 设置PDF文档字体
     * @param {object} doc - jsPDF文档实例
     * @param {string} fontName - 字体名称
     */
    function setPDFFont(doc, fontName) {
        try {
            if (!loadedFonts.has(fontName)) {
                console.warn(`字体 ${fontName} 未加载，使用默认字体`);
                fontName = 'simhei'; // 回退到黑体
            }
            
            doc.setFont(fontName);
            console.log(`PDF字体设置为: ${fontName}`);
        } catch (error) {
            console.error('设置PDF字体失败:', error);
        }
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
    
    /**
     * 创建支持中文的PDF文档
     * @param {string} orientation - 方向 ('p' 或 'l')
     * @param {string} unit - 单位 ('pt', 'mm', 'cm', 'in')
     * @param {string} format - 纸张格式 ('a4', 'letter', etc.)
     * @returns {Promise<object>} jsPDF实例
     */
    async function createChinesePDF(orientation = 'p', unit = 'mm', format = 'a4') {
        // 确保字体已加载
        await initializeChineseFonts();
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF(orientation, unit, format);
        
        // 设置默认字体
        const fontName = getCurrentFont();
        setPDFFont(doc, fontName);
        
        return doc;
    }
    
    /**
     * 为AutoTable设置中文字体
     * @param {object} doc - jsPDF文档实例
     * @param {object} options - AutoTable选项
     * @returns {object} 更新后的选项
     */
    function setChineseTableFont(doc, options = {}) {
        const fontName = getCurrentFont();
        
        return {
            ...options,
            styles: {
                font: fontName,
                fontSize: options.styles?.fontSize || 10,
                cellPadding: options.styles?.cellPadding || 5,
                overflow: 'linebreak',
                halign: options.styles?.halign || 'left',
                valign: options.styles?.valign || 'middle',
                ...options.styles
            },
            headStyles: {
                font: fontName,
                fontSize: options.headStyles?.fontSize || 11,
                fontStyle: 'bold',
                fillColor: options.headStyles?.fillColor || [41, 128, 185],
                textColor: options.headStyles?.textColor || 255,
                ...options.headStyles
            },
            bodyStyles: {
                font: fontName,
                ...options.bodyStyles
            },
            footStyles: {
                font: fontName,
                ...options.footStyles
            }
        };
    }
    
    // 导出到全局作用域
    window.ChineseFonts = {
        initialize: initializeChineseFonts,
        createPDF: createChinesePDF,
        setFont: setPDFFont,
        setTableFont: setChineseTableFont,
        getCurrentFont: getCurrentFont,
        isFontLoaded: (fontName) => loadedFonts.has(fontName),
        getLoadedFonts: () => Array.from(loadedFonts)
    };
    
    // 页面加载完成后开始加载字体
    document.addEventListener('DOMContentLoaded', function() {
        // 延迟加载字体，避免阻塞页面渲染
        setTimeout(() => {
            initializeChineseFonts().catch(error => {
                console.error('字体初始化失败:', error);
            });
        }, 1000);
    });
    
    console.log('中文字体模块已加载');
})();