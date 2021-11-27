const listenerName = 'find-available-server'
async function listener(socket)
{
    socket.emit(listenerName, 
        service.findAvailableServer()    
    )
}

module.exports = {
    name: listenerName,
    listener: listener
}