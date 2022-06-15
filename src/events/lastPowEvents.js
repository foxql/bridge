const listenerName = 'pow-is-correct'
async function listener(socket, data)
{
    service.io.to('explorer-connections').emit('pow-signall', data)
}

module.exports = {
    name: listenerName,
    listener: listener
}