# MicroPython max7219 8x8 LED matrix driver, cascadable, SPI interface

from micropython import const
import framebuf
import time

_NOOP = const(0)
_DIGIT0 = const(1)
_DECODEMODE = const(9)
_INTENSITY = const(10)
_SCANLIMIT = const(11)
_SHUTDOWN = const(12)
_DISPLAYTEST = const(15)

class Matrix8x8:
    def __init__(self, spi, cs, num):
        """
        Driver for cascading MAX7219 8x8 LED matrices.

        import max7219
        from machine import Pin, SPI,freq
        import time

        tile=1
        freq(160000000)
        spi=SPI(1, baudrate=10000000, polarity=0, phase=0)
        display=max7219.Matrix8x8(spi, Pin(2), tile)
        display.brightness(3)
        display.fill(0)
        display.show()


        """
        self.spi = spi
        self.cs = cs
        self.cs.init(cs.OUT, True)
        self.buffer = bytearray(8 * num)
        self.num = num
        fb = framebuf.FrameBuffer(self.buffer, 8 * num, 8, framebuf.MONO_HLSB)
        self.framebuf = fb
        # Provide methods for accessing FrameBuffer graphics primitives. This is a workround
        # because inheritance from a native class is currently unsupported.
        # http://docs.micropython.org/en/latest/pyboard/library/framebuf.html
        self.fill = fb.fill  # (col)
        self.pixel = fb.pixel # (x, y[, c])
        self.hline = fb.hline  # (x, y, w, col)
        self.vline = fb.vline  # (x, y, h, col)
        self.line = fb.line  # (x1, y1, x2, y2, col)
        self.rect = fb.rect  # (x, y, w, h, col)
        self.fill_rect = fb.fill_rect  # (x, y, w, h, col)
        self.text = fb.text  # (string, x, y, col=1)
        self.scroll = fb.scroll  # (dx, dy)
        self.blit = fb.blit  # (fbuf, x, y[, key])
        self.init()

    def _write(self, command, data):
        self.cs(0)
        for m in range(self.num):
            self.spi.write(bytearray([command, data]))
        self.cs(1)

    def init(self):
        for command, data in (
            (_SHUTDOWN, 0),
            (_DISPLAYTEST, 0),
            (_SCANLIMIT, 7),
            (_DECODEMODE, 0),
            (_SHUTDOWN, 1),
        ):
            self._write(command, data)

    def brightness(self, value):
        if not 0 <= value <= 15:
            raise ValueError("Brightness out of range")
        self._write(_INTENSITY, value)

    def show(self):
        for y in range(8):
            self.cs(0)
            for m in range(self.num):
                self.spi.write(bytearray([_DIGIT0 + y, self.buffer[(y * self.num) + m]]))
            self.cs(1)
    
    def scroll_left(self,string,delay=0.05):
        for c in range(len(string)*8):
            self.fill(0)
            self.text(string,-c,0)
            self.show()
            time.sleep(delay)
            
    def scroll_right(self,string,delay=0.05):
        for c in range((len(string)*8)+8):
            self.fill(0)
            self.text(string,-(len(string)*8)+c,0)
            self.show()
            time.sleep(delay)
            
    def draw(self,matrix):
        self.fill(0)
        self.show()
        for y,row in enumerate(matrix):
            for x in enumerate(row):
                self.pixel(x[0],y,x[1])
        
    def rollup(self,string,repeat=8,speed=0.05):
        for i in range(0,repeat+8):
            self.fill(0)
            self.text(string,0,repeat-i)
            self.show()
            time.sleep(speed)
        
    def rolldown(self,string,repeat=8,speed=0.05):
        for i in range(0, repeat+9):
            self.fill(0)
            self.text(string,0,-repeat+i)
            self.show()
            time.sleep(speed)
            
    def iforgot(self):
        print("Quick Guide")
        print("-----------")
        print("display.fill(0)")
        print("display.show()")
        print("display.pixel(posx,posy,color)")
        print("display.text(\"a letter\",posx,posy,color)")
        print("display.hline(posx,posy,length,color)")
        print("display.vline(posx,posy,length,color)")
        print("display.line(posx,posy,posx1,posx2,color)")        
        print("display.rect(posx,posy,width,length,color)")
        print("display.fill_rect(posx,posy,width,length,color)")
        print("display.scroll(posx,posy)")
        print("display.scroll_left(\"anything you want to write\")")
        print("display.scroll_right(\"anything you want to write\")")
        print("display.rollup(\"a letter\")")
        print("display.rolldown(\"a letter\")")
        print("copy this empty matrix template and paste")
        print("matrix=[")
        print("    [0,0,0,0,0,0,0,0],")
        print("    [0,0,0,0,0,0,0,0],")
        print("    [0,0,0,0,0,0,0,0],")
        print("    [0,0,0,0,0,0,0,0],")
        print("    [0,0,0,0,0,0,0,0],")
        print("    [0,0,0,0,0,0,0,0],")
        print("    [0,0,0,0,0,0,0,0],")
        print("    [0,0,0,0,0,0,0,0]]")
