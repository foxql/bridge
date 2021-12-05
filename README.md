## foxql-bridge
webrtc signalling server explorer.

---

#### Register Signalling Server
``` javascript
socket.emit('register', 'http://0.0.0.0:1923')
```
#### Find Available Signalling Server
``` javascript
socket.emit('find-available-server')

socket.on('find-available-server', ({host, create_time})=> {
    console.log(host, create_time)
})
```
#### Transport  POW Signal
``` javascript
socket.emit('transport', YOUR_PROBLEM_OBJECT)
```