window.addEventListener('load', () => {
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

	THREEapp();
});



// --------------------------



function LSimulator() {


	this.reset = function() {
		this.constants = null;
		this.iters = -1;

		// should always be a list
		this.state = null;
		// map objects to generators
		this.ruleSet = null;
	}


	this.init = function(axiom, ruleSet, constants) {
		this.constants = constants;
		this.iters = 0;
		this.state = axiom();
		this.ruleSet = ruleSet;
	}


	this.step = async function () {
		let stateBuffer = [];
		for (let i = 0; i < this.state.length; i++) {
			let o = this.state[i];
			stateBuffer.push(...this.ruleSet[o.name](this.iters, o));
		}
		this.state = stateBuffer;
		this.iters++;
	}


	this.reset();


}




function TestSys() {
	let m = new THREE.MeshBasicMaterial( { color: "#FF0000" } );


	this.axiom = () => 	{
						    let c = new THREE.Mesh( this.g, this.m );
						    c.name = "cube";
							return [c];
						};

	this.ruleSet = {};
	this.ruleSet["cube"] = (i, parent) => 	{
										let r = [];
									    let c = new THREE.Mesh( new THREE.BoxGeometry( 0.2, 0.2, 0.2 ), this.m );
									    c.position.x = parent.position.x + i/10;
									    c.position.z = parent.position.z - i/10;
										c.name = "cube";
									    r.push(c);
									    c = new THREE.Mesh( new THREE.BoxGeometry( 0.2, 0.2, 0.2 ), this.m );
									    c.position.x = parent.position.x - i/10;
									    c.position.z = parent.position.z + i/10;
										c.name = "cube";
									    r.push(c);
										return r;
									}
}


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


function RuleSetLine_2D_45Turn(turtle) {
	this.turtle = turtle;
	this.line = (i, parent) => 	{
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


function RuleSetLine_3D_45Turn(turtle) {
	this.turtle = turtle;
	this.line = (i, parent) => 	{
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


function RuleSetLine_2D_23Turn(turtle) {
	this.turtle = turtle;
	this.line = (i, parent) => 	{
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


// ------------------------------------------


function ThreeBasicSys() {
	let d = 1;
	let turtleType = StiltedTurtle;
	this.axiom = () => 	{
							let c = new turtleType(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, d, 0 ));
							return [c];
						};

	this.ruleSet = new RuleSetLine_3D_45Turn(turtleType);
}



function THREEapp() {

	let camera, scene, renderer;
	let controls;

	let lsys, lobjs;
	let retainHistory = true;

	let rSet;

	let container = document.getElementById("app");
	let chkBxRetainHistory = document.getElementById("rthistory");
	let btnStep = document.getElementById("step");
	let btnReset = document.getElementById("reset");
	 

	init();
	initl3d();
	animate();


	chkBxRetainHistory.addEventListener( 'change', function() {
		retainHistoryToggled(this.checked);
	});
	chkBxRetainHistory.checked = retainHistory;


	btnStep.addEventListener("mouseup", stepClicked);
	btnReset.addEventListener("mouseup", resetClicked);


	function initl3d() {
		lobjs = new THREE.Object3D();
		lsys = new LSimulator();
		rSet = new ThreeBasicSys();
		lsys.init(rSet.axiom, rSet.ruleSet);
	}

	 
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



	async function resetClicked(e) {
		await reset();
	}



	async function stepClicked(e) {
		await step();
	}



	async function retainHistoryToggled(val) {
		retainHistory = val;
		await render();
	}



	// ----------------------------------



	async function reset() {
		emptyObject3D(scene);
		lobjs = new THREE.Object3D();
		lsys = new LSimulator();
		rSet = new ThreeBasicSys();
		lsys.init(rSet.axiom, rSet.ruleSet);
		await render();
	}



	async function step() {
		await lsys.step();
		await render();
	}



	async function render() {
		if(!retainHistory) {
			emptyObject3D(lobjs);
		}
		for (let i = 0; i < lsys.state.length; i++) {
			lobjs.add(lsys.state[i]);
		}
		scene.add(lobjs);
	}




	function emptyObject3D(o3d) {
		for (let i = 0; i < o3d.children.length; i++) {
			scene.remove(o3d.children[i]);
		}
	}



}








