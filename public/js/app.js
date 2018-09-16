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






function LState() {


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
			stateBuffer.push(...this.ruleSet[o.lid](this.iters, o));
		}
		this.state = stateBuffer;
		this.iters++;
	}


	this.reset();


}




function ABASys() {
	this.axiom = function() { return ["A"] };
	this.ruleSet = 	{
						"A": function() { return ["A", "B", "A"] },
						"B": function() { return ["B", "B", "B"] }
					}
}


function ThreeBasicSys() {
	var m = new THREE.MeshNormalMaterial({color: 0xfbfcaf});


	this.axiom = () => 	{
							let g = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
						    let c = new THREE.Mesh( g, this.m );
						    c.lid = "cube";
							return [c];
						};

	this.ruleSet = {};
	this.ruleSet["cube"] = (i, parent) => 	{
										let r = [];
										let g = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
									    let c = new THREE.Mesh( g, this.m );
									    c.position.x = parent.position.x + i/10;
									    c.position.z = parent.position.z - i/10;
										c.lid = "cube";
									    r.push(c);
										g = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
									    c = new THREE.Mesh( g, this.m );
									    c.position.x = parent.position.x - i/10;
									    c.position.z = parent.position.z + i/10;
										c.lid = "cube";
									    r.push(c);
										return r;
									}
}




function THREEapp() {

	let camera, scene, renderer;
	let controls;

	let lsys, lobjs;
	 
	init();
	animate();
	 
	function init() {	 
		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
		camera.position.z = 1;
		scene = new THREE.Scene();
		controls = new THREE.OrbitControls( camera );

		lobjs = new THREE.Object3D();
		lsys = new LState();
		let rSet = new ThreeBasicSys();
		lsys.init(rSet.axiom, rSet.ruleSet);

		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor(0xffffff);
		controls.update();
		document.body.appendChild( renderer.domElement );
	}
	 
	function animate() {
	    requestAnimationFrame( animate );
	    controls.update();	 
	    renderer.render( scene, camera );
	 
	}


	async function step() {
		scene.remove(lobjs);
		lobjs = new THREE.Object3D();
		await lsys.step();
		for (let i = 0; i < lsys.state.length; i++) {
			lobjs.add(lsys.state[i]);
		}
		scene.add(lobjs);
		// console.log(lobjs);
	}


	$(document).mousedown(function() {
	    switch (event.which) {
	        case 1:
	            // alert('Left Mouse button pressed.');
	            break;
	        case 2:
	            // alert('Middle Mouse button pressed.');
	            break;
	        case 3:
	        	step();
	            // alert('Right Mouse button pressed.');
	            break;
	        default:
	            alert('You have a strange Mouse!');
	    }
	});

}







