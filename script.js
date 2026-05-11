async function loadData() {
    try {
        const res = await fetch('data.csv?_=' + new Date().getTime());
        const text = await res.text();
        // 过滤空行并跳过第一行标题
        const lines = text.trim().split('\n').filter(l => l.trim()).slice(1); 

        const data = lines.map(line => {
            const cols = line.split(',');
            const id = cols[0] || '未知';
            const reg = parseInt(cols[1]) || 0; // 注册人数
            const pay = parseInt(cols[2]) || 0; // 付费人数
            
            // 【系统自动计算付费率】
            let rate = 0;
            if (reg > 0) {
                rate = (pay / reg) * 100;
            }

            return { id, reg, pay, rate };
        });

        // 默认按【付费人数】降序排列
        data.sort((a, b) => b.pay - a.pay);

        const tbody = document.querySelector('#rankTable tbody');
        tbody.innerHTML = data.map((row, i) => `
            <tr class="${i < 3 ? 'top' : ''}">
                <td>${i + 1}</td>
                <td>${row.id}</td>
                <td>${row.reg}</td>
                <td>${row.pay}</td>
                <td style="color:#e74c3c; font-weight:bold;">${row.rate.toFixed(2)}%</td>
            </tr>
        `).join('');

        document.getElementById('updated').textContent = '最后更新: ' + new Date().toLocaleString();
    } catch (e) {
        document.getElementById('updated').textContent = '数据加载失败，请检查文件';
        console.error("报错详情:", e);
    }
}

loadData();
setInterval(loadData, 30000);
