var L3D;


window.addEventListener('load', async function() {
	const el = $('#app');

	L3D = new L3DApp();
	await L3D.reset();
});


// --------------------------


function getPointInBetweenByLen(pointA, pointB, percentage) {
	let dir = pointB.clone().sub(pointA);
	let len = dir.length();
	dir = dir.normalize().multiplyScalar(len*percentage);
	return pointA.clone().add(dir);
}


function getRandomPosNegFloat(max) {
	return (Math.random()*max) * ((Math.random() < 0.5) ? 1 : -1);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


// --------------------------


function getDwellingSphere(i) {
	let szs = [0.3, 0.4, 0.5];
	let divss = [4, 5, 7];
	let  sz = szs[i];
	let divs = divss[i];
	let g, m, w, o;
	o = new THREE.Object3D();
	g = new THREE.SphereGeometry( sz, divs, divs );
	let reg_mat = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff  });
    m = new THREE.Mesh( g, reg_mat );
    let wire_mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
    w = new THREE.LineSegments( g, wire_mat );
    o.add(m);
    o.add(w);
    o.rotation.set(Math.random(), Math.random(), Math.random());
    return o;
}


function Dwelling_for_4(center) {
	let o = new THREE.Object3D();
	let i;
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(getRandomPosNegFloat(1), getRandomPosNegFloat(0.1), getRandomPosNegFloat(1));
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(getRandomPosNegFloat(1), getRandomPosNegFloat(0.1), getRandomPosNegFloat(1));
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(getRandomPosNegFloat(1), getRandomPosNegFloat(0.1), getRandomPosNegFloat(1));
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(getRandomPosNegFloat(1), getRandomPosNegFloat(0.1), getRandomPosNegFloat(1));
    o.add(i);
    o.position.set(center.x, center.y, center.z);
    o.name = "Dwelling_for_4";
    o.center = () => { return o.position; }
    return o;
}


// -----------------------------------------


function Pathway() {
	this.run = (i, parent, turtle) => 	{
									let r = [];
									let c;
									let p
									let dist = 4;
								    p = parent.center().clone().add(new THREE.Vector3(dist, 0, 0));
									c = new turtle(p);
								    r.push(c);
								    p = parent.center().clone().add(new THREE.Vector3(-dist, 0, 0));
									c = new turtle(p);
								    r.push(c);
								    p = parent.center().clone().add(new THREE.Vector3(0, 0, dist));
									c = new turtle(p);
								    r.push(c);
								    p = parent.center().clone().add(new THREE.Vector3(0, 0, -dist));
									c = new turtle(p);
								    r.push(c);
									return r;
								}
}


// -----------------------------------------


function LSimulator() {

	let sys = null;

	this.reset = function() {
		this.iters = -1;

		// should always be a list
		this.state = null;
		// map objects to generators
		this.ruleSet = null;
	}


	this.init = function(system) {
		sys = system;
		this.iters = 0;
		this.state = sys.axiom();
		this.ruleSet = sys.getRuleSet();
	}


	this.step = async function () {
		this.ruleSet = sys.getRuleSet();
		let stateBuffer = [];
		for (let i = 0; i < this.state.length; i++) {
			let o = this.state[i];
			stateBuffer.push(...this.ruleSet.run(this.iters, o, sys.getCurrentTurtleType()));
		}
		this.state = stateBuffer;
		this.iters++;
	}


	this.reset();
}


// ------------------------------------------


function ThreeBasicSys() {
	let currentTurtleType = null;
	let ruleSet = null;

	this.d = 1;

	this.axiom = function() {
								let c = new currentTurtleType(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, this.d, 0 ));
								return [c];
							};

	this.setTurtle = function (turtleName) {
		switch(turtleName) {
			case 'Dwelling_for_4': { currentTurtleType = Dwelling_for_4; break; }
			default: { currentTurtleType = Dwelling_for_4; }
		}
	}

	this.setRuleset = function (rulesetName) {
		switch(rulesetName) {
			case 'Pathway': { ruleSet = new Pathway; break; }
			default: { ruleSet = new Pathway; }
		}
	}

	this.getCurrentTurtleType = function() { return currentTurtleType; }
	this.getRuleSet = function() { return ruleSet; }

	this.setTurtle(Dwelling_for_4);
	this.setRuleset('Pathway');
}



// ------------------------------------------



function L3DApp() {

	let camera, scene, renderer;
	let controls;

	let container = document.getElementById("app");
	let btnStep = document.getElementById("step");
	let btnReset = document.getElementById("reset");
	 

	init();
	animate();


	btnStep.addEventListener("mouseup", stepClicked);
	btnReset.addEventListener("mouseup", resetClicked);

	 
	function init() {	 
		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
		camera.position.z = 1;
		scene = new THREE.Scene();
		controls = new THREE.OrbitControls( camera );

		let gridHelper = new THREE.GridHelper( 20, 100 );
		scene.add( gridHelper );

		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor(0xffffff);
		controls.update();
		container.appendChild( renderer.domElement );
	}


	function animate() {
	    requestAnimationFrame( animate );
	    controls.update();	 
	    renderer.render( scene, camera );
	}



	// ----------------------------------



	let ctxt = this;

	async function resetClicked(e) {
		await ctxt.reset();
	}



	async function stepClicked(e) {
		await ctxt.step();
	}



	// ----------------------------------


	this.objects = null;
	this.simulator = null;
	this.lengine = 


	this.reset = async function() {
		scene.remove(this.objects);
		this.objects = new THREE.Object3D();
		this.simulator = new LSimulator();
		this.lengine = new ThreeBasicSys();
		this.simulator.init(this.lengine);
		await this.render();
	}



	this.step = async function() {
		await this.simulator.step();
		await this.render();
	}



	this.render = async function() {
		for (let i = 0; i < this.simulator.state.length; i++) {
			this.objects.add(this.simulator.state[i]);
		}
		scene.add(this.objects);
	}



}








