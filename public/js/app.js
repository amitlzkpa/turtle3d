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

function getRandomFloatInRange(min, max) {
    return Math.random() * (max - min) + min;
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
	let reg_mat = new THREE.MeshBasicMaterial({ color: 0x00abab });
    m = new THREE.Mesh( g, reg_mat );
    let wire_mat = new THREE.LineBasicMaterial( { color: 0x003333, linewidth: 4 } );
    w = new THREE.LineSegments( g, wire_mat );
    o.add(m);
    o.add(w);
    o.rotation.set(Math.random(), Math.random(), Math.random());

    let startY = o.position.y;
    let endY = (getRandomFloatInRange(0.01, 0.02)) + startY;
    let incr = getRandomFloatInRange(0.0003, 0.0004);

	document.addEventListener('onRender', function (e) {
		o.position.y += incr;
		if (o.position.y < startY || o.position.y > endY) incr *= (-1);
	}, false);

    return o;
}


function Dwelling_3(start, end) {
	let s = start;
	let e = end;
	let o = new THREE.Object3D();
	let i;
	let moveRMax = 0.1;
	let pos1 = new THREE.Vector3(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
	let pos2 = new THREE.Vector3(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
	let pos3 = new THREE.Vector3(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
	i = getDwellingSphere(getRandomInt(1));
	i.position.set(pos1.x, pos1.y, pos1.z);
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(pos2.x, pos2.y, pos2.z);
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(pos3.x, pos3.y, pos3.z);
    o.add(i);

	let c, g;
	g = new THREE.Geometry();
	g.vertices.push(pos1, pos2);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0xff0000 }) );
    o.add(c);
	g = new THREE.Geometry();
	g.vertices.push(pos1, pos3);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0xff0000 }) );
    o.add(c);
	g = new THREE.Geometry();
	g.vertices.push(pos3, pos2);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0xff0000 }) );
    o.add(c);

    g = new THREE.Geometry();
	g.vertices.push(s, e);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0x000000 }) );

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
	let pos1 = new THREE.Vector3(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
	let pos2 = new THREE.Vector3(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
	let pos3 = new THREE.Vector3(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
	let pos4 = new THREE.Vector3(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
	i = getDwellingSphere(getRandomInt(1));
	i.position.set(pos1.x, pos1.y, pos1.z);
    o.add(i);
	i = getDwellingSphere(getRandomInt(0));
	i.position.set(pos2.x, pos2.y, pos2.z);
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(pos3.x, pos3.y, pos3.z);
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(pos4.x, pos4.y, pos4.z);
    o.add(i);

	let c, g;
	g = new THREE.Geometry();
	g.vertices.push(pos1, pos2);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0xff0000 }) );
    o.add(c);
	g = new THREE.Geometry();
	g.vertices.push(pos1, pos3);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0xff0000 }) );
    o.add(c);
	g = new THREE.Geometry();
	g.vertices.push(pos3, pos2);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0xff0000 }) );
    o.add(c);
	g = new THREE.Geometry();
	g.vertices.push(pos2, pos4);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0xff0000 }) );
    o.add(c);
	g = new THREE.Geometry();
	g.vertices.push(pos1, pos4);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0xff0000 }) );
    o.add(c);

    g = new THREE.Geometry();
	g.vertices.push(s, e);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0x000000 }) );
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
	let pos1 = new THREE.Vector3(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
	let pos2 = new THREE.Vector3(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
	let pos3 = new THREE.Vector3(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
	let pos4 = new THREE.Vector3(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
	let pos5 = new THREE.Vector3(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
	let pos6 = new THREE.Vector3(end.x + getRandomPosNegFloat(moveRMax), end.y + getRandomPosNegFloat(moveRMax*0.07), end.z + getRandomPosNegFloat(moveRMax));
	i = getDwellingSphere(getRandomInt(1));
	i.position.set(pos1.x, pos1.y, pos1.z);
    o.add(i);
	i = getDwellingSphere(getRandomInt(0));
	i.position.set(pos2.x, pos2.y, pos2.z);
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(pos3.x, pos3.y, pos3.z);
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(pos4.x, pos4.y, pos4.z);
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(pos5.x, pos5.y, pos5.z);
    o.add(i);
	i = getDwellingSphere(getRandomInt(2));
	i.position.set(pos6.x, pos6.y, pos6.z);
    o.add(i);

	let c, g;
	g = new THREE.Geometry();
	g.vertices.push(pos1, pos2);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0xff0000 }) );
    o.add(c);
	g = new THREE.Geometry();
	g.vertices.push(pos1, pos3);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0xff0000 }) );
    o.add(c);
	g = new THREE.Geometry();
	g.vertices.push(pos3, pos2);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0xff0000 }) );
    o.add(c);
	g = new THREE.Geometry();
	g.vertices.push(pos2, pos4);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0xff0000 }) );
    o.add(c);
	g = new THREE.Geometry();
	g.vertices.push(pos1, pos4);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0xff0000 }) );
    o.add(c);
	g = new THREE.Geometry();
	g.vertices.push(pos3, pos6);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0xff0000 }) );
    o.add(c);
	g = new THREE.Geometry();
	g.vertices.push(pos1, pos6);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0xff0000 }) );
    o.add(c);
	g = new THREE.Geometry();
	g.vertices.push(pos4, pos5);
    c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0xff0000 }) );
    o.add(c);

    g = new THREE.Geometry();
	g.vertices.push(s, e);
    let c = new THREE.Line( g, new THREE.LineBasicMaterial({ color: 0x000000 }) );
    o.add(c);
    o.name = "Dwelling_4";
    o.start =  () => { return s; }
    o.end = () => { return e; }
    return o;
}


// -----------------------------------------


function KevTree_22() {
	this.run = (i, parent, turtle) => 	{
									let lengthMul = 0.85;
									let r = [];
									let c;
								    let axis = new THREE.Vector3( 0, 1, 0 );
								    let angle = Math.PI * 0.125;
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


function KevTree_45() {
	this.run = (i, parent, turtle) => 	{
									let lengthMul = 0.85;
									let r = [];
									let c;
								    let axis = new THREE.Vector3( 0, 1, 0 );
								    let angle = Math.PI * 0.25;
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


function KevTree_120() {
	this.run = (i, parent, turtle) => 	{
									let lengthMul = 0.85;
									let r = [];
									let c;
								    let axis = new THREE.Vector3( 0, 1, 0 );
								    let angle = Math.PI * 0.67;
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
								let c = new currentTurtleType(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, this.d ));
								let d = new currentTurtleType(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -this.d ));
								return [c, d];
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
			case 'KevTree_22': { ruleSet = new KevTree_22(); break; }
			case 'KevTree_45': { ruleSet = new KevTree_45(); break; }
			case 'KevTree_120': { ruleSet = new KevTree_120(); break; }
			default: { ruleSet = new KevTree_45(); }
		}
	}

	this.getCurrentTurtleType = function() { return currentTurtleType; }
	this.getRuleSet = function() { return ruleSet; }

	this.setTurtle('Dwelling_4');
	this.setRuleset('KevTree_45');
}



// ------------------------------------------



function L3DApp() {

	let onRenderEvent = document.createEvent('Event');
	onRenderEvent.initEvent('onRender', true, true);

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
		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10000 );
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
	    document.dispatchEvent(onRenderEvent);
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








