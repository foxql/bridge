async function listener(socket, eventPackage)
{
    const {id} = socket
    service.io.to('signall-area').emit('transport', {
        package: eventPackage,
        buyer: id
    });
}

module.exports = {
    name: 'transport',
    listener: listener  
}