# Sandpiles
Interactive cellular automata model.

### The Abelian sandpile model is a dynamical system displaying self-organized criticality.

**Rules: every cell can hold 3 "sand grains". If it has more, they fall down onto the adjacent cells, left, right, top, and bottom.**

By dumping a large amount of "sand" onto a cell, and coloring the cells acording to the number of sand grains they hold, we can see how this behavior creates beautiful, fractal-like patterns.
Once the algorithm has run its course and the cells are all stable, not toppling over their contents onto their neighbors, that state is called the "identity element" for that particular system.

Inspired by the Coding Train.

Try it out at https://amaralis.github.io/sandpiles/

# What I set out to achieve with this project

- [X] Honestly, something pretty
- [X] Also honestly, something funny, so I made a... presentational video of the working app. HMU4it
- [X] A cellular automata simulation. I want to play around with AI eventually. CA are, in my opinion, the primordial AI.
- [X] My first community contribution to the Coding Train (it got added yay! https://thecodingtrain.com/CodingChallenges/107-sandpiles.html)
- [ ] To successfully reproduce the algorithm without a lot of external assistance

# What I learned

* Trigonometry! The little red circles showing where the sand piles will be placed were a real challenge, one that I wasn't expecting, but I grew a lot! SOHCAHTOA!
* That it might remain a mystery to me until the day I die how copying the grid before the next frame renders gives us a good animation of the process. I mean, the grid is scanned row by row, left to right, but the sand "grains" can fall to the left and to the top, towards an already scanned square, and that means that a cell with 4 grains, where they "topple over" to all adjacent cells, may only show the right and bottom grains as having toppled over. I still don't understand how making a temporary grid and rendering it all at once fixes this issue. Maybe it's because it's not noticeable at a high framerate or something.
* How to overlap canvases
* How `position: relative` kind of "pops" the element to the top of the z-index if the element previously in front of it was static... man that was a monster of a bug to figure out
* How to implement media controls just for the giggles
* How to manipulate HSL colors just for giggles
