/**
 * 简单的Mock API服务器
 * 用于开发环境模拟后端API响应
 */

const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 8080

// 中间件配置
app.use(cors())
app.use(express.json())

// 健康检查接口
app.get('/health', (req, res) => {
  console.log('Health check requested')
  res.json({ status: 'ok', message: 'Mock API服务器运行正常' })
})

// 登录接口
app.post('/auth/login', (req, res) => {
  console.log('Login requested:', req.body)
  const { username, password } = req.body
  
  if (username === 'admin' && password === 'admin123') {
    res.json({
      code: 200,
      data: {
        token: 'mock-jwt-token-' + Date.now(),
        user: { id: 1, username: 'admin', role: 'admin' }
      },
      message: '登录成功'
    })
  } else {
    res.status(401).json({ code: 401, message: '用户名或密码错误' })
  }
})

// 用户列表接口
app.get('/users', (req, res) => {
  console.log('Users list requested')
  res.json({ 
    code: 200, 
    data: [
      { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin' },
      { id: 2, username: 'user1', email: 'user1@example.com', role: 'user' }
    ], 
    message: '获取用户列表成功' 
  })
})

// 仪表盘数据接口
app.get('/dashboard/stats', (req, res) => {
  console.log('Dashboard stats requested')
  res.json({
    code: 200,
    data: {
      totalUsers: 1250,
      activeUsers: 890,
      totalActivities: 15,
      activeActivities: 8
    },
    message: '获取仪表盘数据成功'
  })
})

// 404处理
app.use((req, res) => {
  console.log('404 - API not found:', req.originalUrl)
  res.status(404).json({ code: 404, message: 'API接口不存在' })
})

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Mock API服务器已启动: http://localhost:${PORT}`)
  console.log(`🌐 网络访问地址: http://0.0.0.0:${PORT}`)
  console.log('📋 可用的API接口:')
  console.log('  GET  /health - 健康检查')
  console.log('  GET  /users - 用户列表')
  console.log('  POST /auth/login - 用户登录')
  console.log('  GET  /dashboard/stats - 仪表盘数据')
})

module.exports = app