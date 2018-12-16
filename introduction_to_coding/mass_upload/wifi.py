import network
import ubinascii

class Wifi():
    def __init__(self):
        self.wlan=network.WLAN(network.STA_IF)
        self.wlan.active(True)

    def apname(self):
        self.findmac=ubinascii.hexlify(self.wlan.config('mac'),':').decode()
        macaddr=[]
        for i in self.findmac[9:17]:
            if i != ":":
                macaddr.append(i)
        print("This ESP8266 access point name is Micropython-",''.join(macaddr))
        print("Password micropythoN")
    
    def connect(self,ssid,password):
        if not self.wlan.isconnected():
                print('connecting to network...')
                self.wlan.connect(ssid, password)
                while not self.wlan.isconnected():
                    pass
        print('network config:', self.wlan.ifconfig())

if __name__ == '__main__':
    w=Wifi()
    w.apname()
