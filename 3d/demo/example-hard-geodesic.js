examples['hard geodesic']= function() {

    rc.setOption('renderMode', 1)
    
    // --- Data ----------------------------------------------------------------

    var coords  =	
	[
	    [85.5950864665, 27.8115294938, 145.6230589875], 
	    [0, 0, 201.2461179745], 
	    [0, 9E+1, 145.6230589875], 
	    [171.190172933, 55.6230589876, 90.0000000005], // 3 -> 16
	    [85.5950864665, 117.8115294938, 90.0000000005], 
	    [0, 1.8E+2, 90.0000000005], 
	    [52.9006727062, -72.8115294935, 145.6230589875], 
	    [105.8013454124, -145.623058987, 90.0000000005], // 7 -> 21
	    [138.4957591727, -44.9999999997, 90.0000000005], // 8 -> 31
	    [-52.9006727062, -72.8115294935, 145.6230589875], 
	    [-105.8013454124, -145.623058987, 90.0000000005], 
	    [0, -145.623058987, 90.0000000005], 
	    [-85.5950864665, 27.8115294938, 145.6230589875], 
	    [-171.190172933, 55.6230589876, 90.0000000005], // 13 -> 26
	    [-138.4957591727, -44.9999999997, 90.0000000005], 
	    [-85.5950864665, 117.8115294938, 90.0000000005], 
	    [171.1901729329, 55.6230589874, 90.0000000005], //|16
	    [138.4957591727, 100.6230589872, 0], 
	    [171.1901729329, 0, 0],  // 18-> 30
	    [52.9006727063, -162.8115294935, 0], 
	    [138.4957591728, -100.6230589873, 0], 
	    [105.8013454126, -145.6230589871, 90.0000000005],  //|21
	    [-138.4957591727, -100.6230589873, 0], 
	    [-52.9006727062, -162.8115294935, 0], 
	    [-138.4957591728, 100.6230589872, 0], 
	    [-171.190172933, 0, 0], 
	    [-171.190172933, 55.6230589875, 90.0000000005], //|26
	    [52.9006727062, 162.8115294935, 0], 
	    [-52.9006727063, 162.8115294935, 0], 
	    [-1E-10, 1.8E+2, 90.0000000005], 
	    [171.190172933, 0, 0],  //|30
	    [138.4957591728, -44.9999999997, 90.0000000005], 
	    [138.4957591728, -100.6230589872, 0], 
	    [-138.4957591727, -100.6230589872, 0], 
	    [-138.4957591727, -44.9999999998, 90.0000000005], 
	    [-171.1901729329, 0, 0], 
	    [-138.4957591728, 100.6230589873, 0], 
	    [-85.5950864665, 117.8115294937, 90.0000000005], 
	    [138.4957591727, 100.6230589873, 0]
	]
    var edges =
	[
	    [0, 1], 
	    [1, 2], 
	    [2, 0], 
	    [3, 0], 
	    [0, 4], 
	    [4, 3], 
	    [4, 2], 
	    [2, 5], 
	    [5, 4], 
	    [6, 1], 
	    [0, 6], 
	    [7, 6], 
	    [6, 8], 
	    [8, 7], 
	    [8, 0], 
	    [3, 8], 
	    [9, 1], 
	    [6, 9], 
	    [10, 9], 
	    [9, 11], 
	    [11, 10], 
	    [11, 6], 
	    [7, 11], 
	    [12, 1], 
	    [9, 12], 
	    [13, 12], 
	    [12, 14], 
	    [14, 13], 
	    [14, 9], 
	    [10, 14], 
	    [12, 2], 
	    [2, 15], 
	    [15, 5], 
	    [15, 12], 
	    [13, 15], 
	    [16, 17], 
	    [17, 18], 
	    [18, 16], 
	    [19, 20], 
	    [20, 21], 
	    [21, 19], 
	    [22, 23], 
	    [23, 10], 
	    [10, 22], 
	    [24, 25], 
	    [25, 26], 
	    [26, 24], 
	    [27, 28], 
	    [28, 29], 
	    [29, 27], 
	    [30, 31], 
	    [31, 32], 
	    [32, 30], 
	    [19, 11], 
	    [11, 23], 
	    [23, 19], 
	    [33, 34], 
	    [34, 35], 
	    [35, 33], 
	    [36, 37], 
	    [37, 28], 
	    [28, 36], 
	    [27, 4], 
	    [4, 38], 
	    [38, 27]
	]
    var points = [], removeDuplicateCoords = {}, i = 0
    coords.forEach(function(c) {
	var p = new Point3D(c[0], c[1], c[2])
	var key = '' + Math.round(p.x) + Math.round(p.y) + Math.round(p.z)
	if (removeDuplicateCoords[key]) {
	    p = removeDuplicateCoords[key]
	} else {
	    removeDuplicateCoords[key] = p
	    rc.add(new Sphere(p, 'yellow'))
	}
	points.push(p)
	i++
    })
    edges.forEach(function(e) {
	var p1 = points[e[0]], p2 = points[e[1]]
	rc.add(new Cylinder(p1, p2))
	var d = Sketchpad.geom3d.distance(p1, p2)
	rc.addConstraint(Sketchpad.geom3d.LengthConstraint, undefined, p1, p2, d)
	edges.forEach(function(f) {
	    var q1 = points[f[0]], q2 = points[f[1]]
	    if (q1 == p2 && p1 != q2) {
		d = Sketchpad.geom3d.distance(p1, q2)
		rc.addConstraint(Sketchpad.geom3d.LengthConstraint, undefined, p1, q2, d)
	    }
	})
    })
};

