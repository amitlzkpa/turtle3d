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






function LState(axiom, ruleSet, constants) {

	this.constants = constants;
	this.iters = 0;

	// should always be a list
	this.state = axiom;
	// map objects to generators
	this.ruleSet = ruleSet;


	this.step = async function () {
		let stateBuffer = [];
		for (let i = 0; i < this.state.length; i++) {
			let o = this.state[i];
			stateBuffer.push(...ruleSet[o]);
		}
		this.state = stateBuffer;
		this.iters++;
	}


}




function THREEapp() {

	let camera, scene, renderer;

	let lsys;
	let ruleSet = {"A": ["A", "B", "A"], "B": ["B", "B", "B"]};
	 
	init();
	animate();
	 
	function init() {	 
		camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
		camera.position.z = 1;
		scene = new THREE.Scene();

		lsys = new LState(["A"], ruleSet);
		// console.log(lsys.state);

		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );
	}
	 
	function animate() {
	    requestAnimationFrame( animate );	 
	    renderer.render( scene, camera );
	 
	}


	async function step() {
		await lsys.step();
		console.log(lsys.state);
	}


	$(document).click(function() {
	    step();
	});

}








