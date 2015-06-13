import socket from 'socket.io'
import globalConfig from './config/config'

export default socket(globalConfig.websocketPort);