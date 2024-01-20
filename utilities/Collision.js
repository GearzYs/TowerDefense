// This module is used to detect collisions between two elements.

function collision(elt1, elt2) {
  return (
    elt2.x < elt1.x + elt1.width && 
    elt2.x + elt2.width > elt1.x && 
    elt2.y < elt1.y + elt1.height && 
    elt2.y + elt2.height > elt1.y
  )
}
  
export default collision;
  