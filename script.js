async function loadData() {
    try {
        const res = await fetch('data.csv?_=' + new Date().getTime());
        const text = await res.text();
        const lines = text.trim().split('\n').slice(1); // 跳过标题行

        const data = lines.map(line => {
            const [id, payCount, roi, valueCount] = line.split(',');
            const pay = parseInt(payCount) || 0;
            const roiVal = parseFloat(roi) || 0;
            const value = parseInt(valueCount) || 0;

            // 根据 ROI 计算积分
            let earned = 0;
            if (roiVal < 1) earned = pay * 30;
            else if (roiVal < 1.8) earned = pay * 40;
            else earned = pay * 50;

            return { id, pay, roi: roiVal, value, earned };
        });

        // 按付费个数排序
        data.sort((a, b) => b.pay - a.pay);

        const tbody = document.querySelector('#rankTable tbody');
        tbody.innerHTML = '';

        data.forEach((row, i) => {
            const tr = document.createElement('tr');
            if (i < 3) tr.classList.add('top');
            tr.innerHTML = `
                <td>${i + 1}</td>
                <td>${row.id}</td>
                <td>${row.pay}</td>
                <td>${row.roi.toFixed(2)}</td>
                <td>${row.value}</td>
                <td>${row.earned.toFixed(2)}</td>
            `;
            tbody.appendChild(tr);
        });

        document.getElementById('updated').textContent =
            '最后更新: ' + new Date().toLocaleString();
    } catch (e) {
        document.getElementById('updated').textContent = '加载数据失败';
        console.error(e);
    }
}

loadData();
setInterval(loadData, 30000);
