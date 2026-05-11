async function loadData() {
    try {
        // 使用时间戳防止 GitHub Pages 缓存数据
        const res = await fetch('data.csv?_=' + new Date().getTime());
        const text = await res.text();
        const lines = text.trim().split('\n').filter(line => line.trim() !== '').slice(1);

        const data = lines.map(line => {
            const [id, regCount, payCount, rawRate] = line.split(',');
            
            // 转换为数值用于逻辑处理
            const reg = parseInt(regCount) || 0;
            const pay = parseInt(payCount) || 0;
            
            // 计算付费率：优先使用计算值，若注册数为0则显示0
            const rate = reg > 0 ? (pay / reg * 100).toFixed(2) : "0.00";

            return { id, reg, pay, rate };
        });

        // 按【付费人数】排序（符合排行榜常规逻辑）
        data.sort((a, b) => b.pay - a.pay);

        const tbody = document.querySelector('#rankTable tbody');
        tbody.innerHTML = '';

        data.forEach((row, i) => {
            const tr = document.createElement('tr');
            // 前三名特殊样式
            if (i < 3) tr.classList.add('top');
            
            tr.innerHTML = `
                <td>${i + 1}</td>
                <td>${row.id}</td>
                <td>${row.reg}</td>
                <td>${row.pay}</td>
                <td class="highlight">${row.rate}%</td>
            `;
            tbody.appendChild(tr);
        });

        document.getElementById('updated').textContent =
            '最后更新: ' + new Date().toLocaleString();
    } catch (e) {
        document.getElementById('updated').textContent = '加载数据失败，请检查CSV格式';
        console.error(e);
    }
}

// 初始化加载
loadData();
// 每 30 秒自动拉取一次新数据
setInterval(loadData, 30000);
