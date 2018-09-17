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




// ---------------------------------



/*
function ABASys() {
	this.axiom = function() { return ["A"] };
	this.ruleSet = 	{
						"A": function() { return ["A", "B", "A"] },
						"B": function() { return ["B", "B", "B"] }
					}
}
*/



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





function LineTurtle(start, end) {
	let g, c;
	let m = new THREE.LineBasicMaterial({ color: 0xffffff });
	g = new THREE.Geometry();
	g.vertices.push(start, end);
    c = new THREE.Line( g, this.m );
    c.name = "line";
    c.start =  () => { return g.vertices[0]; }
    c.end = () => { return g.vertices[1]; }
    return c;
}



function ThreeBasicSys() {

	let d = 1;
	this.axiom = () => 	{
							let c = new LineTurtle(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, d, 0 ));
							return [c];
						};

	this.ruleSet = {};
	this.ruleSet["line"] = (i, parent) => 	{
										let r = [];
										let c;
									    let axis = new THREE.Vector3( 1, 0, 0 );
									    let angle = Math.PI / 4;
									    let src = parent.end().clone();
									    let v1 = parent.end().clone().sub(parent.start());
									    v1.applyAxisAngle( axis, angle );
									    v1.multiplyScalar(0.5);
									    let e1 = parent.end().clone().add(v1);
										c = new LineTurtle(src, e1);
									    r.push(c);
									    let v2 = parent.end().clone().sub(parent.start());
									    v2.applyAxisAngle( axis, -angle );
									    v2.multiplyScalar(0.5);
									    let e2 = parent.end().clone().add(v2);
										c = new LineTurtle(src, e2);
									    r.push(c);
										return r;
									}
}





function THREEapp() {

	let camera, scene, renderer;
	let controls;

	let lsys, lobjs;
	let retainHistory = true;

	let container = document.getElementById("app");
	let btnStep = document.getElementById("step");
	let chkBxRetainHistory = document.getElementById("rthistory");
	 

	init();
	animate();


	chkBxRetainHistory.addEventListener( 'change', function() {
		retainHistoryToggled(this.checked);
	});
	chkBxRetainHistory.checked = retainHistory;
	retainHistoryToggled(retainHistory);


	btnStep.addEventListener("mouseup", stepClicked);
	 
	function init() {	 
		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
		camera.position.z = 1;
		scene = new THREE.Scene();
		controls = new THREE.OrbitControls( camera );

		lobjs = new THREE.Object3D();
		lsys = new LSimulator();
		let rSet = new ThreeBasicSys();
		lsys.init(rSet.axiom, rSet.ruleSet);

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



	async function stepClicked(e) {
		await step();
	}



	async function retainHistoryToggled(val) {
		retainHistory = val;
		await render();
	}



	// ----------------------------------



	async function step() {
		await lsys.step();
		await render();
	}



	async function render() {
		if(!retainHistory) scene.remove(lobjs);
		lobjs = new THREE.Object3D();
		for (let i = 0; i < lsys.state.length; i++) {
			lobjs.add(lsys.state[i]);
		}
		scene.add(lobjs);
	}

}








