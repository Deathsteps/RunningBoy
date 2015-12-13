exports.gameover = (roleParams, obstacleParams) => {
	var rw = 42, rh = 96, ow = 64, oh = 68;
	var rx = roleParams.x + 60, ry = roleParams.y;
	var ox = obstacleParams.x, oy = obstacleParams.y;

	if(obstacleParams.x <= 0) return false;

	var xcross = ox > rx ? ( ox - rx < rw ) : ( rx - ox < ow);
	var ycross = oy > ry ? ( oy - ry < rh ) : ( ry - oy < oh);

	return xcross && ycross;
}