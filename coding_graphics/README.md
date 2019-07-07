# CODING GRAPHICS
## Getting ready
### Preparation
Please ensure you are connected to internet during early stages of this workshop as some installation may require internet connection. Ask for wifi name and password.

To connect to the microcontroller via serial communication protocol, install driver CH340 for Windows and MacOS users. For Linux users, the driver is pre-installed. Download ZIP files containing the driver from below link then run the installation until finish. It is recommended to finish driver installation first before plugging in the microcontroller.

<https://github.com/mdinata/micropython_book_repository/tree/master/Wemos_NodeMCU_Drivers>

![](https://github.com/mdinata/reference/blob/master/images/CH340_installation.png)

To write program, manage file, run and transfer the program we need an IDE (=Integrated Development Environment). The most user friendly IDE, is uPyCraft. 

* Windows user <https://github.com/thonny/thonny/releases/download/v3.1.2/thonny-3.1.2.exe>

* MacOS user <https://github.com/thonny/thonny/releases/download/v3.1.2/thonny-3.1.2.dmg>

### Getting to know your microcontroller
This is ESP8266 MCU (=Micro Controller Unit). It is a small computation system that has its own processor that runs at 80 MHz clock frequency or 160 MHz when overclocked. It has 64 Kb RAM and 4 MB flash memory for storage. Most importantly it has wifi device to connect to internet and run as webserver.
ESP8266 wifi has two modes: as access point or a station. Access point means that you can get connected to ESP8266 via its internal access point. Station means that ESP8266 connect to external access point.

![](https://github.com/mdinata/reference/blob/master/images/ESP8266.jpg)

To connect to computer, plug the micro usb end into ESP8266 end and the other end to computer USB port

#### Serial communication port
When connected to the computer,  Windows will begin to install the new driver. When the installation complete, check on the serial communication port assigned. Go to Device Manager and you may find it under PORTs. You should find COM3, COM4 etc.
For MacOS and Linux user your port is **/dev/ttyUSB0** by default.

![](https://github.com/mdinata/reference/blob/master/images/COM_PORT.png)

#### MicroPython version
The latest Micro Python version is pre-installed and loaded with programs to connect to wifi and find access point name.


#### About Thonny IDE
The coding will be performed inside Thonny IDE. It is important to get familiar with program environment. Worry not, we just need to remember few things:<br/>
![](https://github.com/mdinata/reference/blob/master/images/Thonny-options.png)

* Tools > Options
* Interpreter > Micropython on generic device  
* You will see sign >>> when the ESP8266 is connected and ready to receive instruction.

![](https://github.com/mdinata/reference/blob/master/images/Thonny-workspace.png)

That is all for now, more will be explored during the workshop session.
