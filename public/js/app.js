var L3D;


window.addEventListener('load', async function() {
	const el = $('#app');
	const errorTemplate = Handlebars.compile($('#error-template').html());

	const router = new Router({
		mode: 'history',
		page404: (path) => {
			const html = errorTemplate({
				title: 'Error 404 - Page NOT Found!',
				message: `The path '/${path}' does not exist on this site`,
			});
			el.html(html);
		},
	});

	L3D = new L3DApp();
	await L3D.reset();
});


// -----------------------------------------


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


// -----------------------------------------


function getDwellingSphere(i) {
	let szs = [0.03, 0.04, 0.05];
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


function Dwelling_3(start, end) {
	let s = start;
	let e = end;
	let o = new THREE.Object3D();
	let i;
	let moveRMax = 0.1;
	i = getDwellingSphere(getRandomInt(1));
	i.position.set(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
    o.add(i);
	let g = new THREE.Geometry();
	g.vertices.push(s, e);
    let c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0x000000 }) );
    o.add(c);
    o.name = "Dwelling_4";
    o.start =  () => { return s; }
    o.end = () => { return e; }
    return o;
}


function Dwelling_4(start, end) {
	let s = start;
	let e = end;
	let o = new THREE.Object3D();
	let i;
	let moveRMax = 0.1;
	i = getDwellingSphere(getRandomInt(1));
	i.position.set(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
    o.add(i);
	i = getDwellingSphere(getRandomInt(0));
	i.position.set(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
    o.add(i);
	let g = new THREE.Geometry();
	g.vertices.push(s, e);
    let c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0x000000 }) );
    o.add(c);
    o.name = "Dwelling_4";
    o.start =  () => { return s; }
    o.end = () => { return e; }
    return o;
}


function Dwelling_6(start, end) {
	let s = start;
	let e = end;
	let o = new THREE.Object3D();
	let i;
	let moveRMax = 0.1;
	i = getDwellingSphere(getRandomInt(1));
	i.position.set(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
    o.add(i);
	i = getDwellingSphere(getRandomInt(0));
	i.position.set(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
    o.add(i);
	let g = new THREE.Geometry();
	g.vertices.push(s, e);
    let c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0x000000 }) );
    o.add(c);
    o.name = "Dwelling_4";
    o.start =  () => { return s; }
    o.end = () => { return e; }
    return o;
}


// -----------------------------------------


function RuleSetLine_2D_45Turn() {
	this.run = (i, parent, turtle) => 	{
									let lengthMul = 0.9;
									let r = [];
									let c;
								    let axis = new THREE.Vector3( 0, 1, 0 );
								    let angle = Math.PI / 7;
								    let src = parent.end().clone();
								    let v1 = parent.end().clone().sub(parent.start());
								    v1.applyAxisAngle( axis, angle );
								    v1.multiplyScalar(lengthMul);
								    let e1 = parent.end().clone().add(v1);
									c = new turtle(src, e1);
								    r.push(c);
								    let v2 = parent.end().clone().sub(parent.start());
								    v2.applyAxisAngle( axis, -angle );
								    v2.multiplyScalar(lengthMul);
								    let e2 = parent.end().clone().add(v2);
									c = new turtle(src, e2);
								    r.push(c);
									return r;
								}
}


// --------------------------


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
								let c = new currentTurtleType(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -this.d ));
								return [c];
							};

	this.setTurtle = function (turtleName) {
		switch(turtleName) {
			case 'Dwelling_3': { currentTurtleType = Dwelling_3; break; }
			case 'Dwelling_4': { currentTurtleType = Dwelling_4; break; }
			case 'Dwelling_6': { currentTurtleType = Dwelling_6; break; }
			default: { currentTurtleType = Dwelling_4; }
		}
	}

	this.setRuleset = function (rulesetName) {
		// console.log(rulesetName);
		switch(rulesetName) {
			case '2-45': { ruleSet = new RuleSetLine_2D_45Turn(); break; }
			default: { ruleSet = new RuleSetLine_3D_45Turn(); }
		}
	}

	this.getCurrentTurtleType = function() { return currentTurtleType; }
	this.getRuleSet = function() { return ruleSet; }

	this.setTurtle('Dwelling_4');
	this.setRuleset('2-45');
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

		// let gridHelper = new THREE.GridHelper( 20, 100 );
		// scene.add( gridHelper );

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








