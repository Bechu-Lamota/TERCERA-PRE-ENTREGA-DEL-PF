const express = require('express')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const initializePassport = require('../config/passport/passport.config')
const passport = require('passport')
//const mongoose = require('mongoose')
//commander & dotenv & singleton
const DB = require('../config/command/singleton')
const settings = require('../config/command/commander')
DB.getConnection(settings)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(flash())
app.use(cookieParser('secretCookie'))
app.use(session({
	secret: 'secretSession',
	resave: true,
	saveUninitialized: true
}))
initializePassport()
app.use(passport.initialize())

const PORT = 8080
const httpServer = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))

const io = new Server(httpServer)
const users = []
const messages = []

io.on('connection', socket => {
	console.log('Nuevo cliente conectado')

	socket.on('joinChat', username => {
		users.push({
			name: username,
			socketId: socket.id
		})

		socket.broadcast.emit('notification', `${username} se ha unido a la conversacion`)
		socket.emit('notification', `Te has unido a la conversacion ${username}`)
		socket.emit('messages', JSON.stringify(messages))
	})

	//Ahora cachamos el mensaje del front end desde el backend:
	socket.on('newMessage', message => {
		const user = users.find(user => user.socketId === socket.id)
		
		const newMessage = {
			message,
			user: user.name
		}
		messages.push(newMessage)
		console.log(newMessage)

		io.emit('message', JSON.stringify(newMessage))
	})
})

app.get('/', (req, res) => {
  res.json({
      message: 'Welcome',
      status: 'running', 
      date: new Date()
  })
})

module.exports = {
    app,
    io
}