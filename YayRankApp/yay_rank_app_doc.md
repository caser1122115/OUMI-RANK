# YayRankApp 项目文档

## 项目概述
YayRankApp 是一个本地排行榜系统，实时展示主播充值数据和相关统计信息，支持后台管理数据。前端样式美观，带颜色和动画，数据存储使用 CSV 文件。

## 文件结构
```
YayRankApp/
├── app.py                # Flask 后端
├── data.csv              # 数据文件
├── templates/
│   ├── rank.html         # 排行榜前端页面
│   └── admin.html        # 后台管理页面
└── static/
    └── style.css         # CSS 样式文件
```

## 功能说明

### 1. 排行榜页面 (`rank.html`)
- 显示字段：排名、主播ID、充值额、ROI、付费个数、价值个数、已挣金额
- 排序规则：按付费个数降序
- 自动刷新：每30秒刷新一次
- 前3名高亮显示并带动画
- 已挣金额自动计算：
  - ROI < 1 → 每个付费 30
  - 1 ≤ ROI < 1.8 → 每个付费 40
  - ROI ≥ 1.8 → 每个付费 50

### 2. 后台管理页面 (`admin.html`)
- 登录密码保护（`app.py` 中 `ADMIN_PASSWORD` 设置）
- 功能：新增/编辑/删除数据
- 自动保存至 CSV 文件
- 操作界面友好，可直接操作表格数据

### 3. 数据文件 (`data.csv`)
- CSV 格式，字段如下：
  - id: 主播ID
  - recharge: 充值金额
  - roi: ROI
  - payCount: 付费个数
  - valueCount: 价值个数
- 示例数据：
```csv
id,recharge,roi,payCount,valueCount
10001,800,1.2,20,3
10002,600,0.9,15,1
10003,1200,2.0,25,5
```

### 4. CSS 样式 (`style.css`)
- 控制页面整体布局、表格样式、颜色和动画
- 前3名高亮、表格行 hover 效果

### 5. 后端逻辑 (`app.py`)
- 使用 Flask 提供 API:
  - `/api/data` 获取数据（排序并计算已挣金额）
  - `/api/save` 保存数据（需密码验证）
- 已挣金额计算函数 `calc_earned(payCount, roi)`
- 读取和写入 CSV 文件的函数 `read_data()` 和 `write_data()`

## 安装与运行

1. 克隆或下载项目到本地
2. 安装依赖：
```bash
pip install flask
```
3. 运行应用：
```bash
python app.py
```
4. 访问页面：
   - 排行榜: [http://127.0.0.1:5000/](http://127.0.0.1:5000/)
   - 后台管理: [http://127.0.0.1:5000/admin](http://127.0.0.1:5000/admin)

## 注意事项
- 请在 `app.py` 中设置后台密码 `ADMIN_PASSWORD`
- CSV 文件必须在项目根目录
- 已挣金额根据 ROI 自动计算，不需要手动输入
- 前端页面每30秒刷新，可实时显示排行榜变化

## 打包说明（可选）
- 使用 PyInstaller 可打包成 exe 文件：
```bash
pyinstaller --onefile --add-data "templates;templates" --add-data "static;static" app.py
```
- 打包完成后可直接运行 exe，无需安装 Python

## 项目亮点
- 简单易用，支持本地快速部署
- 前端美观，带高亮和动画效果
- 后台管理便捷，支持新增/修改/删除
- 实时计算已挣金额和排序逻辑

