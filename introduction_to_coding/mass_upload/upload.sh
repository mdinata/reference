#!/bin/bash
echo "ESP8266 Loader"
sleep 1
echo "Step 1. Erase Flash"
esptool.py --port /dev/ttyUSB0 erase_flash
sleep 2
echo "Step 2. Load Micro Python Firmware"
esptool.py --port /dev/ttyUSB0 --baud 460800 write_flash --flash_size=detect 0 esp8266-20180511-v1.9.4.bin
sleep 2
echo "Step 3. Load programs"
echo 1/3 wifi.py
ampy -b 115200 -p /dev/ttyUSB0 put wifi.py
echo 2/3 main.py
ampy -b 115200 -p /dev/ttyUSB0 put main.py
echo 3/3 webserver.py
ampy -b 115200 -p /dev/ttyUSB0 put webserver.py
sleep 1
echo "Done!"

