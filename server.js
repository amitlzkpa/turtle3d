require('dotenv').config(); // read .env files
const express = require('express');
var exphbs = require('express-handlebars');

const mongoose = require('mongoose');

const LSystemSchema = require('./models/LSystemSchema');
let turtleText = 
`



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
    this.run = (i, parent, turtle) =>   {
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
    this.run = (i, parent, turtle) =>   {
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
    this.run = (i, parent, turtle) =>   {
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


  // -----------------------------------------
`;

const app = express();
const port = process.env.PORT || 3000;
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


let mongoURI = `mongodb://amit:calculus1@ds125423.mlab.com:25423/turtle3d`;
mongoose.connect(mongoURI);

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

app.get('/', function(req, res) {
	res.render('index', { title: 'Turtle3D', turtleText: turtleText });
});

// Listen for HTTP requests on port 3000
app.listen(port, () => {
	console.log('listening on %d', port);
});
