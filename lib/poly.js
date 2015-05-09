var Sequence = require('./sequence');
var Layer = require('./layer');

function Poly(opts) {
  this.context = opts.context;
  this.tempo = opts.tempo || 120;
  this.layers = [];
}

Poly.prototype.layer = function (seq, on, off) {
  var layer = new Layer(this.context, this.tempo, seq, on, off);
  return layer;
};

Poly.prototype.sequence = function (pulses, steps) {
  return new Sequence(pulses, steps);
};

Poly.prototype.add = function (layer) {
  this.layers.push(layer);
};

Poly.prototype.remove = function (layer) {
  var index = this.layers.indexOf(layer);
  var found = this.layers[index];
  found.metro.stop();
  delete found.metro;
  this.layers.splice(index, 1);
};

Poly.prototype.start = function () {
  this.layers.forEach(function (layer) {
    layer.start();
  });
};

module.exports = Poly;