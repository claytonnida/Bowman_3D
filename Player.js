/**
 * Encapsulates everything to create a player model and controls
 * @author Chandler Davis
 */
var Player = function(_color, _position, _rotation, _bow) {

	this.health = 100;

	this.material = new THREE.MeshPhongMaterial({color: _color});

	this.bow = _bow;
	this.bow.position.set(-5, 7, 100);

	let middle = new THREE.Object3D();
	middle.position.set(-.7, -20, -38);

	// TODO: Remove this. It's for testing
	middle.add(new THREE.Mesh( new THREE.CubeGeometry(1,2.5,1), new THREE.MeshPhongMaterial({color: 0x55ff00})));

	this.bow.add(middle);

	this.playerDummy = new THREE.Object3D();
	this.playerDummy.position.copy(_position);
	this.playerDummy.rotation.copy(_rotation);

	this.playerDummy.add(this.bow);

	this.leftHandDummy = new THREE.Object3D();
	this.leftHandDummy.position.set(0, -20, -35);
	this.bow.add(this.leftHandDummy);

	this.leftHand = new THREE.Mesh(new THREE.CubeGeometry(3, 5, 5), this.material);
	this.leftHandDummy.add(this.leftHand);

	this.leftArmDummy = new THREE.Object3D();
	this.leftArmDummy.position.set(0, -2, 0);
	this.leftArmDummy.rotateZ(.25);
	this.leftHandDummy.add(this.leftArmDummy);
	
	this.leftArm = new THREE.Mesh(new THREE.CubeGeometry(3, 13, 4), this.material);
	this.leftArm.position.set(0, -6.5, 0);
	this.leftArmDummy.add(this.leftArm);

	this.leftElbowDummy = new THREE.Object3D();
	this.leftElbowDummy.position.set(0, -6.5, 0);
	this.leftElbowDummy.rotateZ(-.1);
	this.leftArm.add(this.leftElbowDummy);

	this.leftElbow = new THREE.Mesh(new THREE.CubeGeometry(4,4,4), this.material);
	this.leftElbowDummy.add(this.leftElbow);

	this.leftShoulder = new THREE.Mesh(new THREE.CubeGeometry(3.8, 13, 3.8), this.material);
	this.leftShoulder.position.set(0,-6.5,0);
	this.leftElbowDummy.add(this.leftShoulder);

	this.leftShoulderDummy = new THREE.Object3D();
	this.leftShoulderDummy.position.set(0, -7, 0);
	this.leftShoulderDummy.rotateZ(-.6);
	this.leftShoulderDummy.add(new THREE.Mesh(new THREE.CubeGeometry(4.4, 4.4, 4.4), this.material));
	this.leftShoulder.add(this.leftShoulderDummy);

	this.upperTorsoDummy = new THREE.Object3D();
	this.upperTorsoDummy.rotateX(-1.5078);
	this.upperTorsoDummy.position.set(0, -7, 0);
	this.leftShoulderDummy.add(this.upperTorsoDummy);

	this.upperTorso = new THREE.Mesh(new THREE.CubeGeometry(7, 6, 15), this.material);
	// this.upperTorso.position.set(0,8,0);
	this.upperTorsoDummy.add(this.upperTorso);

	// this.head = new THREE.Mesh(new THREE.CubeGeometry(6, 7, 6), this.material);
	// this.head.position.set(0, 6, 0);
	// this.upperTorsoDummy.add(this.head);

	this.rightHandDummy = new THREE.Object3D();
	this.rightHandDummy.position.set(-.6, -32, -36);
	this.bow.add(this.rightHandDummy);

	this.rightHand = new THREE.Mesh(new THREE.CubeGeometry(3, 5, 5), this.material);
	this.rightHandDummy.add(this.rightHand);

	this.rightArmDummy = new THREE.Object3D();
	this.rightArmDummy.position.set(0, -2, 0);
	this.rightArmDummy.rotateZ(-.2);
	this.rightHandDummy.add(this.rightArmDummy);
	
	this.rightArm = new THREE.Mesh(new THREE.CubeGeometry(3, 13, 4), this.material);
	this.rightArm.position.set(0, -6.5, 0);
	this.rightArmDummy.add(this.rightArm);

	this.rightElbowDummy = new THREE.Object3D();
	this.rightElbowDummy.position.set(0, -6.5, 0);
	this.rightElbowDummy.rotateZ(0.2);
	this.rightArm.add(this.rightElbowDummy);

	this.rightElbow = new THREE.Mesh(new THREE.CubeGeometry(4,4,4), this.material);
	this.rightElbowDummy.add(this.rightElbow);

	this.rightShoulder = new THREE.Mesh(new THREE.CubeGeometry(3.8, 13, 3.8), this.material);
	this.rightShoulder.position.set(0, -6.5 ,0);
	this.rightElbowDummy.add(this.rightShoulder);


	// this.lowerTorso = new THREE.Mesh(new THREE.CubeGeometry(28, 18, 18), this.material);
	// this.lowerTorso.position.set(0,-12.5,0);
	// this.upperTorsoDummy.add(this.lowerTorso);

	this.waistDummy = new THREE.Object3D();
	this.waistDummy.position.set(0,-26,0);
	this.waistDummy.rotateY(-1.2);
	this.playerDummy.add(this.waistDummy);
	
	this.waist = new THREE.Mesh(new THREE.CubeGeometry(14, 12, 18), this.material);
	this.waistDummy.add(this.waist);

	this.leftThighDummy = new THREE.Object3D();
	this.leftThighDummy.position.set(13,-20,0);
	this.waistDummy.add(this.leftThighDummy);
	
	this.leftThigh = new THREE.Mesh(new THREE.CubeGeometry(12, 26, 12), this.material);
	this.leftThigh.position.set(0,13,0);
	this.leftThighDummy.add(this.leftThigh);

	this.rightThighDummy = new THREE.Object3D();
	this.rightThighDummy.position.set(-13,-20,0);
	this.waistDummy.add(this.rightThighDummy);
	
	this.rightThigh = new THREE.Mesh(new THREE.CubeGeometry(12, 26, 12), this.material);
	this.rightThigh.position.set(0,13,0);
	this.rightThighDummy.add(this.rightThigh);

	this.leftCalfDummy = new THREE.Object3D();
	this.leftCalfDummy.position.set(0,-26,0);
	this.leftThighDummy.add(this.leftCalfDummy);
	
	this.leftCalf = new THREE.Mesh(new THREE.CubeGeometry(10, 26, 10), this.material);
	this.leftCalf.position.set(0,13,0);
	this.leftCalfDummy.add(this.leftCalf);

	this.rightCalfDummy = new THREE.Object3D();
	this.rightCalfDummy.position.set(0,-26,0);
	this.rightThighDummy.add(this.rightCalfDummy);
	
	this.rightCalf = new THREE.Mesh(new THREE.CubeGeometry(10, 26, 10), this.material);
	this.rightCalf.position.set(0,13,0);
	this.rightCalfDummy.add(this.rightCalf);

	this.leftFoot = new THREE.Mesh(new THREE.CubeGeometry(12, 4, 20), this.material);
	this.leftFoot.position.set(0, -2, 4);
	this.leftCalfDummy.add(this.leftFoot);

	this.rightFoot = new THREE.Mesh(new THREE.CubeGeometry(12, 4, 20), this.material);
	this.rightFoot.position.set(0, -2, 4);
	this.rightCalfDummy.add(this.rightFoot);
};

Player.prototype.setPosition = function(newPos) {
	this.playerDummy.position.copy(newPos);
};

Player.prototype.setRotation = function(newRot) {
	this.playerDummy.rotation.copy(newRot); 
};