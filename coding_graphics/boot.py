import max7219
from machine import Pin, SPI,freq

tile=1
freq(160000000)
spi=SPI(1, baudrate=10000000, polarity=0, phase=0)
display=max7219.Matrix8x8(spi, Pin(2), tile)
display.brightness(10)
display.fill(0)
display.show()

display.scroll_left(" 3  2  1  Welcome and Have Fun!!")