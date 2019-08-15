from tkinter import *
import math
import random

class Shape:

    def __init__(self, color="black"):
        self.color = color

    def get_color(self):
        return self.color

    def set_color(self, color):
        self.color = color


class Rectangle(Shape):

    def __init__(self, x, y, width, height):
        super().__init__()
        self.x = x
        self.y = y
        self.width = width
        self.height = height

    def calcArea(self):
        return self.width*self.height

    def calcPer(self):
        return 2*(self.width + self.height)

    def draw(self, canvas, color="red"):
        canvas.create_rectangle(self.x, self.y, self.x+self.width, self.y+self.height, fill=color)


class Circle(Shape):

    def __init__(self, x, y, r):
        super().__init__()
        self.r = r
        self.x = x
        self.y = y

    def calcArea(self):
        return math.pi*self.r*self.r

    def calcPer(self):
        return math.pi*2*self.r

    def draw(self, canvas, color="red"):
        canvas.create_oval(self.x-self.r, self.y-self.r, self.x+self.r, self.y+self.r, fill=color)


class Triangle(Shape):

    def __init__(self, x1, y1, x2, y2, x3, y3):
        super().__init__()
        self.x1 = x1
        self.y1 = y1
        self.x2 = x2
        self.y2 = y2
        self.x3 = x3
        self.y3 = y3

    def calcArea(self):
        return abs(self.x1*(self.y2-self.y3) + self.x2*(self.y3-self.y1) + self.x3*(self.y1-self.y2)) / 2

    def calcPer(self):
        return math.sqrt((self.x1-self.x2)**2 + (self.y2-self.y1)**2) + \
               math.sqrt((self.x3-self.x2)**2 + (self.y3-self.y2)**2) + \
               math.sqrt((self.x1-self.x3)**2 + (self.y3-self.y1)**2)

    def draw(self, canvas, color="red"):
        points = [self.x1, self.y1, self.x2, self.y2, self.x3, self.y3]
        canvas.create_polygon(points, fill=color, width=1, outline='black')




class Drawer:
    shapes = []

    def __init__(self, w=800, h=600):
        self.master = Tk()
        self.canvas = Canvas(self.master, width=w, height=h)
        self.canvas.bind("<Button-1>", self.callback)
        self.canvas.pack()

    def drawCircle(self, x, y, r, color="red"):
        self.canvas.create_oval(x-r, y-r, x+r, y+r, fill=color)

    def drawRectangle(self, x, y, width, height, color):
        self.canvas.create_rectangle(x, y, x+width, y+height, fill=color)

    def drawTriangle(self, x1, y1, x2, y2, x3, y3, color):
        points = [x1, y1, x2, y2, x3, y3]
        self.canvas.create_polygon(points, fill=color)

    def addShape(self, shape):
        self.shapes.append(shape)


    def drawShapes(self):
        for sh in self.shapes:
            sh.draw(self.canvas)

    def callback(self, event):
        print("clicked at", event.x, event.y)
        k = lambda: random.randint(0, 255)
        #print('#%02X%02X%02X' %  (k(), k(), k()))
        print('#{:02x}{:02x}{:02x}'.format(k(), k(), k()))
        a = random.randrange(3)
        if a == 0:
            sh = Circle(event.x, event.y, random.randrange(40)+ 15)
            sh.draw(self.canvas, '#{:02x}{:02x}{:02x}'.format(k(), k(), k()))
        elif a == 1:
            sh = Rectangle(event.x, event.y, random.randrange(40)+15, random.randrange(40)+15)
            sh.draw(self.canvas, '#{:02x}{:02x}{:02x}'.format(k(), k(), k()))
        elif a == 2:
            sh = Triangle(event.x + random.randrange(70) - 35,
                          event.y + random.randrange(70) - 35,
                          event.x + random.randrange(70) - 35,
                          event.y + random.randrange(70) - 35,
                          event.x + random.randrange(70) - 35,
                          event.y + random.randrange(70) - 35)
            sh.draw(self.canvas, '#{:02x}{:02x}{:02x}'.format(k(), k(), k()))





if __name__ == '__main__':
    d = Drawer()
    d.drawCircle(100, 100, 50, "green")
    d.drawRectangle(200, 200, 50, 100, "blue")
    d.drawTriangle(300, 300, 400, 500, 600, 400, "orange")

    c = Circle(100, 100, 50)
    r = Rectangle(200, 200, 50, 100)
    t = Triangle(300, 300, 400, 500, 600, 400)
    shapes = [c, r, t]

    for sh in shapes:
        d.addShape(sh)
    d.drawShapes()

    mainloop()