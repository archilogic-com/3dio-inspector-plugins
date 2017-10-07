var pickingPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000000, 1000000), new THREE.MeshBasicMaterial())
pickingPlane.rotation.x = -Math.PI / 2
pickingPlane.updateMatrixWorld()
var pickingVector = new THREE.Vector3()
var pickingRaycaster = new THREE.Raycaster()

export default function pickPointOnGroundPlane (args) {

  // API
  var x = args.x
  var y = args.y
  var nX = args.normalizedX
  var nY = args.normalizedY
  var canvas = args.canvas
  var camera = args.camera

  // get normalized 2D coordinates
  if (nX === undefined || nY === undefined) {
    var viewport = canvas.getBoundingClientRect()
    nX = 2 * (x - viewport.left) / viewport.width - 1
    nY = -(2 * (y - viewport.top) / viewport.height - 1)
  }

  // setup raycaster
  pickingRaycaster.set(
    camera.position,
    pickingVector.set(nX, nY, 1).unproject(camera).sub(camera.position).normalize()
  )

  // shoot ray
  var intersects = pickingRaycaster.intersectObject(pickingPlane)

  // in case of no result
  if (!intersects.length === 0) {
    console.warn('Picking raycaster got 0 results.')
    return new THREE.Vector3()
  }

  return intersects[0].point

}
