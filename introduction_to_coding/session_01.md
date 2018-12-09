# Introduction to CODING
## Session 1. Getting ready
### Preparation
Please ensure you are connected to internet during early stages of this workshop as some installation may require internet connection. Ask for wifi name and password.

To communicate with the microcontroller, install driver CH340 for Windows and MacOS users. For linux users, the driver is pre-installed. Download ZIP files containing the driver from below link then run the installation until finish.

<https://github.com/mdinata/micropython_book_repository/tree/master/Wemos_NodeMCU_Drivers>

![](https://github.com/mdinata/reference/blob/master/images/CH340_installation.png)

To write program, file management and run the program we need to use IDE (=Integrated Development Environment). The most user friendly IDE, is uPyCraft. 

* Windows user <https://github.com/DFRobot/uPyCraft/blob/master/uPyCraft_V0.30.exe>

* MacOS user <https://github.com/DFRobot/uPyCraft/blob/master/uPyCraft_mac_V1.0.zip>

* Linux user <https://github.com/DFRobot/uPyCraft/blob/master/uPyCraft_linux_V0.30>.


### Getting to know your microcontroller
This is ESP8266 MCU (=Micro Controller Unit). It is a small computation system that has its own processor that runs at 80 MHz clock frequency or 160 MHz when overclocked. It has 64 Kb RAM and 4 MB flash memory for storage. Most importantly it has wifi device to connect to internet and run as webserver.
ESP8266 wifi has two modes: as access point or a station. Access point means that you can get connected to ESP8266 via its internal access point. Station means that ESP8266 connect to external access point.

![](https://github.com/mdinata/reference/blob/master/images/ESP8266.jpg)

To connect to you computer, plug the micro usb end into ESP8266 end and the other end to computer USB port

#### Serial communication port
When connected to the computer,  Windows will start to install the new driver. When the installation complete, check on the serial communication port assigned. Go to Device Manager and you may find it under PORTs. You should find COM3, COM4 etc.
For MacOS and Linux user your port is **/dev/ttyUSB0** by default.

![](https://github.com/mdinata/reference/blob/master/images/COM_PORT.png)

#### Micro Python version
The latest Micro Python version is pre-installed and loaded with programs to connect to wifi and find access point name.


#### About uPyCraft IDE
The coding will be performed inside uPyCraft IDE. It is important to get familiar with program environment.Worry not, we just need to remember few things:<br/>
![](https://github.com/mdinata/reference/blob/master/images/uPyCraft.png)

* Tool > Board and select ESP8266
* Tool > Serial and select COM port
* Left panel is for navigation
* Top panel where code will be written, saved and transferred
* Bottom panel is the interactive session. you will see sign >>> when the ESP8266 has been connected.

That is all for now, more will be explored during the workshop session
