## Clayton's Contributions

# index.html:

## Game Setup: 

I created the overall setup of the game world. It started off as a simple platform, and evolved to having wind-like physics and a skybox that would rotate with the direction of this wind. I applied the objects to their respective locations and created a method of rotating the weather vane in the direction of the wind as well. (as-well-as adding the simple lighting effects of the world.)

Using the examples listed in the README, I was able to create a skybox from one of the reflective material examples on the Three.js's website. I used the same general approach as they did for creating the skybox, but what I did after was my own. I altered the camera of the skybox so that it flips with each player, and rotates with a fraction of the wind speed in the respective x-direction of the wind.

The phyics were used from another example of Threejs.org. The modifications of this code were in the use of the gravity methods, where I was able to give the arrow a sense of velocity based on the power value generated in the whileMouseDown() function, and in the updatePhysics() code, where I stripped it down to only use functionality needed for our project, and created minor modifications the alter the orientation/speed of the arrow.

## Mouse Interaction: 

I created four methods for using the mouse in the game. These are onDocumentMouseDown(), onDocumentMouseUp(), whileMouseDown(), onDocumentMouseMove(). Each of these functions were used in updating/saving the mouse coordinates that would later be used in all of our raycasting techniques. 

It is also where I manipulate the arrow "gravity" to emulate the velocity and acceleration of an arrow based on the power of the player, where the power is increased the longer the player holds the mouse down, and the CSS updates accordingly. Furthermore, this is where the creation of an arrow is done. This is done by taking the raycaster direction of the mouse and the location of the players bow to create an arrow in that position/location with the "velocity" based on the power that has accumulated.

## Collision Detection:

I implemented the games collision detection system. This was no easy task, so I looked around for examples on the matter. I found an excellent example at http://stemkoski.github.io/Three.js/. I studied this code and had to modify it for it to work with our game. At first I was trying to use the players vertices and check that an arrow had collided, but this proved difficult, due to the hierarchical nature of the player. Instead, I checked if any of the arrows had collided with any of the players. 

The way this is done is by saving the collision data and pulling the distance value (this is the distance of the origin of the ray and the intersection) and compare it to the length of the directional vector, if it is less than the directional vector of the arrow, then we have a collison. Basically, this process is done to check that the ray from the arrow's origin are intersecting the mesh passed into the raycaster function. See @https://stemkoski.github.io/Three.js/Collision-Detection.html and @https://threejs.org/docs/index.html#api/en/core/Raycaster for more information on how RayCaster objects can be leveraged for collision detection. Another big difference in my code from the example above, is that I wasn't able to use a basic geometry and position of an object for vertice checking. I instead had to use BufferedGeometry, and used a similar approach for vertice checking that we had done in a previous homework (heightmap.js's generate normals).

I also implemented the code that happens after a collision has been detected. This mostly includes: updating the CSS health bars, win-con checking and creating/updating a blood-like particle system.

## Particle System:

After collision has been detected I mentioned that a blood-like particle system is created. This is done by creating n number Vec3 positions passed into THREE.Points(). To emulate a particle system with THREE.Points(), I had to map a texture to each point giving it a round appearance and then blend it so that the alpha was transparent. I then created a function to update the positions of each of the points so that they seemed to move within my given range, giving the illusion that blood was gushing at the location of the arrow collision. The points texture will always face appear flat to any camera that is viewing them, this is what allows there to be so many without hindering the performance too greatly. There were also a number of helpful functions I was able to use in the PointsMaterial api that allowed me to give the particle system a more blood-like feel to it.

The coolest thing about this, is that it could be used to do so much more than blood-like effects, and can effectively be re-done to create any particle system of your liking, by simply maping a new texture/size/color to the points. And I was in the process of adding dust-like particles that would move with the wind, but I ran out of time. 

