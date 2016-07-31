# Andrey's Physics Cannon

Play around with launching a ball! Set initial height, initial velocity, and initial direction to change how it behaves. Then, you can watch what happens by pressing "play", or see it frame-by-frame with "step".

The step feature is especially useful when closely examining the kinematic formulas on the bottom. The simulator calculates and displays both computed values from kinematic formulas and values directly from the simulator.

Looking closely, you'll notice that y<sub>calculated</sub> is slightly different from y<sub>simulated</sub>. This is because the calculated values uses average acceleration over time, while simulated values uses instantaneous accelerations.

## File structure

Pretty self-explanatory, but the actual javascript code is broken into three files.

* `vars.js` contains application variables and configurable options.
* `helpers.js` contains code not integral to the simulation, but provide some abstraction. For example, there is a Vector class, trigonometric functions, and listeners for button presses and to update formula values.
* `simulation.js` is the real deal. It has the Ball class, the tick method, and methods to start/stop/setup the simulation. If you're just looking to see how physics is implementated, this is where you look.

## License

MIT License

Copyright (c) 2016 Andrey Butenko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
