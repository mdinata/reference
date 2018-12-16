#Written by Andi Dinata
#September 2018

import socket 
import websocket_helper
from machine import Pin

led=Pin(2, Pin.OUT)

html = """<!DOCTYPE html>
<html>
<head> <title>ESP8266 Micropython Webserver</title> </head>
<meta content='width=device-width; initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=no;' name='viewport'/>
<form>
<center>
This is demo for IoT implementation to remotely turn on/off light using internet
Press the button to toggle on and off the on-board led
<button style="font-size:14px;background-color:cyan; height:50px;width:90px" name="BUTTON" value="TOGGLE" type="submit">try me..</button>
</center>
</form>
</html>
"""

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('', 80))
s.listen(5)
               
while True:
    conn, addr = s.accept()
    request = conn.recv(1024)
    request = str(request)
    toggle = request.find('/?BUTTON=TOGGLE')
    
    if toggle== 6:
       led.value(not (led.value()))
 
    response = html
    
    conn.send(response)
    conn.close()
