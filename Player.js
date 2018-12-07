/**
 * Encapsulates everything to create a player model and controls.
 *
 * I based this code off of the CS336Object example hierarchy shown in class.
 * I have a different ordering of parts and it's using the ThreeJS library,
 * but the core idea is the same.
 *
 * The hierarchy of this object can be seen in my project statement.
 * 
 * @author Chandler Davis
 */
var Player = function(_color, _position, _rotation, _bow) {

   this.health = 100;

   // This material is used for every part of the model.
   this.material = new THREE.MeshPhongMaterial({color: _color});

   // Save the given bow argument and move it to desired position.
   this.bow = _bow;
   this.bow.position.set(-2, 100, 50);
   this.bow.scale.set(1.85, 1.85, 1.85);

   // This sets a dummy object to reference as the middle of the bow
   let middle = new THREE.Object3D();
   middle.position.set(-.7, -20, -38);
   middle.name = "middle";
   this.bow.add(middle);

   // This is the root of the hierarchy. Its properties affect all other boy parts.
   this.playerDummy = new THREE.Object3D();
   this.playerDummy.position.copy(_position);
   this.playerDummy.rotation.copy(_rotation);
   this.playerDummy.scale.set(1.5,1.5,1.5);

   // This is the "root" of the upper body. 
   // It is used to rotate the upper body in relation to the mouse.
   this.aimDummy = new THREE.Object3D();
   this.aimDummy.position.set(0, 10, 0);
   this.aimDummy.rotateX(1.5708);
   this.playerDummy.add(this.aimDummy);
   this.aimDummy.add(this.bow);

   // Initialize the left hand and its dummy.
   this.leftHandDummy = new THREE.Object3D();
   this.leftHandDummy.position.set(0, -20, -35);
   this.bow.add(this.leftHandDummy);

   this.leftHand = new THREE.Mesh(new THREE.CubeGeometry(3, 5, 5), this.material);
   this.leftHandDummy.add(this.leftHand);

   // Initialize the left arm and its dummy. It acts as the player's "wrist".
   this.leftArmDummy = new THREE.Object3D();
   this.leftArmDummy.position.set(0, -2, 0);
   this.leftArmDummy.rotateZ(.25);
   this.leftHandDummy.add(this.leftArmDummy);
   
   this.leftArm = new THREE.Mesh(new THREE.CubeGeometry(3, 13, 4), this.material);
   this.leftArm.position.set(0, -6.5, 0);
   this.leftArmDummy.add(this.leftArm);

   // Initialize the left elbow and its dummy.
   this.leftElbowDummy = new THREE.Object3D();
   this.leftElbowDummy.position.set(0, -6.5, 0);
   this.leftElbowDummy.rotateZ(-.1);
   this.leftArm.add(this.leftElbowDummy);

   this.leftElbow = new THREE.Mesh(new THREE.CubeGeometry(4,4,4), this.material);
   this.leftElbowDummy.add(this.leftElbow);

   // Initialize the left shoulder and dummy
   // This shoulder's dummy has a mesh, which is only for aesthetics.
   this.leftShoulder = new THREE.Mesh(new THREE.CubeGeometry(3.8, 13, 3.8), this.material);
   this.leftShoulder.position.set(0,-6.5,0);
   this.leftElbowDummy.add(this.leftShoulder);

   this.leftShoulderDummy = new THREE.Object3D();
   this.leftShoulderDummy.position.set(0, -7, 0);
   this.leftShoulderDummy.rotateZ(-.6);
   this.leftShoulderDummy.add(new THREE.Mesh(new THREE.CubeGeometry(4.4, 4.4, 4.4), this.material));
   this.leftShoulder.add(this.leftShoulderDummy);

   // Initialize the upper torso and dummy.
   this.upperTorsoDummy = new THREE.Object3D();
   this.upperTorsoDummy.rotateX(-1.5078);
   this.upperTorsoDummy.position.set(0, -7, 0);
   this.leftShoulderDummy.add(this.upperTorsoDummy);

   this.upperTorso = new THREE.Mesh(new THREE.CubeGeometry(7, 8, 15), this.material);
   this.upperTorsoDummy.add(this.upperTorso);

   // Initialize the head.
   this.head = new THREE.Mesh(new THREE.CubeGeometry(6, 7, 6), this.material);
   this.head.position.set(0, 7, 0);
   this.head.rotateY(.85);
   this.upperTorsoDummy.add(this.head);

   // Initialize the right hand and dummy.
   this.rightHandDummy = new THREE.Object3D();
   this.rightHandDummy.position.set(-.6, -32, -36);
   this.bow.add(this.rightHandDummy);

   this.rightHand = new THREE.Mesh(new THREE.CubeGeometry(3, 5, 5), this.material);
   this.rightHandDummy.add(this.rightHand);

   // Initialize the right arm and dummy.
   this.rightArmDummy = new THREE.Object3D();
   this.rightArmDummy.position.set(0, -2, 0);
   this.rightArmDummy.rotateZ(-.2);
   this.rightHandDummy.add(this.rightArmDummy);
   
   this.rightArm = new THREE.Mesh(new THREE.CubeGeometry(3, 13, 4), this.material);
   this.rightArm.position.set(0, -6.5, 0);
   this.rightArmDummy.add(this.rightArm);

   // Initialize the right elbow and dummy.
   this.rightElbowDummy = new THREE.Object3D();
   this.rightElbowDummy.position.set(0, -6.5, 0);
   this.rightElbowDummy.rotateZ(0.2);
   this.rightArm.add(this.rightElbowDummy);

   this.rightElbow = new THREE.Mesh(new THREE.CubeGeometry(4,4,4), this.material);
   this.rightElbowDummy.add(this.rightElbow);

   // Initialize the right shoulder and dummy.
   this.rightShoulder = new THREE.Mesh(new THREE.CubeGeometry(3.8, 13, 3.8), this.material);
   this.rightShoulder.position.set(0, -6.5 ,0);
   this.rightElbowDummy.add(this.rightShoulder);

   // Initialize the lower torso
   this.lowerTorso = new THREE.Mesh(new THREE.CubeGeometry(6, 10, 12), this.material);
   this.lowerTorso.position.set(0,-5,0);
   this.upperTorsoDummy.add(this.lowerTorso);

   // Initialize the waist and dummy.
   this.waistDummy = new THREE.Object3D();
   this.waistDummy.position.set(4.5, 0,0);
   this.waistDummy.rotateY(-1.4);
   this.playerDummy.add(this.waistDummy);

   this.waist = new THREE.Mesh(new THREE.CubeGeometry(12, 12, 10), this.material);
   this.waistDummy.add(this.waist);

   // Initialize the left thigh and dummy.
   this.leftThighDummy = new THREE.Object3D();
   this.leftThighDummy.position.set(10,-20,0);
   this.waistDummy.add(this.leftThighDummy);
   
   this.leftThigh = new THREE.Mesh(new THREE.CubeGeometry(8, 26, 8), this.material);
   this.leftThigh.position.set(0,13,0);
   this.leftThighDummy.add(this.leftThigh);

   // Initialize the right thigh and dummy.
   this.rightThighDummy = new THREE.Object3D();
   this.rightThighDummy.position.set(-10,-20,0);
   this.waistDummy.add(this.rightThighDummy);
   
   this.rightThigh = new THREE.Mesh(new THREE.CubeGeometry(8, 26, 8), this.material);
   this.rightThigh.position.set(0,13,0);
   this.rightThighDummy.add(this.rightThigh);

   // Initialize the left calf and dummy.
   this.leftCalfDummy = new THREE.Object3D();
   this.leftCalfDummy.position.set(0,-26,0);
   this.leftThighDummy.add(this.leftCalfDummy);
   
   this.leftCalf = new THREE.Mesh(new THREE.CubeGeometry(9, 26, 9), this.material);
   this.leftCalf.position.set(0,13,0);
   this.leftCalfDummy.add(this.leftCalf);

   // Initialize the right calf and dummy.
   this.rightCalfDummy = new THREE.Object3D();
   this.rightCalfDummy.position.set(0,-26,0);
   this.rightThighDummy.add(this.rightCalfDummy);
   
   this.rightCalf = new THREE.Mesh(new THREE.CubeGeometry(9, 26, 9), this.material);
   this.rightCalf.position.set(0,13,0);
   this.rightCalfDummy.add(this.rightCalf);

   // Initialize the left foot.
   this.leftFoot = new THREE.Mesh(new THREE.CubeGeometry(10, 4, 22), this.material);
   this.leftFoot.position.set(0, -2, 4);
   this.leftCalfDummy.add(this.leftFoot);

   // Initialize the right foot.
   this.rightFoot = new THREE.Mesh(new THREE.CubeGeometry(10, 4, 22), this.material);
   this.rightFoot.position.set(0, -2, 4);
   this.rightCalfDummy.add(this.rightFoot);
};

Player.prototype.setPosition = function(newPos) {
   this.playerDummy.position.copy(newPos);
};

Player.prototype.setRotation = function(newRot) {
   this.playerDummy.rotation.copy(newRot); 
};