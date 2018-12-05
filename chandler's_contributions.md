## Chandler's Contributions


# Player.js:

I implemented everthing in this class. Initially, this was done in the main Javascript code, but I felt that it would be better to encapsulate the hierarchy in its own class. This proved beneficial as we were able to clean up the code and have better checks to see which player was active. Another added plus is that once we had the player class working, we could place both player models without another hierarchy.

# index.html:

## Encapsulation: 

A lot of the encapsulation of code into separate methods was done by me.
This was a minor change, but helpful in the readability of my code.

## Change of camera:

At the beginning of the project, we were using an example code called THREE.FirstPersonControls.js taken from https://github.com/IceCreamYou/Nemesis 

We decided against using this, so I used Clayton's code that drew an arrow in front of the player. I took that code and made it work with the player. What it does is takes