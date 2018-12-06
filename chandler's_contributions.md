## Chandler's Contributions


# Player.js:

I implemented everthing in this class. Initially, this was done in the main Javascript code, but I felt that it would be better to encapsulate the hierarchy in its own class. This proved beneficial as we were able to clean up the code and have better checks to see which player was active. Another added plus is that once we had the player class working, we could place both player models without another hierarchy.

# index.html:

## Encapsulation: 

A lot of the encapsulation of code into separate methods was done by me.
This was a minor change, but helpful in the readability of my code.

The instantiation of the Person class is done in the method initPlayers(), which I wrote using the original hierarchy creation that Clayton had done. Clayton also added the player's parts being added to the hitboxes as part of his collision detection. 

The main issue I had when writing this function was how to get the bow passed to the player. I struggled with this because the mesh of the bow, loaded in with ThreeJS' PLYLoader, was not done loading by the time it was being added as a child of one of the Player's parts. This is because the load happened asynchronously. To remedy this, I create a ThreeJS Object3D instance for the bow, added that to each player, then set the bow mesh to be added to that object once it loaded in. This was a method that we had to use in the code from then on. 

The source for the bow model is this model: https://www.thingiverse.com/thing:2383635

## Change of Camera and Bow Aiming:

At the beginning of the project, we were using an example code called THREE.FirstPersonControls.js taken from https://github.com/IceCreamYou/Nemesis 

We decided against using this, so I used ThreeJS' Raycaster class to come up with a solution. What it does is takes the position of the mouse with respect to the current viewport. It then "casts" a ray originating from the middle of the active camera and going towards the given mouse coordinates. This is done using the Raycaster's function "setFromCamera()". I then take the direction vector of the ray and set an axis (for our rotation) based on which player is active. Lastly, I set the player's aimDummy's quaternion to rotate around our set axis to the arc-cosine of the ray direction's y-coordinate. Of course, I check for values going over 1 and under -1 for the y-coordinate. This gives the illusion that the player is looking at the mouse.

To actually view the player in third-person, I simply created two perspective cameras (ThreeJS) and rendered the scene based on which camera was behind the active player. The active camera and active player switches once the shot arrow is removed from the scene.

## Player Animation:

I also implemented the player moving as if pulling back on the bowstring. This "animation" happens as the player holds down the mouse button to build up more power in their shot. 

The way I did this is by reworking the heirarchy and taking advantage of the fact that an object will rotate and translate with its parent as its world (how sweet). To sum up the hierarchy changes from the CS336Object hierarchy example is that instead of going from the torso to the hands (torso, should, arm, etc.), I go from the hand (child of bow) and work my way toward the torso. In fact, the torso is a child of the left shoulder dummy and the right arm only gives the illusion of being connected to the torso. 

The animation looks the way it does by making the right hand go move towards the camera, away from the bow, at a rate that matches the "power" bar at the bottom of the screen. I then set the "wrist" and "elbow" of the right arm to rotate at a rate that gives the desired animation look. The left shoulder also rotates the torso to match up roughly with the right "shoulder's" position. To make sure that the rotations do not continue indefinitely, each rotating dummy object has an if-statement to limit the rotation of that dummy. 

Once the mouse is released, I call a function that resets the positions and rotations of the dummy objects back to their initial positions.

## README
I wrote the README file too! 


