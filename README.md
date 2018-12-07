# Bowman 3D - Final Project for Com S 336

## What is this? 

This is a sort of "game" that [Clayton Nida](https://github.com/claytonnida "Clayton's Github Page") and [Chandler Davis](https://github.com/ChanFDavis "Chandler's Github Page") created as a final project for Com S 336 at Iowa State University, which is an Introduction to 3D Computer Graphics course. 

In this game, you have two players that take turns to shoot arrows at each other with a bow. To do this, you must aim with the mouse, hold down the left mouse button to charge your shot, and release the mouse button to let the arrow fly. 

Be sure to account for the wind shown by the classic chicken-shaped weather vane!

## What is it meant to show?

We wanted to use a bunch of different computer graphics ideas together to try and make a cohesive game experience. We tried to utilize and demonstrate the following:

* 3D Object hierarchies
* Animation (or the illusion of)
* Collision Detection
* Raycasting and using it to control the game somehow
* Particle Systems

We used the ThreeJS library to help speed things along and provide a basis for our game. Please check it out by clicking [HERE](https://github.com/mrdoob/three.js "ThreeJS Github Page").

## How do I run it?
To run this, you can probably just open the index.html file in a browser, but the best way would be the host the files on some sort of web server.

The simplest way of doing this, would be to use Python. Make sure you have Python3 installed on your system. Next, open a console window, move into this project's directory, and type the enter the following line. 

```console
user@computer:this-repo$python3 -m http.server 2222
```

Then, open a web browser and go to localhost:2222 or whatever you set the port number to.

## Reference List:

* ThreeJS - [Link to Github Page](https://github.com/mrdoob/three.js "ThreeJS Github Page").
    - We used this as a framework to build our game with
* IceCreamYou's Nemesis game - [Link to Github Page](https://github.com/IceCreamYou/Nemesis "Nemesis Github Page").
    - We used his THREE.FirstPersonControls class in an early build of our game. We decided on doing something different, but we still appreciate his work!
* Bow 3D Model - [Link to Thingiverse Page](https://www.thingiverse.com/thing:2383635 "Bow by Giampanos on Thingiverse.com")
* Arrow 3D Model - [Link to Thingiverse Page](https://www.thingiverse.com/thing:647535 "Arrow by LittleJohn16 on Thingiverse.com")
* Weather Vane 3D Model - [Link to John Burkardt from The Department of Scientific Computing of Florida State University's page](https://people.sc.fsu.edu/~jburkardt/data/ply/ply.html "John Burkardt's page with PLY files")
* Physics - https://threejs.org/examples/?q=break#webgl_physics_convex_break
    - We used a modified version of this example to add physics to the arrows in our game.
* Collision Detection - http://stemkoski.github.io/Three.js/
    - We used the idea of the collision detection example from this page to get our own version of collision detection working.
* Particle System - https://threejs.org/docs/index.html#api/en/objects/Points
    - Using the api documentation, we were able to create the blood particle system for our game.
* Skybox - https://threejs.org/examples/?q=env#webgl_materials_envmaps
    - Used the skybox implementation of this example to create our own.
* ThreeJS API documentation - https://threejs.org/docs/
    - General other references for game mechanics.
* CSS Bars - https://codepen.io/dwidomski/pen/KBzuo

### Thank you for taking a look at our project!

[This to this repository](https://github.com/claytonnida/Coms336_Project "Coms336_Project Repository")
