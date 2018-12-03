/**
 * Encapsulates everything to create a player model and controls
 * @author Chandler Davis
 */
var Player = function(_color, _position, _rotation) {

	// Start the player with 100 health
	this.health = 100;

	this.material = new THREE.MeshPhongMaterial({color: _color});

	// The code below initializes the hierarchy of models for the player.

	// Start with the upper body
	this.torsoDummy = new THREE.Object3D();
	this.torsoDummy.position.copy(_position);
	this.torsoDummy.rotation.copy(_rotation);

	// Initialize upper torso
	this.torso = new THREE.Mesh(new THREE.CubeGeometry(40, 25, 20), this.material);
	this.torso.position.set(0,8,0);
	this.torsoDummy.add(this.torso);

	// Initialize head
	this.head = new THREE.Mesh(new THREE.CubeGeometry(16, 16, 16), this.material);
	this.head.position.set(0, 28, 0);
	this.torsoDummy.add(this.head);

	// Initialize left shoulder and dummy
	this.leftShoulderDummy = new THREE.Object3D();
	this.leftShoulderDummy.position.set(26,16,0);
	this.torsoDummy.add(this.leftShoulderDummy);
	
	this.leftShoulder = new THREE.Mesh(new THREE.CubeGeometry(12, 20, 8), this.material);
	this.leftShoulder.position.set(0,-8,0);
	this.leftShoulderDummy.add(this.leftShoulder);

	// Initialize right shoulder and dummy
	this.rightShoulderDummy = new THREE.Object3D();
	this.rightShoulderDummy.position.set(-26, 16, 0);
	this.torsoDummy.add(this.rightShoulderDummy);
	
	this.rightShoulder = new THREE.Mesh(new THREE.CubeGeometry(12, 20, 8), this.material);
	this.rightShoulder.position.set(0,-8,0);
	this.rightShoulderDummy.add(this.rightShoulder);

	// Initialize left arm and dummy
	this.leftArmDummy = new THREE.Object3D();
	this.leftArmDummy.position.set(0,-18,4);
	this.leftShoulderDummy.add(this.leftArmDummy);
	
	this.leftArm = new THREE.Mesh(new THREE.CubeGeometry(10, 20, 6), this.material);
	this.leftArm.position.set(0,-10,-4);
	this.leftArmDummy.add(this.leftArm);

	// Initialize right arm and dummy
	this.rightArmDummy = new THREE.Object3D();
	this.rightArmDummy.position.set(0,-18,4);
	this.rightShoulderDummy.add(this.rightArmDummy);
	
	this.rightArm = new THREE.Mesh(new THREE.CubeGeometry(10, 20, 6), this.material);
	this.rightArm.position.set(0,-10,-4);
	this.rightArmDummy.add(this.rightArm);

	// Initialize left hand and dummy
	this.leftHandDummy = new THREE.Object3D();
	this.leftHandDummy.position.set(0, -26, -4);
	this.leftArmDummy.add(this.leftHandDummy);

	this.leftHand = new THREE.Mesh(new THREE.CubeGeometry(10, 20, 6), this.material);
	this.leftHandDummy.add(this.leftHand);

	// Initialize right hand and dummy
	this.rightHandDummy = new THREE.Object3D();
	this.rightHandDummy.position.set(0, -26, -4);
	this.rightArmDummy.add(this.rightHandDummy);

	this.rightHand = new THREE.Mesh(new THREE.CubeGeometry(10, 20, 6), this.material);
	this.rightHandDummy.add(this.rightHand);

	// Start lower body

	// Initialize lower torso and dummy
	this.lowerTorsoDummy = new THREE.Object3D();
	// this.lowerTorsoDummy.position.set(0,-10,0);
	this.torsoDummy.add(this.lowerTorsoDummy);

	this.lowerTorso = new THREE.Mesh(new THREE.CubeGeometry(28, 18, 18), this.material);
	this.lowerTorso.position.set(0,-12.5,0);
	this.lowerTorsoDummy.add(this.lowerTorso);

	// Initialize waist and dummy
	this.waistDummy = new THREE.Object3D();
	this.waistDummy.position.set(0,-26,0);
	this.torsoDummy.add(this.waistDummy);
	
	this.waist = new THREE.Mesh(new THREE.CubeGeometry(14, 12, 18), this.material);
	this.waistDummy.add(this.waist);

	// Initialize left thigh and dummy
	this.leftThighDummy = new THREE.Object3D();
	this.leftThighDummy.position.set(13,-20,0);
	this.waistDummy.add(this.leftThighDummy);
	
	this.leftThigh = new THREE.Mesh(new THREE.CubeGeometry(12, 26, 12), this.material);
	this.leftThigh.position.set(0,13,0);
	this.leftThighDummy.add(this.leftThigh);

	// Initialize right thigh and dummy
	this.rightThighDummy = new THREE.Object3D();
	this.rightThighDummy.position.set(-13,-20,0);
	this.waistDummy.add(this.rightThighDummy);
	
	this.rightThigh = new THREE.Mesh(new THREE.CubeGeometry(12, 26, 12), this.material);
	this.rightThigh.position.set(0,13,0);
	this.rightThighDummy.add(this.rightThigh);

	// Initialize left calf and dummy
	this.leftCalfDummy = new THREE.Object3D();
	this.leftCalfDummy.position.set(0,-26,0);
	this.leftThighDummy.add(this.leftCalfDummy);
	
	this.leftCalf = new THREE.Mesh(new THREE.CubeGeometry(10, 26, 10), this.material);
	this.leftCalf.position.set(0,13,0);
	this.leftCalfDummy.add(this.leftCalf);

	// Initialize right calf and dummy
	this.rightCalfDummy = new THREE.Object3D();
	this.rightCalfDummy.position.set(0,-26,0);
	this.rightThighDummy.add(this.rightCalfDummy);
	
	this.rightCalf = new THREE.Mesh(new THREE.CubeGeometry(10, 26, 10), this.material);
	this.rightCalf.position.set(0,13,0);
	this.rightCalfDummy.add(this.rightCalf);

	// Initialize left foot
	this.leftFoot = new THREE.Mesh(new THREE.CubeGeometry(12, 4, 20), this.material);
	this.leftFoot.position.set(0, -2, 4);
	this.leftCalfDummy.add(this.leftFoot);

	// Initialize right foot
	this.rightFoot = new THREE.Mesh(new THREE.CubeGeometry(12, 4, 20), this.material);
	this.rightFoot.position.set(0, -2, 4);
	this.rightCalfDummy.add(this.rightFoot);
};

Player.prototype.setPosition = function(newPos) {
	this.torsoDummy.position.copy(newPos);
};

Player.prototype.setRotation = function(newRot) {
	this.torsoDummy.rotation.copy(newRot); 
};

