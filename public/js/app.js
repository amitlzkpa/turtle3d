var L3D;


window.addEventListener('load', async function() {
	const el = $('#app');

	L3D = new L3DApp();
	await L3D.reset();
});


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








