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


function getR(r) {
	return (Math.random()*r) * ((Math.random() < 0.5) ? 1 : -1);
}


// -----------------------------------------


function LineTurtle(start, end) {
	let g, c;
	let m = new THREE.LineBasicMaterial({ color: 0x000000 });
	g = new THREE.Geometry();
	g.vertices.push(start, end);
    c = new THREE.Line( g, m );
    c.name = "line";
    c.start =  () => { return g.vertices[0]; }
    c.end = () => { return g.vertices[1]; }
    return c;
}


function BubbleLineTurtle(start, end) {
	let os = new THREE.Object3D();
	let g, c;
	let m = new THREE.LineBasicMaterial({ color: 0x000000 });
	g = new THREE.Geometry();
	let mid = getPointInBetweenByLen(start, end, 0.5);
	let d = end.distanceTo(start);
	let r = 0.2 * d;
	g.vertices.push(start, end);
    os.add(new THREE.Line( g, m ));
    os.name = "line";
    os.start =  () => { return g.vertices[0]; }
    os.end = () => { return g.vertices[1]; }
    let sphere = new THREE.Mesh( new THREE.SphereGeometry( r, 16, 16 ), new THREE.MeshBasicMaterial( {color: 0xffffff * Math.random()} ) );
    sphere.position.set(mid.x, mid.y, mid.z);
    os.add(sphere);
    return os;
}


function StiltedTurtle(start, end) {
	let g, c;
	let m = new THREE.LineBasicMaterial({ color: 0x000000 });
	g = new THREE.Geometry();
	let mid = getPointInBetweenByLen(start, end, 0.5);
	let d = end.distanceTo(start);
	let r = 0.3 * d;
	mid.add(new THREE.Vector3(getR(r), getR(r), getR(r)));
	g.vertices.push(start, mid, end);
    c = new THREE.Line( g, m );
    c.name = "line";
    c.start =  () => { return g.vertices[0]; }
    c.end = () => { return g.vertices[2]; }
    return c;
}


// -----------------------------------------


function RuleSetLine_2D_45Turn() {
	this.run = (i, parent, turtle) => 	{
									let r = [];
									let c;
								    let axis = new THREE.Vector3( 1, 0, 0 );
								    let angle = Math.PI / 4;
								    let src = parent.end().clone();
								    let v1 = parent.end().clone().sub(parent.start());
								    v1.applyAxisAngle( axis, angle );
								    v1.multiplyScalar(0.5);
								    let e1 = parent.end().clone().add(v1);
									c = new turtle(src, e1);
								    r.push(c);
								    let v2 = parent.end().clone().sub(parent.start());
								    v2.applyAxisAngle( axis, -angle );
								    v2.multiplyScalar(0.5);
								    let e2 = parent.end().clone().add(v2);
									c = new turtle(src, e2);
								    r.push(c);
									return r;
								}
}


function RuleSetLine_3D_45Turn() {
	this.run = (i, parent, turtle) => 	{
									let r = [];
									let c;
								    let axis;
								    axis = new THREE.Vector3( 1, 0, 0 )
								    let angle = Math.PI / 4;
								    let src = parent.end().clone();
								    let v1 = parent.end().clone().sub(parent.start());
								    v1.applyAxisAngle( axis, angle );
								    v1.multiplyScalar(0.5);
								    let e1 = parent.end().clone().add(v1);
									c = new turtle(src, e1);
								    r.push(c);
								    let v2 = parent.end().clone().sub(parent.start());
								    v2.applyAxisAngle( axis, -angle );
								    v2.multiplyScalar(0.5);
								    let e2 = parent.end().clone().add(v2);
									c = new turtle(src, e2);
								    r.push(c);
								    axis = new THREE.Vector3( 0, 0, 1 );
								    let v3 = parent.end().clone().sub(parent.start());
								    v3.applyAxisAngle( axis, angle );
								    v3.multiplyScalar(0.5);
								    let e3 = parent.end().clone().add(v3);
									c = new turtle(src, e3);
								    r.push(c);
								    let v4 = parent.end().clone().sub(parent.start());
								    v4.applyAxisAngle( axis, -angle );
								    v4.multiplyScalar(0.5);
								    let e4 = parent.end().clone().add(v4);
									c = new turtle(src, e4);
								    r.push(c);
									return r;
								}
}


function RuleSetLine_2D_23Turn() {
	this.run = (i, parent, turtle) => 	{
									let r = [];
									let c;
								    let axis = new THREE.Vector3( 1, 0, 0 );
								    let angle = Math.PI / 8;
								    let src = parent.end().clone();
								    let v1 = parent.end().clone().sub(parent.start());
								    v1.applyAxisAngle( axis, angle );
								    v1.multiplyScalar(0.5);
								    let e1 = parent.end().clone().add(v1);
									c = new turtle(src, e1);
								    r.push(c);
								    let v2 = parent.end().clone().sub(parent.start());
								    v2.applyAxisAngle( axis, -angle );
								    v2.multiplyScalar(0.5);
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
								let c = new currentTurtleType(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, this.d, 0 ));
								return [c];
							};

	this.setTurtle = function (turtleName) {
		switch(turtleName) {
			case 'Straight Line': { currentTurtleType = LineTurtle; break; }
			case 'Stilted Line': { currentTurtleType = StiltedTurtle; break; }
			case 'Bubble Line': { currentTurtleType = BubbleLineTurtle; break; }
			default: { currentTurtleType = LineTurtle; }
		}
	}

	this.setRuleset = function (rulesetName) {
		// console.log(rulesetName);
		switch(rulesetName) {
			case '2-45': { ruleSet = new RuleSetLine_2D_45Turn(); break; }
			case '4-45': { ruleSet = new RuleSetLine_3D_45Turn(); break; }
			case '2-23': { ruleSet = new RuleSetLine_2D_23Turn(); break; }
			default: { ruleSet = new RuleSetLine_2D_45Turn(); }
		}
	}

	this.getCurrentTurtleType = function() { return currentTurtleType; }
	this.getRuleSet = function() { return ruleSet; }

	this.setTurtle(StiltedTurtle);
	this.setRuleset(RuleSetLine_3D_45Turn);
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








