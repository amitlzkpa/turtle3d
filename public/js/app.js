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




function ThreeBasicSys() {
	let m = new THREE.LineBasicMaterial({ color: 0xffffff });
	let d = 1;

	this.axiom = () => 	{
							let g, c;
							g = new THREE.Geometry();
							g.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, d, 0 ) );
						    c = new THREE.Line( g, this.m );
						    c.name = "line";
						    c.start =  () => { return g.vertices[0]; }
						    c.end = () => { return g.vertices[1]; }
							return [c];
						};

	this.ruleSet = {};
	this.ruleSet["line"] = (i, parent) => 	{
										let r = [];
									    let c, g;
									    let src = parent.end().clone();
									    let v1 = parent.end().clone().sub(parent.start());
									    let axis = new THREE.Vector3( 1, 0, 0 );
									    let angle = Math.PI / 4;
									    v1.applyAxisAngle( axis, angle );
									    v1.multiplyScalar(0.5);
									    let e1 = parent.end().clone().add(v1);
										g = new THREE.Geometry();
										g.vertices.push( src, e1 );
									    c = new THREE.Line( g, this.m );
									    c.name = "line";
									    c.start = () => { return g.vertices[0]; }
									    c.end = () => { return g.vertices[1]; }
									    r.push(c);
									    console.log(src);
									    console.log(e1);
										return r;
									}
}





function THREEapp() {

	let container = document.getElementById("app");
	let btnStep = document.getElementById("step");

	let chkBxRetainHistory = document.getElementById("rthistory");

	chkBxRetainHistory.addEventListener( 'change', function() {
		retainHistoryToggled(this.checked);
	});



	btnStep.addEventListener("mouseup", stepClicked);

	let camera, scene, renderer;
	let controls;

	let lsys, lobjs;
	let retainHistory = false;
	 
	init();
	animate();
	 
	function init() {	 
		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
		camera.position.z = 1;
		scene = new THREE.Scene();
		controls = new THREE.OrbitControls( camera );

		lobjs = new THREE.Object3D();
		lsys = new LSimulator();
		let rSet = new ThreeBasicSys();
		lsys.init(rSet.axiom, rSet.ruleSet);

		// var axesHelper = new THREE.AxesHelper( 2 );
		// scene.add( axesHelper );

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
		console.log(lsys.state);
		scene.add(lobjs);
	}

}








