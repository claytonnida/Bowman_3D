var map = [ // 1  0  3  4  5  6  7  8  9
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 0
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 1
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 0
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 3
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 4
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 5
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 6
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 7
           [1, 0, 0, 0, 0, 0, 0, 0, 0, 1,], // 8
           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,], // 9
           ], mapW = map.length, mapH = map[0].length;

// Semi-constants
var WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight,
	ASPECT = WIDTH / HEIGHT,
	UNITSIZE = 250,
	WALLHEIGHT = UNITSIZE / 3,
	MOVESPEED = 100,
	LOOKSPEED = 0.075,
	BULLETMOVESPEED = MOVESPEED * 5,
	NUMTARGETS = 5,
	PROJECTILEDAMAGE = 20;
// Global vars
var scene, cam, backgroundScene, backgroundCamera, renderer, controls, clock, projector, model, skin;
var runAnim = true, mouse = { x: 0, y: 0 }, kills = 0, health = 100;
var healthCube, lastHealthPickup = 0;

// Initialize and run on document ready
$(document).ready(function() 
{
	$('body').append('<div id="intro">Click to start</div>');
	$('#intro').css({width: WIDTH, height: HEIGHT}).one('click', function(e) 
	{
		e.preventDefault();
		$(this).fadeOut();
		init();
		//setInterval(drawRadar, 1000);
		animate();
	});
});

// Setup
function init() 
{
	clock = new THREE.Clock(); // Used in render() for controls.update()
	projector = new THREE.Projector(); // Used in bullet projection
	scene = new THREE.Scene(); // Holds all objects in the canvas
	//scene.fog = new THREE.FogExp2(0xD6F1FF, 0.0005); // color, density
	
	// Set up camera
	cam = new THREE.PerspectiveCamera(60, ASPECT, 1, 10000); // FOV, aspect, near, far
	cam.position.y = UNITSIZE * .2;
	cam.position.x = -1000;
	cam.position.z = -1000;
	scene.add(cam);
	
	// Camera moves with mouse, flies around with WASD/arrow keys
	controls = new THREE.FirstPersonControls(cam);
	controls.movementSpeed = 600;
	controls.lookSpeed = .15;
	
	controls.lookVertical = true; // Temporary solution; play on flat surfaces only
	controls.noFly = true;

	// World objects
	setupScene();
	
	// Artificial Intelligence
	initTargets();
	
	// Handle drawing as WebGL (faster than Canvas but less supported)
	renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setSize(WIDTH, HEIGHT);
	var spotLight = new THREE.SpotLight( 0xF7EFBE );
	spotLight.position.set( 0, 1000, 0 );

	spotLight.castShadow = true;

	spotLight.shadow.mapSize.width = mapW * UNITSIZE, 10, mapW * UNITSIZE;
	spotLight.shadow.mapSize.height = mapW * UNITSIZE, 10, mapW * UNITSIZE;

	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 10000;
	spotLight.shadow.camera.fov = 60;

	scene.add( spotLight );
	//renderer.setClearColor(0x00000, 1.0);
	//renderer.setClearColor(0x003400,0);
	// Add the canvas to the document
	//renderer.domElement.style.backgroundColor = '#D6F1FF'; // easier to see
	document.body.appendChild(renderer.domElement);
	
	// Track mouse position so we know where to shoot
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	
	// Shoot on click
	$(document).click(function(e) 
	{
		e.preventDefault;
		if (e.which === 1) 
		{ // Left click only
			createBullet();
		}
	});
	
	// Display HUD
	//$('body').append('<canvas id="radar" width="200" height="200"></canvas>');
	$('body').append('<div id="hud"><p>Health: <span id="health">100</span><br />Score: <span id="score">0</span></p></div>');
	//$('body').append('<div id="credits"><p>Created by <a href="http://www.isaacsukin.com/">Isaac Sukin</a> using <a href="http://mrdoob.github.com/three.js/">Three.js</a><br />WASD to move, mouse to look, click to shoot</p></div>');
	
	// Set up "hurt" flash
	$('body').append('<div id="hurt"></div>');
	$('#hurt').css({width: WIDTH, height: HEIGHT,});
}

// Helper function for browser frames
function animate() 
{
	if (runAnim) 
	{
		requestAnimationFrame(animate);
	}
	render();
}

// Update and display
function render() 
{
	var delta = clock.getDelta(), speed = delta * BULLETMOVESPEED;
	var aispeed = delta * MOVESPEED;
	controls.update(delta); // Move camera
	
	// Rotate the health cube
	//healthcube.rotation.x += 0.004
	//healthcube.rotation.y += 0.008;
	// Allow picking it up once per minute
	//if (Date.now() > lastHealthPickup + 60000) 
	//{
	//	if (distance(cam.position.x, cam.position.z, healthcube.position.x, healthcube.position.z) < 15 && health != 100) 
	//	{
	//		health = Math.min(health + 50, 100);
	//		$('#health').html(health);
		//	lastHealthPickup = Date.now();
	//	}
	//	healthcube.material.wireframe = false;
	//}
	//else 
	//{
	//	healthcube.material.wireframe = true;
	//}

	// Update bullets. Walk backwards through the list so we can remove items.
	for (var i = bullets.length-1; i >= 0; i--) 
	{
		var b = bullets[i], p = b.position, d = b.ray.direction;
		if (checkWallCollision(p)) 
		{
			bullets.splice(i, 1);
			scene.remove(b);
			continue;
		}
		// Collide with AI
		var hit = false;
		for (var j = targets.length-1; j >= 0; j--) 
		{
			var a = targets[j];
			var v = a.geometry.vertices[0];
			var c = a.position;
			var x = Math.abs(v.x), z = Math.abs(v.z);
			//console.log(Math.round(p.x), Math.round(p.z), c.x, c.z, x, z);
			if (p.x < c.x + x && p.x > c.x - x &&
					p.z < c.z + z && p.z > c.z - z &&
					b.owner != a) 
					{
				bullets.splice(i, 1);
				scene.remove(b);
				a.health -= PROJECTILEDAMAGE;
				var color = a.material.color, percent = a.health / 100;
				a.material.color.setRGB(
						percent * color.r,
						percent * color.g,
						percent * color.b
				);
				hit = true;
				break;
			}
		}
		// // Bullet hits player
		// if (distance(p.x, p.z, cam.position.x, cam.position.z) < 25 && b.owner != cam) 
		// {
		// 	$('#hurt').fadeIn(75);
		// 	health -= 10;
		// 	if (health < 0) health = 0;
		// 	val = health < 25 ? '<span style="color: darkRed">' + health + '</span>' : health;
		// 	$('#health').html(val);
		// 	bullets.splice(i, 1);
		// 	scene.remove(b);
		// 	$('#hurt').fadeOut(350);
		// }
		// if (!hit) 
		// {
		 	b.translateX(speed * d.x);
		// 	//bullets[i].translateY(speed * bullets[i].direction.y);
			b.translateZ(speed * d.z);
		// }
	}
	
	// Update AI.
	for (var i = targets.length-1; i >= 0; i--) 
	{
		var a = targets[i];
		// if (a.health <= 0) 
		// {
		// 	targets.splice(i, 1);
		// 	scene.remove(a);
		// 	kills++;
		// 	$('#score').html(kills * 100);
		// 	addAI();
		// }
		// Move AI
		// var r = Math.random();
		// if (r > 0.995) 
		// {
		// 	a.lastRandomX = Math.random() * 2 - 1;
		// 	a.lastRandomZ = Math.random() * 2 - 1;
		// }
		// a.translateX(aispeed * a.lastRandomX);
		// a.translateZ(aispeed * a.lastRandomZ);
		// var c = getMapSector(a.position);
		// if (c.x < 0 || c.x >= mapW || c.y < 0 || c.y >= mapH || checkWallCollision(a.position))
		// {
		// 	a.translateX(-2 * aispeed * a.lastRandomX);
		// 	a.translateZ(-2 * aispeed * a.lastRandomZ);
		// 	a.lastRandomX = Math.random() * 2 - 1;
		// 	a.lastRandomZ = Math.random() * 2 - 1;
		// }
		// if (c.x < -1 || c.x > mapW || c.z < -1 || c.z > mapH) 
		// {
		// 	targets.splice(i, 1);
		// 	scene.remove(a);
		// 	addAI();
		// }
		/*
		var c = getMapSector(a.position);
		if (a.pathPos == a.path.length-1) {
			console.log('finding new path for '+c.x+','+c.z);
			a.pathPos = 1;
			a.path = getAIpath(a);
		}
		var dest = a.path[a.pathPos], proportion = (c.z-dest[1])/(c.x-dest[0]);
		a.translateX(aispeed * proportion);
		a.translateZ(aispeed * 1-proportion);
		console.log(c.x, c.z, dest[0], dest[1]);
		if (c.x == dest[0] && c.z == dest[1]) {
			console.log(c.x+','+c.z+' reached destination');
			a.PathPos++;
		}
		*/
		// var cc = getMapSector(cam.position);
		// if (Date.now() > a.lastShot + 750 && distance(c.x, c.z, cc.x, cc.z) < 2) 
		// {
		// 	createBullet(a);
		// 	a.lastShot = Date.now();
		// }
	}
	renderer.autoClear = false;
	renderer.clear();
	renderer.render(backgroundScene, backgroundCamera)
	renderer.render(scene, cam); // Repaint
	
	// Death
	if (health <= 0) 
	{
		runAnim = false;
		$(renderer.domElement).fadeOut();
		$('#radar, #hud, #credits').fadeOut();
		$('#intro').fadeIn();
		$('#intro').html('Ouch! Click to restart...');
		$('#intro').one('click', function() {
			location = location;
			/*
			$(renderer.domElement).fadeIn();
			$('#radar, #hud, #credits').fadeIn();
			$(this).fadeOut();
			runAnim = true;
			animate();
			health = 100;
			$('#health').html(health);
			kills--;
			if (kills <= 0) kills = 0;
			$('#score').html(kills * 100);
			cam.translateX(-cam.position.x);
			cam.translateZ(-cam.position.z);
			*/
		});
	}

	// if (!paused)
	// {
	// 	switch(axis)
	// 	{
	// 	case 'x':
	// 	player2.rotation.y += .01;
	// 	console.log(player2.rotation.y);
	// 		//model = new Matrix4().setRotate(increment, 1, 0, 0).multiply(model);
	// 		axis = 'x';
	// 		break;
	// 	case 'y':
	// 		axis = 'y';
	// 		//model = new Matrix4().setRotate(increment, 0, 1, 0).multiply(model);
	// 		break;
	// 	case 'z':
	// 		axis = 'z';
	// 		//model = new Matrix4().setRotate(increment, 0, 0, 1).multiply(model);
	// 		break;
	// 	default:
	// 	}
	// }

}

// Set up the objects in the world
function setupScene() 
{
	var UNITSIZE = 250, units = mapW;
	var floorGeo = new THREE.CubeGeometry(units * UNITSIZE, 10, units * UNITSIZE);
	floorGeo.computeVertexNormals();
	floorGeo.computeFaceNormals();
	//Geometry: floor
	var floor = new THREE.Mesh(
		floorGeo,
			new THREE.MeshLambertMaterial({color: 0xEDCBA0,/*map: t.ImageUtils.loadTexture('images/floor-1.jpg')*/})
	);
	floor.receiveShadow = true;
	

scene.add(floor);
	
	// Geometry: walls
	//var cube = new t.CubeGeometry(UNITSIZE, WALLHEIGHT, UNITSIZE);
	//var materials = [
	             //    new t.MeshLambertMaterial({/*color: 0x00CCAA,*/map: t.ImageUtils.loadTexture('images/wall-1.jpg')}),
	            //     new t.MeshLambertMaterial({/*color: 0xC5EDA0,*/map: t.ImageUtils.loadTexture('images/wall-2.jpg')}),
	           //      new t.MeshLambertMaterial({color: 0xFBEBCD}),
	        //         ];
	// for (var i = 0; i < mapW; i++) 
	// {
	// 	for (var j = 0, m = map[i].length; j < m; j++) 
	// 	{
	// 		if (map[i][j]) 
	// 		{
	// 			var wall = new t.Mesh(cube, materials[map[i][j]-1]);
	// 			wall.position.x = (i - units/2) * UNITSIZE;
	// 			wall.position.y = WALLHEIGHT/2;
	// 			wall.position.z = (j - units/2) * UNITSIZE;
	// 			scene.add(wall);
	// 		}
	// 	}
	// }
	
	// Health cube
	//healthcube = new t.Mesh(
	//		new t.CubeGeometry(30, 30, 30),
	//		new t.MeshBasicMaterial({map: t.ImageUtils.loadTexture('images/health.png')})
	//);
	//healthcube.position.set(-UNITSIZE-15, 35, -UNITSIZE-15);
	//scene.add(healthcube);
	
	// var light = new t.PointLight(0xffffff);
	// light.position.set(100,1000,100);
	// scene.add(light);
	// light  = new t.DirectionalLight(0xffffff, 1.0);
	// light.position.set(0, 0, 0);
	// scene.add(light);
	// light  = new t.AmbientLight(0x404040);
	// scene.add(light);
	// Lighting
	
	var directionalLight1 = new THREE.DirectionalLight(0xF7EFBE, .5);
	 directionalLight1.position.set( .5, .9, .5);
	 directionalLight1.castShadow = true;
	 scene.add( directionalLight1 );
	 var directionalLight2 = new THREE.DirectionalLight(0xF7EFBE, .5);
	 directionalLight2.position.set( -.5, .9, -.5);
	 directionalLight2.castShadow = true;
	 scene.add( directionalLight2 );
	// var directionalLight1 = new t.DirectionalLight( 0xF7EFBE, 1 );
	// directionalLight1.position.set( 0.5, 1, 0.5 );
	// scene.add( directionalLight1 );
	///var light = new THREE.AmbientLight(0xF7EFBE, 0.1); // soft white light
//scene.add( light );
	// var directionalLight2 = new t.DirectionalLight( 0xF7EFBE, 0.5 );
	// directionalLight2.position.set( -1, -1, -1 );
	// scene.add( directionalLight2 );


	// Load the background texture
	var texture = new THREE.ImageUtils.loadTexture('images/Top-Header-Grass-Sky-Background-JPG.jpg');
	var backgroundMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(2, 2, 0),
		new THREE.MeshBasicMaterial({
			map: texture
		}));

	backgroundMesh .material.depthTest = false;
	backgroundMesh .material.depthWrite = false;

	// Create your background scene
	backgroundScene = new THREE.Scene();
	backgroundCamera = new THREE.Camera();
	backgroundScene .add(backgroundCamera );
	backgroundScene .add(backgroundMesh );

	
}

var targets = [];
var player1;
var player2;
var headGeo = new THREE.CubeGeometry(16, 16, 16);
var torsoGeo = new THREE.CubeGeometry(40, 25, 20);
var lowerTorsoGeo = new THREE.CubeGeometry(34, 15, 18);
var shoulderGeo = new THREE.CubeGeometry(12, 20, 8);
var armGeo = new THREE.CubeGeometry(10, 20, 6);
var handGeo = new THREE.CubeGeometry(4, 12, 12);
var waistGeo = new THREE.CubeGeometry(14, 12, 18);
var thighGeo = new THREE.CubeGeometry(12, 26, 12);
var calfGeo = new THREE.CubeGeometry(10, 26, 10);
var footGeo = new THREE.CubeGeometry(12, 4, 20);

function initTargets() 
{
	for (var i = 0; i < 1; i++) 
	{
		addAI();
	}
}

function addAI() 
{
// 	torsoGeo.computeVertexNormals();
// torsoGeo.computeFaceNormals();
// shoulderGeo.computeVertexNormals();
// shoulderGeo.computeFaceNormals();
// armGeo.computeVertexNormals();
// armGeo.computeFaceNormals();
	var c = getMapSector(cam.position);
	var player1Material = new THREE.MeshPhongMaterial({color: 0xff0000/*,map: t.ImageUtils.loadTexture('images/target.png')*/});
	var player2Material = new THREE.MeshPhongMaterial({color: 0x0000ff/*,map: t.ImageUtils.loadTexture('images/target.png')*/});
	var material = player1Material;
	for(let i = 1; i < 3 ; i++)
	{

	if(i == 2)
	{
		material = player2Material;
	}
	var torsoDummy = new THREE.Object3D();

	var torso = new THREE.Mesh(torsoGeo, material);
	torso.position.set(0,8,0);
	torsoDummy.add(torso);

	var lowerTorso = new THREE.Mesh(lowerTorsoGeo, material);
	lowerTorso.position.set(0,-12.5,0);
	torsoDummy.add(lowerTorso);

	var leftShoulderDummy = new THREE.Object3D();
	leftShoulderDummy.position.set(26,16,0);
	torsoDummy.add(leftShoulderDummy);
	var leftShoulder = new THREE.Mesh(shoulderGeo, material);
	leftShoulder.position.set(0,-8,0);
	leftShoulderDummy.add(leftShoulder);

	var rightShoulderDummy = new THREE.Object3D();
	rightShoulderDummy.position.set(-26,16,0);
	torsoDummy.add(rightShoulderDummy);
	var rightShoulder = new THREE.Mesh(shoulderGeo, material);
	rightShoulder.position.set(0,-8,0);
	rightShoulderDummy.add(rightShoulder);

	var leftArmDummy = new THREE.Object3D();
	leftArmDummy.position.set(0,-18,4);
	leftShoulderDummy.add(leftArmDummy);
	var leftArm =  new THREE.Mesh(armGeo, material);
	leftArm.position.set(0,-10,-4);
	leftArmDummy.add(leftArm);


	var rightArmDummy = new THREE.Object3D();
	rightArmDummy.position.set(0,-18,4);
	rightShoulderDummy.add(rightArmDummy);
	var rightArm =  new THREE.Mesh(armGeo, material);
	rightArm.position.set(0,-10,-4);
	rightArmDummy.add(rightArm);

	var leftHand = new THREE.Mesh(handGeo, material);
	leftHand.position.set(0, -26, -4.0);
	leftArmDummy.add(leftHand);

	var rightHand = new THREE.Mesh(handGeo, material);
	rightHand.position.set(0, -26, -4.0);
	rightArmDummy.add(rightHand);

	var head = new THREE.Mesh(headGeo, material);
	head.position.set(0, 28, 0);
	torsoDummy.add(head);

	var lowerTorsoDummy = new THREE.Object3D();
	lowerTorsoDummy.position.set(0,-10,0);
	torsoDummy.add(lowerTorsoDummy);

	var lowerTorso = new THREE.Mesh(lowerTorsoGeo, material);
	//lowerTorso.position.set(0,-10,0);
	lowerTorsoDummy.add(lowerTorso);

	var waistDummy = new THREE.Object3D();
	waistDummy.position.set(0,-26,0);
	torsoDummy.add(waistDummy);
	var waist =  new THREE.Mesh(waistGeo, material);
	waistDummy.add(waist);

	var leftThighDummy = new THREE.Object3D();
	leftThighDummy.position.set(13,-20,0);
	waistDummy.add(leftThighDummy);
	var leftThigh = new THREE.Mesh(thighGeo, material);
	leftThigh.position.set(0,13,0);
	leftThighDummy.add(leftThigh);

	var rightThighDummy = new THREE.Object3D();
	rightThighDummy.position.set(-13,-20,0);
	waistDummy.add(rightThighDummy);
	var rightThigh = new THREE.Mesh(thighGeo, material);
	rightThigh.position.set(0,13,0);
	rightThighDummy.add(rightThigh);

	var rightCalfDummy = new THREE.Object3D();
	rightCalfDummy.position.set(0,-26,0);
	rightThighDummy.add(rightCalfDummy);
	var rightCalf = new THREE.Mesh(calfGeo, material);
	rightCalf.position.set(0,13,0);
	rightCalfDummy.add(rightCalf);

	var leftCalfDummy = new THREE.Object3D();
	leftCalfDummy.position.set(0,-26,0);
	leftThighDummy.add(leftCalfDummy);
	var leftCalf = new THREE.Mesh(calfGeo, material);
	leftCalf.position.set(0,13,0);
	leftCalfDummy.add(leftCalf);

	var leftFoot = new THREE.Mesh(footGeo, material);
	leftFoot.position.set(0, -2, 4);
	leftCalfDummy.add(leftFoot);

	var rightFoot = new THREE.Mesh(footGeo, material);
	rightFoot.position.set(0, -2, 4);
	rightCalfDummy.add(rightFoot);

	// do 
	// {
	 	//var x = (mapW-1) ;
	 	//var z = (mapH-1) ;
	// } while (map[x][z] > 0 || (x == c.x && z == c.z));
	// x = Math.floor(x - mapW/2) * UNITSIZE;
	 //z = Math.floor(z - mapW/2) * UNITSIZE;
	 
	 //o.position.set(1000, UNITSIZE * 0.15, 1000);
	 //o.health = 100;
	// o.path = getAIpath(o);
	// o.pathPos = 1;
	 //o.lastRandomX = Math.random();
	 //o.lastRandomZ = Math.random();
	//o.lastShot = Date.now(); // Higher-fidelity timers aren't a big deal here.
	if(i == 2)
	{
		torsoDummy.position.set(-1000, 168/2, -1000);
		torsoDummy.rotation.y += 7.1;
		player2 = torsoDummy;
	}
	else
	{
		torsoDummy.position.set(1000, 168/2, 1000);
		torsoDummy.rotation.y -= 15;
		player1 = torsoDummy;
	}
	
	
	torso.castShadow = true;
	torso.receiveShadow = true;
	lowerTorso.castShadow = true;
	lowerTorso.receiveShadow = true;
	leftShoulder.castShadow = true;
	leftShoulder.receiveShadow = true;
	leftArm.castShadow = true;
	leftArm.receiveShadow = true;
	rightShoulder.castShadow = true;
	rightShoulder.receiveShadow = true;
	rightArm.castShadow = true;
	rightArm.receiveShadow = true;
	leftHand.castShadow = true;
	leftHand.receiveShadow = true;
	rightHand.castShadow = true;
	rightHand.receiveShadow = true;
	head.castShadow = true;
	head.receiveShadow = true;
	waist.castShadow = true;
	waist.receiveShadow = true;
	leftThigh.castShadow = true;
	leftThigh.receiveShadow = true;
	rightThigh.castShadow = true;
	rightThigh.receiveShadow = true;
	rightCalf.castShadow = true;
	rightCalf.receiveShadow = true;
	leftCalf.castShadow = true;
	leftCalf.receiveShadow = true;
	rightFoot.castShadow = true;
	rightFoot.receiveShadow = true;
	leftFoot.castShadow = true;
	leftFoot.receiveShadow = true;
	targets.push(torso);
	scene.add(torsoDummy);
	}
}

// function getAIpath(a) 
// {
// 	var p = getMapSector(a.position);
// 	do 
// 	{ // Cop-out
// 		do 
// 		{
// 			var x = getRandBetween(0, mapW-1);
// 			var z = getRandBetween(0, mapH-1);
// 		} while (map[x][z] > 0 || distance(p.x, p.z, x, z) < 3);
// 		var path = findAIpath(p.x, p.z, x, z);
// 	} while (path.length == 0);
// 	return path;
// }

/**
 * Find a path from one grid cell to another.
 *
 * @param sX
 *   Starting grid x-coordinate.
 * @param sZ
 *   Starting grid z-coordinate.
 * @param eX
 *   Ending grid x-coordinate.
 * @param eZ
 *   Ending grid z-coordinate.
 * @returns
 *   An array of coordinates including the start and end positions representing
 *   the path from the starting cell to the ending cell.
 */
// function findAIpath(sX, sZ, eX, eZ) 
// {
// 	var backupGrid = grid.clone();
// 	var path = finder.findPath(sX, sZ, eX, eZ, grid);
// 	grid = backupGrid;
// 	return path;
// }

function distance(x1, y1, x2, y2) 
{
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}

function getMapSector(v) 
{
	var x = Math.floor((v.x + UNITSIZE / 2) / UNITSIZE + mapW/2);
	var z = Math.floor((v.z + UNITSIZE / 2) / UNITSIZE + mapW/2);
	return {x: x, z: z};
}

/**
 * Check whether a Vector3 overlaps with a wall.
 *
 * @param v
 *   A THREE.Vector3 object representing a point in space.
 *   Passing cam.position is especially useful.
 * @returns {Boolean}
 *   true if the vector is inside a wall; false otherwise.
 */
function checkWallCollision(v)
{
	var c = getMapSector(v);
	return map[c.x][c.z] > 0;
}



var bullets = [];
var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x333333});
var sphereGeo = new THREE.SphereGeometry(.5, .5, 100);
var Material = new THREE.MeshLambertMaterial({color : 0xfb0000});
Material.side = THREE.DoubleSide;
function createBullet(obj) 
{
	if (obj === undefined) 
	{
		obj = cam;
	}
	var sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
	sphere.position.set(obj.position.x, obj.position.y * 0.8, obj.position.z);

	if (obj instanceof THREE.Camera) 
	{
		var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
		//projector.unprojectVector(vector, obj);
		vector.unproject(obj);
		sphere.ray = new THREE.Ray(
				obj.position,
				vector.sub(obj.position).normalize()
		);
	}
	else 
	{
		var vector = cam.position.clone();
		sphere.ray = new THREE.Ray(
				obj.position,
				vector.subSelf(obj.position).normalize()
		);
	}
	sphere.owner = obj;
	
	bullets.push(sphere);
	scene.add(sphere);
	
	return sphere;
}

/*
function loadImage(path) {
	var image = document.createElement('img');
	var texture = new t.Texture(image, t.UVMapping);
	image.onload = function() { texture.needsUpdate = true; };
	image.src = path;
	return texture;
}
*/

function onDocumentMouseMove(e) 
{
	e.preventDefault();
	mouse.x = (e.clientX / WIDTH) * 2 - 1;
	mouse.y = - (e.clientY / HEIGHT) * 2 + 1;
	//mouse.z = -(e.clientZ) *2 + 1;
}

// Handle window resizing
$(window).resize(function() 
{
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;
	ASPECT = WIDTH / HEIGHT;
	if (cam) 
	{
		cam.aspect = ASPECT;
		cam.updateProjectionMatrix();
	}
	if (renderer) 
	{
		renderer.setSize(WIDTH, HEIGHT);
	}
	$('#intro, #hurt').css({width: WIDTH, height: HEIGHT,});
});

// Stop moving around when the window is unfocused (keeps my sanity!)
$(window).focus(function() 
{
	if (controls) controls.freeze = false;
});
$(window).blur(function() 
{
	if (controls) controls.freeze = true;
});

//Get a random integer between lo and hi, inclusive.
//Assumes lo and hi are integers and lo is lower than hi.
function getRandBetween(lo, hi)
{
 return parseInt(Math.floor(Math.random()*(hi-lo+1))+lo, 10);
}

var axis = 'x';
var paused = false;

function getChar(event) {
	if (event.which == null) {
	 return String.fromCharCode(event.keyCode) // IE
	} else if (event.which!=0 && event.charCode!=0) {
	 return String.fromCharCode(event.which)   // the rest
	} else {
	 return null // special key
	}
	}
	
	//handler for key press events will choose which axis to
	// rotate around
	function handleKeyPress(event)
	{
		var ch = getChar(event);
		switch(ch)
		{
		case ' ':
			paused = !paused;
			break;
		case 'x':
			//player2.rotation.y += 1;
			//console.log(player2.rotation.y);
			axis = 'x';
			break;
		case 'y':
			//axis = 'y';
			//m.setRotate(15, 0, 1, 0);
			break;
		case 'z':
			//axis = 'z';
			//m.setRotate(15, 0, 0, 1);
			break;
		case 'o':
			//model.setIdentity();
			//axis = 'x';
			break;
			default:
				return;
		}
	}